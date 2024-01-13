import DeleteButton from "@/components/dashboard-page/delete-buttons";
import { db } from "@/db";
import {
  ChatBubbleIcon,
  CrumpledPaperIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { UTApi } from "uploadthing/server";

interface IFileListProps {
  userId: string;
}

const FileList = async ({ userId }: IFileListProps) => {
  let myPromise = new Promise((myResolve) => {
    setTimeout(function () {
      myResolve("I love You !!");
    }, 3000);
  });
  await myPromise;

  const files = await db.file.findMany({
    where: {
      userId: userId,
    },
  });

  return (
    <>
      {files && files?.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-primary/20 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-primary/15 rounded-lg bg-muted/50 shadow transition hover:shadow-lg "
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="flex w-full items-center justify-between space-x-6 px-6 pt-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-primary/90">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 grid grid-cols-3 place-items-center gap-6 px-6 py-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    {format(new Date(file.createdAt), "MMM yyy")}
                  </div>
                  <div className="flex items-center gap-2">
                    <ChatBubbleIcon className="h-4 w-4" />
                    Mocked
                  </div>
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
                  >
                    <DeleteButton />
                  </form>
                </div>
              </li>
            ))}
        </ul>
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
