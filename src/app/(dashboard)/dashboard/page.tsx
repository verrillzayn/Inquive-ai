import UploadButton from "@/components/dashboard-page/upload-button";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import FileList from "@/components/dashboard-page/file-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return (
    <main className="mx-auto max-w-7xl px-4 md:p-10">
      <div className="mt-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-primary/90">My Files</h1>

        <UploadButton isSubscribe={dbUser.isSubscribe} />
      </div>
      <Suspense fallback={<FileListLoading />}>
        <FileList userId={user.id} />
      </Suspense>
    </main>
  );
};

export default Page;

const FileListLoading = () => {
  return (
    <div className="w-full md:mt-8 md:flex md:items-center md:justify-start">
      <Skeleton className="mx-4 my-4 h-24 md:h-32 md:w-[25%]" />
      <Skeleton className="mx-4 my-4 h-24 md:h-32 md:w-[25%]" />
      <Skeleton className="mx-4 my-4 h-24 md:h-32 md:w-[25%]" />
    </div>
  );
};
