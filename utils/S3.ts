import { S3Client } from "@aws-sdk/client-s3";

export const R2Client = new S3Client({
  region: "auto",
  endpoint: process.env.CF_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.CF_KEYID!,
    secretAccessKey: process.env.CF_KEY!,
  },
});
