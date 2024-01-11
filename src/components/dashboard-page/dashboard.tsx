"use client";

import { trpc } from "@/app/_trpc/client";

import UploadButton from "@/components/dashboard-page/upload-button";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import {
  ChatBubbleIcon,
  CrumpledPaperIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";

import { format } from "date-fns";

import { useState } from "react";
import Loader from "@/components/loader";

const Dashboard = ({ isSubscribe }: { isSubscribe: boolean }) => {
  const [currentDeletingFile, setCurrentDeletingFiles] = useState<
    string | null
  >(null);

  const utils = trpc.useUtils();

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setCurrentDeletingFiles(id);
    },
    onSettled() {
      setCurrentDeletingFiles(null);
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-4 md:p-10">
      <div className="mt-8 flex items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 text-5xl font-bold text-primary/90">My Files</h1>

        <UploadButton isSubscribe={isSubscribe} />
      </div>

      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-primary/20 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-primary/15 rounded-lg bg-muted/50 shadow transition hover:shadow-lg "
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-primary/90">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    {format(new Date(file.createdAt), "MMM yyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <ChatBubbleIcon className="h-4 w-4" />
                    Mocked
                  </div>
                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size="sm"
                    className="w-full"
                    variant="ghost"
                  >
                    {currentDeletingFile === file.id ? (
                      <Loader className="h-4 w-4 animate-spin text-destructive" />
                    ) : (
                      <TrashIcon className="h-4 w-4 text-destructive" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className="w-full md:mt-8 md:flex md:items-center md:justify-start">
          <Skeleton className="mx-4 my-4 h-24 md:h-32 md:w-[25%]" />
          <Skeleton className="mx-4 my-4 h-24 md:h-32 md:w-[25%]" />
          <Skeleton className="mx-4 my-4 h-24 md:h-32 md:w-[25%]" />
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <CrumpledPaperIcon className="h-8 w-8 text-zinc-800" />
          <h3 className="text-xl font-semibold">
            Pretty empty arround here...
          </h3>
          <p>let&apos;s upload your first PDF.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
