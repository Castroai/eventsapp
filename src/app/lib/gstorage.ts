import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 } from "uuid";
const storage = new Storage({
  projectId: "",
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
  },
});

export async function uploadImage(file: File): Promise<string> {
  const bucketName = "event_images_dev";
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(file.name);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.type,
    },
  });
  return new Promise((resolve, reject) => {
    blobStream.on("error", (err) => {
      reject(err);
    });

    blobStream.on("finish", () => {
      const url = `https://storage.googleapis.com/${bucketName}/${file.name}`;
      resolve(url);
    });

    blobStream.end(buffer); // Pass the buffer data to initiate upload
  });
}
