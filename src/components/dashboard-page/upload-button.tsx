"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { trpc } from "@/app/_trpc/client";
import Loader from "@/components/loader";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { FileIcon, UploadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

const UploadDropzone = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { data } = trpc.authCallback.useQuery();
  const isSubscribe = data?.dbUser?.isSubscribe;

  const { startUpload } = useUploadThing(
    isSubscribe ? "proPlanUploader" : "freePlanUploader",
  );
  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file?.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);

    return interval;
  };

  const onFileDrop = async (acceptedFiles: File[]) => {
    setIsUploading(true);

    const progressInterval = startSimulatedProgress();

    const promise = startUpload(acceptedFiles);

    toast.promise(promise, {
      loading: "Uploading PDF...",
      error: "Failed to upload PDF",
      success: (data) => {
        const [res] = data!;
        const key = res.key;
        if (!key) {
          return toast.error(`there's no key`);
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        startPolling({ key });

        return "PDF uploaded!";
      },
    });
  };

  return (
    <Dropzone
      onDrop={(acceptedFiles) => onFileDrop(acceptedFiles)}
      multiple={false}
    >
      {({ getRootProps, acceptedFiles, getInputProps }) => (
        <div
          {...getRootProps()}
          className="m-4 h-64 rounded-lg border border-dashed border-muted-foreground"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-full items-center justify-center"
          >
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-600/25 dark:bg-muted dark:hover:bg-primary-foreground"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <UploadIcon className="mb-4 h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload </span>
                  or Drag and drop
                </p>
                <p className="text-xs text-muted-foreground/70">
                  PDF (up to {isSubscribe ? "16" : "4"}MB)
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="flex max-w-xs items-center divide-x divide-white overflow-hidden rounded-md bg-gray-200 outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileIcon className="h-4 w-4" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-4 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex items-center justify-center gap-1 pt-4 text-center text-xs text-zinc-700">
                      <Loader className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                type="file"
                id="dropzone-file"
                className="hidden"
                onClick={() => console.log("asdddads")}
                {...getInputProps()}
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
