import { R2Client } from "@/utils/S3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

export async function GET() {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

  const Key =
    process.env.NODE_ENV === "production" ? fileName : `${fileName}-dev`;

  const signedUrl = await getSignedUrl(
    R2Client,
    new PutObjectCommand({
      Bucket: "bundlestore",
      Key,
    }),
    { expiresIn: 3600 }
  );

  return NextResponse.json({
    signedUrl,
    key: Key,
  });
}
