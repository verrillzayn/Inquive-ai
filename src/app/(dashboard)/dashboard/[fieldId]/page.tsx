import ChatWrapper from "@/components/dashboard-page/main-page/chat/chat-wrapper";
import PdfRenderer from "@/components/dashboard-page/main-page/pdf-renderer";

import { db } from "@/db";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: { fieldId: string };
}

const Page = async ({ params }: PageProps) => {
  const { fieldId } = params;

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fieldId}`);

  const file = await db.file.findFirst({
    where: {
      id: fieldId,
      userId: user.id,
    },
  });

  if (!file) notFound();

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
