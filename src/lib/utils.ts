import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Icons {
  icon: Icon[];
}

interface Icon {
  media: string;
  url: string;
  href: string;
}

export function constructMetadata({
  title = "Inquive - Your PDFs with Personality",
  description = "Step into the world of Inquive, where PDFs come alive through the art of conversation. Upload your documents, compose prompts, and let our AI orchestrate a unique dialogue, creating a masterpiece of knowledge and interaction.",
  image = "/thumbnail.png",
  icons = {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.png",
        href: "/logo-dark.png",
      },
    ],
  },
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string | Icons;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
