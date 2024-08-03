import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: "nyc3",
  endpoint: "https://nyc3.digitaloceanspaces.com",
  credentials: {
    accessKeyId: process.env.DO_SPACE_KEY!,
    secretAccessKey: process.env.DO_SPACE_SECRET!,
  },
});

// Function to sanitize file names
function sanitizeFileName(fileName: string): string {
  const extension = fileName.substring(fileName.lastIndexOf("."));
  const nameWithoutExtension = fileName
    .substring(0, fileName.lastIndexOf("."))
    .replace(/[^a-zA-Z0-9]/g, "");
  return nameWithoutExtension + extension;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.formData();
  const files = data.getAll("file") as File[];

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" });
  }

  const bucketName = process.env.DO_BUCKET_NAME;

  if (!bucketName) {
    return NextResponse.json({ error: "Bucket name not defined" });
  }

  try {
    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize file name and generate a unique file name
        const sanitizedFileName = sanitizeFileName(file.name);
        const uniqueFileName = `${sanitizedFileName}`;

        const params: PutObjectCommandInput = {
          Bucket: bucketName,
          Key: uniqueFileName,
          Body: buffer,
          ACL: "public-read",
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const fileRecord = {
          name: uniqueFileName,
          size: file.size.toString(),
          url: `https://${bucketName}.nyc3.digitaloceanspaces.com/${uniqueFileName}`,
          type: file.type,
        };

        await db.file.create({
          data: {
            filename: fileRecord.name,
            size: fileRecord.size,
            url: fileRecord.url,
          },
        });

        return fileRecord;
      })
    );

    return NextResponse.json({
      message: "Files uploaded successfully",
      files: uploadResults,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "File upload failed" });
  }
}
