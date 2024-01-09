import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/inifinite-query";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useRef, useState } from "react";
import { toast } from "sonner";

type TMessageContextType = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

interface IMessageContextProviderProps {
  fileId: string;
  children: ReactNode;
}

export const MessageContext = createContext<TMessageContextType>({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

export const MessageContextProvider = ({
  fileId,
  children,
}: IMessageContextProviderProps) => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const backupMessages = useRef("");

  const utils = trpc.useUtils();

  const { mutate: sendMessage } = useMutation({
    mutationFn: async ({ message }: { message: string }) => {
      const res = await fetch("/api/message", {
        method: "POST",
        body: JSON.stringify({
          fileId,
          message,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      return res.body;
    },
    onMutate: async ({ message }) => {
      backupMessages.current = message;
      setMessage("");

      // optimistiic updates
      await utils.getFileMessages.cancel();

      const prevMessages = utils.getFileMessages.getInfiniteData();

      utils.getFileMessages.setInfiniteData(
        {
          fileId,
          limit: INFINITE_QUERY_LIMIT,
        },
        (old) => {
          if (!old) {
            return { pages: [], pageParams: [] };
          }

          let newPages = [...old.pages];

          let latestPages = newPages[0];

          latestPages.messages = [
            {
              createdAt: new Date().toISOString(),
              id: crypto.randomUUID(),
              text: message,
              isUserMessages: true,
            },
            ...latestPages.messages,
          ];

          newPages[0] = latestPages;

          return {
            ...old,
            pages: newPages,
          };
        },
      );

      setIsLoading(true);

      return {
        prevMessages:
          prevMessages?.pages.flatMap((page) => page.messages) ?? [],
      };
    },
    onSuccess: async (stream) => {
      setIsLoading(false);

      if (!stream) {
        return toast.warning("There was a problem sending this messages", {
          description: "Please refresh this page and try again...",
        });
      }

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      // acumulated response
      let accResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        accResponse += chunkValue;

        // append chunk to the actual message

        utils.getFileMessages.setInfiniteData(
          { fileId, limit: INFINITE_QUERY_LIMIT },
          (old) => {
            if (!old) return { pageParams: [], pages: [] };

            let isAiResponseCreated = old.pages.some((page) =>
              page.messages.some((msg) => msg.id === "ai-response"),
            );

            let updatedPages = old.pages.map((page) => {
              if (page === old.pages[0]) {
                let updatedMessages;

                if (!isAiResponseCreated) {
                  updatedMessages = [
                    {
                      createdAt: new Date().toISOString(),
                      id: "ai-response",
                      text: accResponse,
                      isUserMessages: false,
                    },
                    ...page.messages,
                  ];
                } else {
                  updatedMessages = page.messages.map((message) => {
                    if (message.id === "ai-response") {
                      return {
                        ...message,
                        text: accResponse,
                      };
                    }

                    return message;
                  });
                }

                return {
                  ...page,
                  messages: updatedMessages,
                };
              }

              return page;
            });

            return { ...old, pages: updatedPages };
          },
        );
      }
    },
    onError: (_, __, context) => {
      setMessage(backupMessages.current);
      utils.getFileMessages.setData(
        { fileId },
        { messages: context?.prevMessages ?? [] },
      );
    },
    onSettled: async () => {
      setIsLoading(false);

      await utils.getFileMessages.invalidate({ fileId });
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const addMessage = () => sendMessage({ message });

  return (
    <MessageContext.Provider
      value={{
        addMessage,
        message,
        handleInputChange,
        isLoading,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
