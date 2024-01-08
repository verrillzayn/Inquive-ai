"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

const Page = () => {
  const router = useRouter();

  const searParams = useSearchParams();
  const origin = searParams.get("origin");

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ succes }) => {
      if (succes) {
        // user is sync to database
        router.push(origin ? `/${origin}` : "/dashboard");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 500,
  });
  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-2 animate-spin text-zinc-800"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <h3 className="text-xl font-semibold">Setting up your account...</h3>
        <p>You will be redirected automaticly.</p>
      </div>
    </div>
  );
};

export default Page;
