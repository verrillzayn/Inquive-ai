import MaxWidthWrapper from "@/components/max-widht-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-20 flex flex-col items-center justify-center text-center sm:mt-6">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-muted bg-background px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 dark:shadow-zinc-500 dark:hover:border-gray-600">
          <p className="text-sm font-semibold text-foreground">
            Inquive is now public!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-semibold text-primary md:text-[3.75rem] md:leading-[4rem] lg:text-7xl lg:leading-[5rem]">
          Chat with your{" "}
          <span className="items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 text-primary-foreground shadow">
            documents
          </span>{" "}
          in seconds.
        </h1>
        <p className="mt-5 max-w-prose text-primary/70 sm:text-lg">
          Step into the world of Inquive, where PDFs come alive through the art
          of conversation. Upload your documents, compose prompts, and let our
          AI orchestrate a unique dialogue, creating a masterpiece of knowledge
          and interaction.
        </p>

        <Button size="lg" className="mt-4" asChild>
          <Link href="/dashboard">
            Get started <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </MaxWidthWrapper>
      <div>
        <div className="relative isolate">
          <div>
            <div className="lg;px-8 mx-auto max-w-6xl px-6">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 flex items-center justify-center rounded-xl p-2 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <div className="relative h-[300px]  w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
                    <Image
                      src="/documents.png"
                      fill
                      className="object-contain dark:hidden"
                      alt="Documents Heroes"
                    />
                    <Image
                      src="/documents-dark.png"
                      fill
                      className="hidden object-contain dark:block"
                      alt="Documents Heroes"
                    />
                  </div>
                  <div className="relative hidden h-[400px] w-[400px] md:block">
                    <Image
                      src="/reading.png"
                      fill
                      className="object-contain dark:hidden"
                      alt="Reading Heroes"
                    />
                    <Image
                      src="/reading-dark.png"
                      fill
                      className="hidden object-contain dark:block"
                      alt="Reading Heroes"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden={true}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-35 sm:left-[calc(50%-30rem)] sm:w-[72.1875]"
        />
      </div>
      <div className="relative mx-auto my-32 max-w-5xl sm:mt-56">
        <div
          aria-hidden={true}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-35 sm:left-[calc(50%-36rem)] sm:w-[72.1875]"
          />
        </div>
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="sm:texx-5xl mt-2 text-4xl font-bold text-primary/90">
              Start chatting in minutes
            </h2>
            <p className="mt-4 text-lg text-primary/60">
              Chatting to your PDF files has never been easier than with Inquive
            </p>
          </div>
        </div>

        <ol className="my-8 space-y-4 pt-8 md:flex  md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-primary/70">
                Either starting with free plan or choose our
                <Button
                  className="pl-1 text-base font-extrabold"
                  variant="link"
                  asChild
                >
                  <Link href="/pricing">pro plan.</Link>
                </Button>
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Upload your PDF file
              </span>
              <span className="mt-2 text-primary/70">
                We&apos;ll process your file and make it ready for you to chat
                with.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">
                Start asking question
              </span>
              <span className="mt-2 text-primary/70">
                It&apos;s that simple. Try out Inquive today - it really takes
                less than a minute.
              </span>
            </div>
          </li>
        </ol>
      </div>
    </>
  );
}
