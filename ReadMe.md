# OCM Readiness Map Builder

A web-based Organizational Change Management readiness planning tool with AI-powered analysis, backed by a secure serverless API proxy.

---

## What this is

- A visual readiness map for tracking OCM workstreams across project phases
- AI-assisted task generation and map analysis (powered by Claude / Anthropic)
- A document repository (`/docs`) the AI can read to give project-specific suggestions
- Deployed on Vercel — accessible to any team member with the URL, no install required

---

## One-time setup (~15 minutes)

### Step 1 — Get an Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create a free account
3. Go to **API Keys** → **Create Key**
4. Copy the key — it starts with `sk-ant-...`
5. Keep it somewhere safe (like a password manager) — you'll use it in Step 4

---

### Step 2 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** button (top right) → **New repository**
3. Name it something like `ocm-readiness-tool`
4. Set it to **Private** (recommended)
5. Click **Create repository**
6. Upload all the files from this folder into the repository:
   - Click **uploading an existing file** on the new repo page
   - Drag all files and folders in (including `api/`, `docs/`, `vercel.json`, `.gitignore`, `index.html`)
   - Click **Commit changes**

---

### Step 3 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**
2. Choose **Continue with GitHub** — this links your GitHub account
3. On the Vercel dashboard, click **Add New → Project**
4. Find your `ocm-readiness-tool` repository and click **Import**
5. Leave all settings as defaults — Vercel will detect the configuration automatically
6. Click **Deploy**
7. Wait ~60 seconds. You'll see a success screen with a URL like `ocm-readiness-tool.vercel.app`

---

### Step 4 — Add your API key to Vercel (the secure part)

This is how the tool calls the AI without ever showing your key to users.

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Click **Add New**
3. Set:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your `sk-ant-...` key here
   - **Environment:** check all three boxes (Production, Preview, Development)
4. Click **Save**
5. Go to **Deployments** → click the three dots on your latest deployment → **Redeploy**

Your tool is now live and AI-enabled. Share the Vercel URL with your team.

---

## Adding project documents

The AI reads files from the `/docs` folder to give project-specific suggestions.

1. In your GitHub repository, navigate to the `docs/` folder
2. Click **Add file → Upload files**
3. Add `.txt`, `.md`, `.csv`, or `.json` files with project content
   - e.g. paste your project charter into `charter.txt`
   - export your stakeholder list as `stakeholders.csv`
4. Click **Commit changes**
5. Vercel auto-deploys in ~30 seconds
6. In the tool, click **✦ Update with AI** to run a fresh analysis

---

## Using the tool

| Feature | How to access |
|---------|--------------|
| Create a new project | Portfolio Dashboard → New Project |
| AI map generation | Stage 2 → Generate with AI button |
| Add tasks manually | Hover over any map cell → click `+` |
| Edit a task | Click any task card |
| AI map analysis | Map view → **✦ Update with AI** button |
| Export report | Settings ⚙ → Export Report (PDF) |
| Share read-only link | Settings ⚙ → Copy View-Only Link |
| Toggle sound | 🔊 icon in task drawer header |

---

## Updating the tool

When a new version of `index.html` is provided:

1. In your GitHub repo, navigate to `index.html`
2. Click the pencil icon (Edit) → paste the new content → Commit
   **or** delete the file and upload the new version
3. Vercel auto-deploys within ~30 seconds

---

## Troubleshooting

**AI features return an error**
→ Check that `ANTHROPIC_API_KEY` is set correctly in Vercel Environment Variables
→ Redeploy after adding/changing the key

**"No documents found" in Update with AI**
→ Make sure files are in the `docs/` folder (not a subfolder)
→ Only `.txt`, `.md`, `.csv`, `.json` are supported — not PDF or Word yet

**Changes to docs not appearing**
→ Wait ~60 seconds after committing to GitHub for Vercel to redeploy

**The tool URL is not working**
→ Check the Vercel dashboard for deployment errors
→ Make sure `vercel.json` is in the root of your repository

---

## File structure

```
ocm-readiness-tool/
├── index.html          ← The tool (all UI and logic)
├── vercel.json         ← Vercel routing configuration
├── .gitignore          ← Files Git should ignore
├── api/
│   ├── chat.js         ← AI proxy (holds API key securely)
│   └── documents.js    ← Serves /docs files to the tool
└── docs/
    ├── README.md       ← Instructions for this folder
    └── [your files]    ← Add project documents here
```
