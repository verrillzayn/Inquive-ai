import Dashboard from "@/components/dashboard-page/dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) redirect("/auth-callback?origin=dashboard");

  const dbUser = await db.user.findFirst({
    where: {
      OR: [
        {
          id: user.id,
        },
        {
          email: user.email!,
        },
      ],
    },
  });

  if (!dbUser) redirect("/auth-callback?origin=dashboard");

  return <Dashboard isSubscribe={dbUser.isSubscribe} />;
};

export default Page;
