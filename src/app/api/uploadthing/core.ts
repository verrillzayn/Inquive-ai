import { pinecone } from "@/lib/pinecone";

import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user || !user.id) throw new Error("Unauthenticated");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url:
            file.url ||
            `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      });

      try {
        // AI things
        const res = await fetch(
          file.url ||
            `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
        );

        const blob = await res.blob();

        const loader = new PDFLoader(blob);
        const pageLevelDocs = await loader.load();

        const pagesAmount = pageLevelDocs.length;

        //vectorize and index entire PDF document / ubah tiap halaman pdf menjadi vector

        const pineconeIndex = pinecone.Index("inquive");

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        });

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex,
          namespace: createdFile.id,
        });

        await db.file.update({
          data: {
            uploadStatus: "SUCCESS",
          },
          where: {
            id: createdFile.id,
          },
        });
      } catch (error) {
        await db.file.update({
          data: {
            uploadStatus: "FAILED",
          },
          where: {
            id: createdFile.id,
          },
        });
        console.log(error);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
