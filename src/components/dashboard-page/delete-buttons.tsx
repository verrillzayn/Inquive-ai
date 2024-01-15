"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();

        console.log("asd");
      }}
      size="sm"
      className="flex w-full justify-start gap-3 text-sm font-normal"
      variant="ghost"
    >
      {pending ? (
        <Loader className="h-4 w-4 animate-spin text-destructive" />
      ) : (
        <TrashIcon className="h-4 w-4 text-destructive" />
      )}
      Delete
    </Button>
  );
};

export default DeleteButton;
