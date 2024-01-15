import DeleteButton from "@/components/dashboard-page/delete-buttons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/db";
import {
  BackpackIcon,
  CrumpledPaperIcon,
  DotsVerticalIcon,
  FileIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { UTApi } from "uploadthing/server";

interface IFileListProps {
  userId: string;
  userName: string;
}

const FileList = async ({ userId, userName }: IFileListProps) => {
  // let myPromise = new Promise((myResolve) => {
  //   setTimeout(function () {
  //     myResolve("I love You !!");
  //   }, 3000);
  // });
  // await myPromise;

  const files = await db.file.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      {files && files?.length !== 0 ? (
        <div className="mx-auto mt-8 grid w-full max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <Card
                key={file.id}
                className="shadow hover:shadow-xl dark:shadow-md dark:shadow-muted dark:hover:shadow-lg dark:hover:shadow-muted"
              >
                <Link href={`/dashboard/${file.id}`}>
                  <CardHeader className="relative flex flex-row items-center gap-4">
                    <FileIcon className="h-8 w-8" />
                    <div className="grid max-w-[70%] gap-1">
                      <CardTitle className="truncate font-semibold">
                        {file.name}
                        {/* www */}
                      </CardTitle>
                      <CardDescription>PDF</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="absolute right-2 top-0.5"
                          size="icon"
                          variant="ghost"
                        >
                          <DotsVerticalIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuItem className="z-50 p-0">
                          <form
                            action={async () => {
                              "use server";
                              const utapi = new UTApi();

                              const promiseTRPC = db.file.delete({
                                where: { id: file.id },
                              });
                              const promiseUT = utapi.deleteFiles(file.key);
                              const [delTRPC, delUT] = await Promise.all([
                                promiseTRPC,
                                promiseUT,
                              ]);
                              revalidatePath("/dashboard");
                              console.log("done");
                            }}
                            className="w-full p-0"
                          >
                            <DeleteButton />
                          </form>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <div className="text-sm font-semibold">{userName}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <PlusIcon className="h-4 w-4" />
                        <span className="text-gray-500 dark:text-gray-400">
                          {format(new Date(file.createdAt), "MMM yyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BackpackIcon className="h-4 w-4" />
                        <span className="text-gray-500 dark:text-gray-400">
                          main
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <CrumpledPaperIcon className="h-8 w-8 text-zinc-800" />
          <h3 className="text-xl font-semibold">
            Pretty empty arround here...
          </h3>
          <p>let&apos;s upload your first PDF.</p>
        </div>
      )}
    </>
  );
};

export default FileList;
