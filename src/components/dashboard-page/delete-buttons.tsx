"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" className="w-full" variant="ghost">
      {pending ? (
        <Loader className="h-4 w-4 animate-spin text-destructive" />
      ) : (
        <TrashIcon className="h-4 w-4 text-destructive" />
      )}
    </Button>
  );
};

export default DeleteButton;
