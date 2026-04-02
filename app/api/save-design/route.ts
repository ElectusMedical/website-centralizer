import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";

const DATA_DIR = process.env.DATA_DIR || join(process.cwd(), "data");

async function pushToGitHub(content: string, filename: string): Promise<void> {
  const token    = process.env.GITHUB_TOKEN;
  const owner    = process.env.REPO_OWNER;
  const repo     = process.env.REPO_NAME;

  if (!token || !owner || !repo) {
    console.warn("[github-push] Missing GITHUB_TOKEN/REPO_OWNER/REPO_NAME — skipping");
    return;
  }

  const apiPath  = `data/designs/${filename}`;
  const apiUrl   = `https://api.github.com/repos/${owner}/${repo}/contents/${apiPath}`;
  const headers  = {
    Authorization: `Bearer ${token}`,
    Accept:        "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Get current SHA if file already exists (required for updates)
  let sha: string | undefined;
  try {
    const existing = await fetch(apiUrl, { headers });
    if (existing.ok) {
      const data = await existing.json();
      sha = data.sha;
    }
  } catch { /* file doesn't exist yet */ }

  // Push to GitHub
  const body: Record<string, string> = {
    message: `chore: update ${filename} [auto-save]`,
    content: Buffer.from(content).toString("base64"),
    branch:  "main",
  };
  if (sha) body.sha = sha;

  const res = await fetch(apiUrl, {
    method:  "PUT",
    headers,
    body:    JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }

  console.log(`[github-push] ✅ Pushed ${apiPath}`);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body.html !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Ensure designs directory exists
    const designsDir = join(DATA_DIR, "designs");
    await mkdir(designsDir, { recursive: true });

    const ts      = new Date().toISOString().replace(/[:.]/g, "-");
    const payload = JSON.stringify(body, null, 2);

    // Save locally (snapshot + latest)
    await Promise.all([
      writeFile(join(designsDir, `design-${ts}.json`), payload, "utf-8"),
      writeFile(join(designsDir, "latest.json"),        payload, "utf-8"),
    ]);

    // Push latest.json to GitHub (non-blocking — don't fail save if GitHub fails)
    let githubStatus = "skipped";
    try {
      await pushToGitHub(payload, "latest.json");
      githubStatus = "pushed";
    } catch (ghErr) {
      console.error("[github-push] Failed:", ghErr);
      githubStatus = `error: ${String(ghErr)}`;
    }

    return NextResponse.json({
      ok:           true,
      message:      "Design saved",
      path:         `designs/design-${ts}.json`,
      savedAt:      body.savedAt ?? new Date().toISOString(),
      githubStatus,
    });
  } catch (err) {
    console.error("[save-design] Error:", err);
    return NextResponse.json(
      { error: "Failed to save design", detail: String(err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const latestPath = join(DATA_DIR, "designs", "latest.json");
    const content    = await readFile(latestPath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: "No saved design found" }, { status: 404 });
  }
}
