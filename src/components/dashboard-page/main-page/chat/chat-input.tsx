import { PaperPlaneIcon } from "@radix-ui/react-icons";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { useContext, useRef } from "react";
import { MessageContext } from "@/components/providers/message-context";

interface ChatInputProps {
  isDisable?: boolean;
}

const ChatInput = ({ isDisable }: ChatInputProps) => {
  const { addMessage, handleInputChange, isLoading, message } =
    useContext(MessageContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();

      textAreaRef.current?.focus();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    addMessage();

    textAreaRef.current?.focus();
  };

  return (
    <div className="absolute bottom-0 left-0 w-full bg-primary-foreground">
      <form className="lg:max-w-xl: mx-2 flex flex-row md:mx-4 lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex w-full flex-grow flex-col p-4">
            <div className="relative">
              <Textarea
                ref={textAreaRef}
                rows={1}
                maxRows={4}
                autoFocus
                onChange={handleInputChange}
                value={message}
                onKeyDown={onKeyDown}
                className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch resize-none py-3 pr-12 text-base"
                placeholder="Inqured with inquiVe..."
              />

              <Button
                disabled={isLoading || isDisable}
                type="submit"
                onClick={handleClick}
                aria-label="send message"
                className="absolute bottom-1.5 right-2"
              >
                <PaperPlaneIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
