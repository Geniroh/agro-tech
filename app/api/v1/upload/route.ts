import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { db } from "@/lib/db";

const s3Client = new S3Client({
  region: "nyc3",
  endpoint: "https://nyc3.digitaloceanspaces.com",
  credentials: {
    accessKeyId: process.env.DO_SPACE_KEY!,
    secretAccessKey: process.env.DO_SPACE_SECRET!,
  },
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const bucketName = process.env.DO_BUCKET_NAME;

  if (!bucketName) {
    return NextResponse.json({ error: "Bucket name not defined" });
  }

  const params: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: file.name,
    Body: buffer,
    ACL: "public-read",
  };

  try {
    const command = new PutObjectCommand(params);
    const result = await s3Client.send(command);

    const fileRecord = {
      filename: file.name,
      size: file.size.toString(),
      url: `https://${bucketName}.${process.env.DO_ENDPOINT}/${file.name}`,
    };

    await db.file.create({ data: fileRecord });

    return NextResponse.json({
      message: "File uploaded successfully",
      url: fileRecord.url,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json("File upload failed");
  }
}
