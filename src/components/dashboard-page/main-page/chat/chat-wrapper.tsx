"use client";

import { trpc } from "@/app/_trpc/client";
import ChatInput from "@/components/dashboard-page/main-page/chat/chat-input";
import Messages from "@/components/dashboard-page/main-page/chat/messages";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ChatWrapperProps {
  fileId: string;
}

const ChatWrapper = ({ fileId }: ChatWrapperProps) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    },
  );

  if (isLoading)
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin" />
            <h3 className="text-xl font-semibold">Loading...</h3>
            <p className="text-sm text-zinc-500">
              We&apos;re preparing your PDF.
            </p>
          </div>
        </div>

        <ChatInput isDisable />
      </div>
    );

  if (data?.status === "PROCESSING")
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin" />
            <h3 className="text-xl font-semibold">Proccesing PDF...</h3>
            <p className="text-sm text-zinc-500">This Won&apos;t take long.</p>
          </div>
        </div>

        <ChatInput isDisable />
      </div>
    );

  if (data?.status === "FAILED")
    return (
      <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
        <div className="mb-28 flex flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <CrossCircledIcon className="h-8 w-8 text-red-500" />
            <h3 className="text-xl font-semibold">Too many pages in PDF</h3>
            <p className="text-sm text-zinc-500">
              Your <span className="font-medium">Free</span> plan supports up to
              5 pages per PDF.
            </p>
            <Button asChild className="mt-8" size="sm">
              <Link href="/dashboard">
                <ChevronLeftIcon className="mr-1.5 h-3.5 w-3.5" />
                Back to dashboard
              </Link>
            </Button>
          </div>
        </div>

        <ChatInput isDisable />
      </div>
    );

  return (
    <div className="relative flex min-h-full flex-col justify-between gap-2 divide-y divide-zinc-200 bg-zinc-50">
      <div className="mb-28 flex flex-1 flex-col justify-between">
        <Messages />
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatWrapper;
