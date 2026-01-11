import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // Fetch user data with kajasep/dejasep relations
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      kajasep: {
        include: {
          _count: {
            select: { chosenBy: true },
          },
        },
      },
      dejasep: {
        include: {
          chosenKajasep: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/sign-in");
  }

  return <DashboardClient user={user} />;
}
