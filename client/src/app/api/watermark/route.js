import sharp from "sharp";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Only images from our own property backend may be proxied/watermarked here,
// otherwise this route would become an open image proxy (SSRF risk).
const ALLOWED_HOSTNAMES = new Set(["api.graygoldrealty.com", "localhost"]);

const WATERMARK_TEXT = "GRAYGOLD";

function buildWatermarkSvg(width, height) {
  const fontSize = Math.max(18, Math.round(Math.min(width, height) / 7));
  const strokeWidth = Math.max(1, Math.round(fontSize / 22));
  const cx = width / 2;
  const cy = height / 2;

  return Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${cx}"
        y="${cy}"
        transform="rotate(-25 ${cx} ${cy})"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}"
        font-weight="700"
        fill="#ffffff"
        fill-opacity="0.38"
        stroke="#000000"
        stroke-opacity="0.18"
        stroke-width="${strokeWidth}"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="${Math.round(fontSize / 10)}"
      >${WATERMARK_TEXT}</text>
    </svg>
  `);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");

  if (!src) {
    return NextResponse.json({ error: "Missing src" }, { status: 400 });
  }

  let parsedSrc;
  try {
    parsedSrc = new URL(src);
  } catch {
    return NextResponse.json({ error: "Invalid src" }, { status: 400 });
  }

  const isAllowedProtocol =
    parsedSrc.protocol === "http:" || parsedSrc.protocol === "https:";

  if (!isAllowedProtocol || !ALLOWED_HOSTNAMES.has(parsedSrc.hostname)) {
    return NextResponse.json({ error: "Host not allowed" }, { status: 400 });
  }

  try {
    const upstream = await fetch(parsedSrc.toString());
    if (!upstream.ok) {
      throw new Error(`Upstream responded ${upstream.status}`);
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      throw new Error(`Unexpected content-type: ${contentType}`);
    }

    const inputBuffer = Buffer.from(await upstream.arrayBuffer());
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();
    const width = metadata.width || 1200;
    const height = metadata.height || 800;

    const watermarked = await image
      .composite([{ input: buildWatermarkSvg(width, height), top: 0, left: 0 }])
      .toBuffer();

    return new NextResponse(watermarked, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control":
          "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    });
  } catch (err) {
    // Fail safe: never let a watermarking bug break an image on the live site.
    console.error("[watermark] Falling back to original image:", err.message);
    return NextResponse.redirect(parsedSrc.toString(), 302);
  }
}
