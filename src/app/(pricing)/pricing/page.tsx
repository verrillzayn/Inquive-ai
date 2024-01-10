import MaxWidthWrapper from "@/components/max-widht-wrapper";
import UpgradeButton from "@/components/pricing-page/upgrade-buton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PLANS } from "@/config/subscriptions-plans";
import { cn } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  MinusCircledIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

const PricingPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const pricingItems = [
    {
      plan: "Free",
      tagline: "For small side projects.",
      quota: 10,
      features: [
        {
          text: "5 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "4MB file size limit",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
          negative: true,
        },
        {
          text: "Priority support",
          negative: true,
        },
      ],
    },
    {
      plan: "Pro",
      tagline: "For larger projects with higher needs.",
      quota: PLANS.find((p) => p.slug === "pro")!.quota,
      features: [
        {
          text: "25 pages per PDF",
          footnote: "The maximum amount of pages per PDF-file.",
        },
        {
          text: "16MB file size limit",
          footnote: "The maximum file size of a single PDF file.",
        },
        {
          text: "Mobile-friendly interface",
        },
        {
          text: "Higher-quality responses",
          footnote: "Better algorithmic responses for enhanced content quality",
        },
        {
          text: "Priority support",
        },
      ],
    },
  ];

  return (
    <>
      <MaxWidthWrapper className="mb-8 mt-24 max-w-5xl text-center">
        <div className="mx-auto mb-10 sm:max-w-lg">
          <h1 className="text-6xl font-bold sm:text-7xl">Pricing</h1>
          <p className="mt-5 text-primary/60 sm:text-lg">
            Wheter you&apos;re just trying out our services or need more,
            we&apos;ve got you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-2">
          <TooltipProvider>
            {pricingItems.map(({ plan, tagline, quota, features }) => {
              const price =
                PLANS.find((p) => p.slug === plan.toLocaleLowerCase())?.price
                  .ammount || 0;

              return (
                <div
                  key={plan}
                  className={cn(
                    "relative rounded-2xl bg-primary-foreground shadow-xl dark:shadow-2xl dark:shadow-muted",
                    {
                      "border-2 border-primary/70": plan === "Pro",
                      "border border-muted": plan !== "Pro",
                    },
                  )}
                >
                  {plan === "Pro" && (
                    <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-primary to-muted-foreground px-3 py-2 text-sm font-medium text-primary-foreground">
                      Upgrade now
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-display my-3 text-center text-3xl font-bold">
                      {plan}
                    </h3>
                    <p className="text-muted-foreground">{tagline}</p>
                    <p className="font-display my-5 text-6xl font-semibold">
                      ${price}
                      <span className="text-sm text-muted-foreground">
                        / Month
                      </span>
                    </p>
                  </div>
                  <div className="flex h-20 items-center justify-center border-b border-t border-muted bg-muted/50">
                    <div className="flex items-center space-x-1">
                      <p>{quota.toLocaleString()} PDFs/Month included</p>
                      <Tooltip delayDuration={300}>
                        <TooltipTrigger className="ml-1.5 cursor-default">
                          <QuestionMarkCircledIcon className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="w-80 p-2">
                          How many PDFs you can upload per month.
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <ul className="my-10 space-y-5 px-8">
                    {features.map(({ text, footnote, negative }) => (
                      <li className="flex space-x-5" key={text}>
                        <div className="flex-shrink-0">
                          {negative ? (
                            <MinusCircledIcon className="h-6 w-6 text-muted-foreground/60" />
                          ) : (
                            <CheckCircledIcon className="h-6 w-6 fill-black text-primary" />
                          )}
                        </div>
                        {footnote ? (
                          <div className="flex items-center space-x-1">
                            <p
                              className={cn("text-primary", {
                                "text-muted-foreground/70": negative,
                              })}
                            >
                              {text}
                            </p>
                            <Tooltip delayDuration={300}>
                              <TooltipTrigger className="ml-1.5 cursor-default">
                                <QuestionMarkCircledIcon
                                  className={cn(
                                    "h-4 w-4 text-muted-foreground",
                                    {
                                      hidden: negative,
                                    },
                                  )}
                                />
                              </TooltipTrigger>
                              <TooltipContent className="w-80 p-2">
                                {footnote}
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        ) : (
                          <p
                            className={cn("text-primary", {
                              "text-muted-foreground/70": negative,
                            })}
                          >
                            {text}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-muted-foreground" />
                  <div className="p-5">
                    {plan === "Free" ? (
                      <Button asChild variant="secondary" className="w-full">
                        <Link href={user ? "/dashboard" : "sign-in"}>
                          {user ? "Upgrade now" : "Sign up"}
                          <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : user ? (
                      <UpgradeButton />
                    ) : (
                      <Button asChild className="w-full">
                        <Link href="/sign-in">
                          {user ? "Upgrade now" : "Sign up"}
                          <ArrowRightIcon className="ml-1.5 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </TooltipProvider>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default PricingPage;
