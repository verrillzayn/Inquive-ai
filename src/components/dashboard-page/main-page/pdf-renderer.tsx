"use client";

import Loader from "@/components/loader";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResizeDetector } from "react-resize-detector";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import SimpleBar from "simplebar-react";

import { cn } from "@/lib/utils";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import PdfFullScreen from "@/components/dashboard-page/main-page/pdf-full-screen";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const { width, ref, height } = useResizeDetector();

  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== scale;

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="flex w-full flex-col items-center rounded-md bg-primary-foreground shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-primary/20">
        <div className="flex w-fit items-center gap-0.5 pl-4 sm:gap-1.5">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(currentPage - 1));
            }}
            size="sm"
            variant="ghost"
            aria-label="previous page"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "h-8 w-12 ",
                errors.page && "focus-visible:ring-red-500",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className="space-x-1 text-sm text-primary">
              <span>/</span>
              <span>{numPages ?? "-"}</span>
            </p>
          </div>

          <Button
            disabled={numPages === undefined || currentPage === numPages}
            onClick={() => {
              setCurrentPage((prev) =>
                prev > numPages! ? numPages! : prev + 1,
              );
              setValue("page", String(currentPage + 1));
            }}
            size="sm"
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2  pr-1 sm:pr-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-0.5 px-2 sm:gap-1.5 sm:px-3"
                aria-label="zoom"
                size="sm"
                variant="ghost"
              >
                <MagnifyingGlassIcon className="h-4 w-4" />
                {scale * 100}%<ChevronDownIcon className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.25)}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.75)}>
                175%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            aria-label="rotate 90 degrees"
            variant="ghost"
            size="sm"
            className="px-2 sm:px-3"
          >
            <ReloadIcon className="h-4 w-4" />
          </Button>

          <PdfFullScreen url={url} />
        </div>
      </div>

      <div className="max-h-screen w-full flex-1">
        <SimpleBar autoHide={true} className="max-h-[calc(100vh-10rem)]">
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
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  height={height ? height : 1}
                  pageNumber={currentPage}
                  scale={scale}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                height={height ? height : 1}
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                key={"@" + scale}
                loading={
                  <div className="flex justify-center">
                    <Loader className="my-24 h-6 w-6 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export const PdfLoading = () => (
  <div className="flex justify-center ">
    <Loader className="my-24 h-6 w-6 animate-spin" />
  </div>
);

export default PdfRenderer;
