import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { requireAdmin } from "@/lib/auth-utils";
import { prisma } from "@/lib/db";
export const runtime = "nodejs";
export async function POST(req: NextRequest) {
  if (!(await requireAdmin()))
    return NextResponse.json(
      { error: "Admin access required." },
      { status: 401 },
    );
  const origin = req.headers.get("origin");
  if (!origin || origin !== req.nextUrl.origin)
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey = process.env.CLOUDINARY_API_KEY,
    secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !secret)
    return NextResponse.json(
      {
        error:
          "Photo storage is not configured. Please contact the site administrator.",
      },
      { status: 503 },
    );
  if (Number(req.headers.get("content-length")) > 4.3 * 1024 * 1024)
    return NextResponse.json(
      { error: "Choose a photograph under 4 MB." },
      { status: 413 },
    );
  try {
    const data = await req.formData(),
      file = data.get("file");
    const title = String(data.get("title") ?? "").trim(),
      description = String(data.get("description") ?? "").trim(),
      category = String(data.get("category") ?? "Community");
    if (
      !(file instanceof File) ||
      file.size === 0 ||
      file.size > 4 * 1024 * 1024 ||
      !["image/jpeg", "image/png", "image/webp", "image/avif"].includes(
        file.type,
      )
    )
      return NextResponse.json(
        { error: "Choose a JPG, PNG, WebP or AVIF image under 4 MB." },
        { status: 400 },
      );
    if (
      !title ||
      title.length > 160 ||
      !description ||
      description.length > 500 ||
      !["Community", "Medical care", "Welfare", "Worship"].includes(category)
    )
      return NextResponse.json(
        { error: "Add a valid title, image description and category." },
        { status: 400 },
      );
    const timestamp = String(Math.floor(Date.now() / 1000)),
      folder = "blessings/outreach";
    const signature = createHash("sha1")
      .update("folder=" + folder + "&timestamp=" + timestamp + secret)
      .digest("hex");
    const upload = new FormData();
    upload.set("file", file);
    upload.set("api_key", apiKey);
    upload.set("timestamp", timestamp);
    upload.set("folder", folder);
    upload.set("signature", signature);
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/" +
        encodeURIComponent(cloud) +
        "/image/upload",
      { method: "POST", body: upload, signal: AbortSignal.timeout(45000) },
    );
    if (!response.ok)
      return NextResponse.json(
        {
          error: "Photo storage could not accept the image. Please try again.",
        },
        { status: 502 },
      );
    const asset = await response.json();
    if (
      typeof asset.secure_url !== "string" ||
      !asset.secure_url.startsWith("https://res.cloudinary.com/")
    )
      throw new Error("Invalid storage response");
    const item = await prisma.mediaItem.create({
      data: {
        type: "photo",
        title,
        description,
        url: asset.secure_url,
        thumbnailUrl: asset.secure_url,
        topic: category,
        publishedAt: data.get("publish") === "on" ? new Date() : null,
      },
    });
    return NextResponse.json({ id: item.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "The photograph could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
