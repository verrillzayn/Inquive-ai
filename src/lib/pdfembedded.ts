import { PLANS } from "@/config/subscriptions-plans";

import { db } from "@/db";
import { pinecone } from "@/lib/pinecone";
import { TaskType } from "@google/generative-ai";

import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";

import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

interface IPdfEmbeddedProps {
  createdFile: {
    id: string;
    name: string;
    uploadStatus: string;
    url: string;
    key: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
  };
  metadata: {
    userId: string;
    isSubscribe: boolean | undefined;
  };
}

export async function openAIPdfEmbedded({
  createdFile,
  metadata,
}: IPdfEmbeddedProps) {
  try {
    // AI things
    const res = await fetch(
      createdFile.url ||
        `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${createdFile.key}`,
    );

    const blob = await res.blob();

    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    const pagesAmount = pageLevelDocs.length;
    const { isSubscribe } = metadata;
    const isProExceeded =
      pagesAmount > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf;
    const isFreeExceeded =
      pagesAmount > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf;

    if ((isSubscribe && isProExceeded) || (!isSubscribe && isFreeExceeded)) {
      await db.file.update({
        data: {
          uploadStatus: "FAILED",
        },
        where: {
          id: createdFile.id,
        },
      });
    }

    //vectorize and index entire PDF document / ubah tiap halaman pdf menjadi vector

    const pineconeIndex = pinecone.Index("inquive");

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const pineconeStorePromise = PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        namespace: createdFile.id,
      },
    );

    const dbUpdatePromise = db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });

    const [pineconeStore, dbUpdate] = await Promise.all([
      pineconeStorePromise,
      dbUpdatePromise,
    ]);
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
}

export async function huggingFacePdfEmbedded({
  createdFile,
  metadata,
}: IPdfEmbeddedProps) {
  try {
    console.log("hf start");
    const res = await fetch(
      createdFile.url ||
        `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${createdFile.key}`,
    );

    const blob = await res.blob();

    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    const pagesAmount = pageLevelDocs.length;
    const { isSubscribe } = metadata;
    const isProExceeded =
      pagesAmount > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf;
    const isFreeExceeded =
      pagesAmount > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf;

    if ((isSubscribe && isProExceeded) || (!isSubscribe && isFreeExceeded)) {
      await db.file.update({
        data: {
          uploadStatus: "FAILED",
        },
        where: {
          id: createdFile.id,
        },
      });
    }

    //vectorize and index entire PDF document / ubah tiap halaman pdf menjadi vector

    const pineconeIndex = pinecone.Index("inquive");

    console.log("hf connecting");
    const embeddings = new HuggingFaceInferenceEmbeddings({
      apiKey: process.env.HF_TOKEN,
      model: "intfloat/multilingual-e5-large",
    });
    console.log("hf connected");
    const pineconeStorePromise = PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        namespace: createdFile.id,
      },
    );

    const dbUpdatePromise = db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
    console.log("promise created");

    const [milvus, dbUpdate] = await Promise.all([
      pineconeStorePromise,
      dbUpdatePromise,
    ]);
    console.log("promise solved");
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
}

export async function geminiPdfEmbeded({
  createdFile,
  metadata,
}: IPdfEmbeddedProps) {
  try {
    console.log("gemini start");
    const res = await fetch(
      createdFile.url ||
        `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${createdFile.key}`,
    );

    const blob = await res.blob();

    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();

    const pagesAmount = pageLevelDocs.length;
    const { isSubscribe } = metadata;
    const isProExceeded =
      pagesAmount > PLANS.find((plan) => plan.name === "Pro")!.pagesPerPdf;
    const isFreeExceeded =
      pagesAmount > PLANS.find((plan) => plan.name === "Free")!.pagesPerPdf;

    if ((isSubscribe && isProExceeded) || (!isSubscribe && isFreeExceeded)) {
      await db.file.update({
        data: {
          uploadStatus: "FAILED",
        },
        where: {
          id: createdFile.id,
        },
      });
    }

    //vectorize and index entire PDF document / ubah tiap halaman pdf menjadi vector

    const pineconeIndex = pinecone.Index("gemini");

    console.log("gemini connecting");
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: "text-embedding-004",
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    });
    console.log("gemini connected");
    const pineconeStorePromise = PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
        namespace: createdFile.id,
      },
    );

    const dbUpdatePromise = db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: createdFile.id,
      },
    });
    console.log("promise created");

    const [milvus, dbUpdate] = await Promise.all([
      pineconeStorePromise,
      dbUpdatePromise,
    ]);
    console.log("promise solved");
    console.log({milvus, dbUpdate});
    
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
}
