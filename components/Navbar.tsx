import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let userData = {
    isLoggedIn: false,
    isKajasep: false,
    isDejasep: false,
    userName: "",
  };

  if (session?.user) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        kajasep: true,
        dejasep: true,
      },
    });

    userData = {
      isLoggedIn: true,
      isKajasep: !!user?.kajasep,
      isDejasep: !!user?.dejasep,
      userName: user?.name || session.user.name || "User",
    };
  }

  return <NavbarClient user={userData} />;
}

