import { useState } from "react";

import { Document, Page } from "react-pdf";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

import { EnterFullScreenIcon } from "@radix-ui/react-icons";

import { useResizeDetector } from "react-resize-detector";

import SimpleBar from "simplebar-react";

import { PdfLoading } from "@/components/dashboard-page/main-page/pdf-renderer";

interface PdfFullScreenProps {
  url: string;
}

const PdfFullScreen = ({ url }: PdfFullScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();

  const { width, ref, height } = useResizeDetector();

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
        <Button
          aria-label="Enter fullscreen"
          variant="ghost"
          size="sm"
          className="gap-0.5 px-2 sm:gap-1.5 sm:px-3"
        >
          <EnterFullScreenIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] w-full max-w-7xl lg:h-[90vh]">
        <SimpleBar autoHide={false} className="mt-6 max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              onLoadError={() => {
                toast.error("Failed to load PDF");
              }}
              loading={<PdfLoading />}
              file={url}
              className="max-h-full"
            >
              {new Array(numPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullScreen;
