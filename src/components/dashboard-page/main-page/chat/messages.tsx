import Loader from "@/components/loader";
import { Skeleton } from "@/components/ui/skeleton";

import { trpc } from "@/app/_trpc/client";

import { INFINITE_QUERY_LIMIT } from "@/config/inifinite-query";

import { ChatBubbleIcon } from "@radix-ui/react-icons";

import Message from "@/components/dashboard-page/main-page/chat/message";

import { useContext, useEffect, useRef } from "react";
import { MessageContext } from "@/components/providers/message-context";

import { useIntersection } from "@mantine/hooks";

interface IMessagesProps {
  fileId: string;
}

const Messages = ({ fileId }: IMessagesProps) => {
  const { isLoading: isAiLoading } = useContext(MessageContext);

  const { data, isLoading, fetchNextPage } =
    trpc.getFileMessages.useInfiniteQuery(
      {
        fileId,
        limit: INFINITE_QUERY_LIMIT,
      },
      {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true,
      },
    );

  const loadingMessages = {
    createdAt: new Date().toISOString(),
    id: "loading-messages",
    isUserMessages: false,
    text: (
      <span className="flex h-full items-center justify-center">
        <Loader className="h-4 w-4 animate-spin" />
      </span>
    ),
  };

  const messages = data?.pages.flatMap((page) => page.messages);

  const combineMessages = [
    ...(isAiLoading ? [loadingMessages] : []),
    ...(messages ?? []),
  ];

  const lastMessageRef = useRef<HTMLDivElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  return (
    <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex max-h-[calc(100vh-3.5rem-5.5rem)] flex-1 flex-col-reverse gap-4 overflow-y-auto border-primary/20 p-3">
      {combineMessages && combineMessages.length > 0 ? (
        combineMessages.map((msg, index) => {
          const isNextMessagesIsSamePerson =
            combineMessages[index - 1]?.isUserMessages ===
            combineMessages[index].isUserMessages;

          if (index === combineMessages.length - 1) {
            return (
              <Message
                ref={ref}
                key={msg.id}
                isNextMessagesIsSamePerson={isNextMessagesIsSamePerson}
                message={msg}
              />
            );
          } else
            return (
              <Message
                key={msg.id}
                isNextMessagesIsSamePerson={isNextMessagesIsSamePerson}
                message={msg}
              />
            );
        })
      ) : isLoading ? (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
          <Skeleton className="h-16" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <ChatBubbleIcon className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">You&apos;re all set!</h3>
          <p className="text-sm text-primary/50">
            Ask your first question to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
