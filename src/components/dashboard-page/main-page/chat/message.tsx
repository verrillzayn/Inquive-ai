import { Icons } from "@/components/inquive-icons";
import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { format } from "date-fns";
import { forwardRef } from "react";
import ReactMarkdown from "react-markdown";

interface IMessageProps {
  isNextMessagesIsSamePerson: boolean;
  message: ExtendedMessage;
}

const Message = forwardRef<HTMLDivElement, IMessageProps>(
  ({ isNextMessagesIsSamePerson, message }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-end", {
          "justify-end": message.isUserMessages,
        })}
      >
        <div // user and logo icon
          className={cn("relative flex h-7 w-7 items-center justify-center", {
            "order-2 rounded-full bg-primary/90 text-primary-foreground":
              message.isUserMessages,
            "order-1 rounded-full bg-primary p-0.5": !message.isUserMessages,
            invisible: isNextMessagesIsSamePerson,
          })}
        >
          {message.isUserMessages ? (
            <Icons.User className="fill-primary/25 text-primary-foreground" />
          ) : (
            <Icons.logo className="h-3/4 w-3/4 fill-primary-foreground" />
          )}
        </div>

        <div
          className={cn("mx-2 flex max-w-md flex-col space-y-2 text-base", {
            "border-1 items-end": message.isUserMessages,
            "order-2 items-start": !message.isUserMessages,
          })}
        >
          <div // chat bubble
            className={cn("inline-block rounded-xl px-4 py-2", {
              "bg-primary text-primary-foreground": message.isUserMessages,
              "bg-primary/10 text-primary": !message.isUserMessages,
              "rounded-br-none":
                !isNextMessagesIsSamePerson && message.isUserMessages,
              "rounded-bl-none":
                !isNextMessagesIsSamePerson && !message.isUserMessages,
            })}
          >
            {typeof message.text === "string" ? (
              <ReactMarkdown
                className={cn("prose", {
                  "text-primary-foreground/90": message.isUserMessages,
                  "text-primary/85": !message.isUserMessages,
                })}
              >
                {message.text}
              </ReactMarkdown>
            ) : (
              message.text
            )}
            {message.id !== "loading-messages" ? (
              <div
                className={cn("mt-2 w-full select-none text-right text-xs", {
                  "text-primary": !message.isUserMessages,
                  "text-primary-foreground": message.isUserMessages,
                })}
              >
                {format(new Date(message.createdAt), "HH:mm")}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  },
);

Message.displayName = "Message";

export default Message;
