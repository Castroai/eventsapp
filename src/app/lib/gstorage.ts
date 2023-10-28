import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: "",
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
  },
});

export async function uploadImage(file: File): Promise<string> {
  const bucketName = "event_images_dev";
  const destination = `images/${file.name}`;
  //
  const bucket = storage.bucket(bucketName);
  //
  const blob = bucket.file(file.name);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.type,
    },
  });
  blobStream.on("finish", () => {
    console.log("Finished");
  });
  blobStream.end(buffer);
  const url = `https://storage.googleapis.com/${bucketName}/${destination}`;
  return url;
}
