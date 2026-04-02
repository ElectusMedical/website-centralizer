import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join }             from "path";

// Data lives at /app/data inside Docker (mounted volume)
// Locally falls back to ./data from project root
const DATA_DIR = process.env.DATA_DIR
  || join(process.cwd(), "data");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate minimal shape
    if (!body || typeof body.html !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Ensure data/designs directory exists
    const designsDir = join(DATA_DIR, "designs");
    await mkdir(designsDir, { recursive: true });

    // Write timestamped snapshot + overwrite latest
    const ts      = new Date().toISOString().replace(/[:.]/g, "-");
    const payload = JSON.stringify(body, null, 2);

    await Promise.all([
      writeFile(join(designsDir, `design-${ts}.json`), payload, "utf-8"),
      writeFile(join(designsDir, "latest.json"),        payload, "utf-8"),
    ]);

    return NextResponse.json({
      ok:      true,
      message: "Design saved",
      path:    `designs/design-${ts}.json`,
      savedAt: body.savedAt ?? new Date().toISOString(),
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
  // Return latest saved design (for future load-from-server feature)
  try {
    const { readFile } = await import("fs/promises");
    const latestPath   = join(DATA_DIR, "designs", "latest.json");
    const content      = await readFile(latestPath, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: "No saved design found" }, { status: 404 });
  }
}
