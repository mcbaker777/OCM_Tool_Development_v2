/**
 * /api/documents.js
 * Reads files from the /docs folder and returns their names + text content.
 * Supports: .txt, .md, .json, .csv
 * PDF and DOCX support can be added later with additional packages.
 *
 * GET  /api/documents        → returns list of available documents
 * POST /api/documents        → returns content of requested documents
 */

import fs from "fs";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "docs");
const SUPPORTED = [".txt", ".md", ".json", ".csv"];
const MAX_FILE_SIZE_BYTES = 100_000; // 100kb per file — keeps AI context manageable

function readDocsList() {
  if (!fs.existsSync(DOCS_DIR)) return [];
  return fs
    .readdirSync(DOCS_DIR)
    .filter(f => SUPPORTED.includes(path.extname(f).toLowerCase()))
    .map(f => {
      const full = path.join(DOCS_DIR, f);
      const stat = fs.statSync(full);
      return {
        name: f,
        size: stat.size,
        modified: stat.mtime.toISOString(),
        readable: stat.size <= MAX_FILE_SIZE_BYTES
      };
    });
}

function readDocContent(filename) {
  // Sanitize: only allow simple filenames, no path traversal
  const safe = path.basename(filename);
  const full = path.join(DOCS_DIR, safe);
  if (!fs.existsSync(full)) return null;
  const stat = fs.statSync(full);
  if (stat.size > MAX_FILE_SIZE_BYTES) return "[File too large — summarise manually]";
  return fs.readFileSync(full, "utf8");
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // GET — return list of documents
  if (req.method === "GET") {
    const docs = readDocsList();
    return res.status(200).json({ docs });
  }

  // POST — return content of requested documents
  if (req.method === "POST") {
    const { filenames } = req.body || {};
    if (!filenames || !Array.isArray(filenames)) {
      return res.status(400).json({ error: "Provide filenames array in body" });
    }
    const results = filenames.map(name => ({
      name,
      content: readDocContent(name) || "[File not found]"
    }));
    return res.status(200).json({ documents: results });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
