import ChatWrapper from "@/components/dashboard-page/main-page/chat/chat-wrapper";
import PdfRenderer from "@/components/dashboard-page/main-page/pdf-renderer";
import { PLANS } from "@/config/subscriptions-plans";

import { db } from "@/db";
import { pinecone } from "@/lib/pinecone";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: {
    fieldId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { fieldId } = params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fieldId}`);

  const filePromise = db.file.findFirst({
    where: {
      id: fieldId,
      userId: user.id,
    },
  });
  const dbUserPromise = db.user.findFirst({ where: { id: user.id } });

  const [file, dbUser] = await Promise.all([filePromise, dbUserPromise]);

  if (!file) notFound();
  if (!dbUser) throw new Error("not Authenticated");

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
    const { isSubscribe } = dbUser;
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
          id: file.id,
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
        namespace: file.id,
      },
    );

    const dbUpdatePromise = db.file.update({
      data: {
        uploadStatus: "SUCCESS",
      },
      where: {
        id: file.id,
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
        id: file.id,
      },
    });
    console.log(error);
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-1 flex-col justify-between">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className="flex-[0.75] shrink-0 border-t border-primary/20 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper fileId={fieldId} />
        </div>
      </div>
    </div>
  );
};

export default Page;
