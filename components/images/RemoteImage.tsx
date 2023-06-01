import { R2Client } from "@/utils/S3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Image from "next/image";

async function getData({ src: Key }: { src: string }) {
  const signedUrl = await getSignedUrl(
    R2Client,
    new GetObjectCommand({
      Bucket: "bundlestore",
      Key,
    }),
    { expiresIn: 3600 }
  );

  return signedUrl;
}

type RemoteImageProps = { src: string; className?: string };

export default async function RemoteImage({
  src,
  className,
}: RemoteImageProps) {
  const signedUrl = await getData({ src });

  return <Image src={signedUrl} alt="" fill className={className} />;
}
