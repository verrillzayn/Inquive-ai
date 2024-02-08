import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { huggingFacePdfEmbedded, openAIPdfEmbedded } from "@/lib/pdfembedded";

const f = createUploadthing();

const middleware = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) throw new Error("Unauthenticated");

  const userDb = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });
  // Whatever is returned here is accessible in onUploadComplete as `metadata`
  return { userId: user.id, isSubscribe: userDb?.isSubscribe };
};

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: {
    key: string;
    name: string;
    url: string;
  };
}) => {
  // This code RUNS ON YOUR SERVER after upload

  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  });

  if (isFileExist) return;

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

  // await huggingFacePdfEmbedded({ createdFile, metadata });
  await openAIPdfEmbedded({ createdFile, metadata });

  // try {
  //   // AI things
  //   const res = await fetch(
  //     file.url ||
  //       `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
  //   );

  //   const blob = await res.blob();

  //   const loader = new PDFLoader(blob);
  //   const pageLevelDocs = await loader.load();

  //   const pagesAmount = pageLevelDocs.length;
  //   const { isSubscribe } = metadata;
  //   const isProExceeded =
  //     pagesAmount > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf;
  //   const isFreeExceeded =
  //     pagesAmount > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf;

  //   if ((isSubscribe && isProExceeded) || (!isSubscribe && isFreeExceeded)) {
  //     await db.file.update({
  //       data: {
  //         uploadStatus: "FAILED",
  //       },
  //       where: {
  //         id: createdFile.id,
  //       },
  //     });
  //   }

  //   //vectorize and index entire PDF document / ubah tiap halaman pdf menjadi vector

  //   const pineconeIndex = pinecone.Index("inquive");

  //   const embeddings = new OpenAIEmbeddings({
  //     openAIApiKey: process.env.OPENAI_API_KEY,
  //   });

  //   await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
  //     pineconeIndex,
  //     namespace: createdFile.id,
  //   });

  //   await db.file.update({
  //     data: {
  //       uploadStatus: "SUCCESS",
  //     },
  //     where: {
  //       id: createdFile.id,
  //     },
  //   });
  // } catch (error) {
  //   await db.file.update({
  //     data: {
  //       uploadStatus: "FAILED",
  //     },
  //     where: {
  //       id: createdFile.id,
  //     },
  //   });
  //   console.log(error);
  // }

  // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  return { uploadedBy: metadata.userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  freePlanUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: "16MB" } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
