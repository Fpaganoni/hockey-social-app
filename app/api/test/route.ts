import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ Missing",
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET ? "✓ Set" : "✗ Missing",
  });
}
