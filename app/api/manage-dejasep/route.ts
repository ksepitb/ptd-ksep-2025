import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Accept or reject a Dejasep
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user's kajasep
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { kajasep: true },
    });

    if (!user?.kajasep) {
      return NextResponse.json(
        { error: "Only Kajasep can accept/reject Dejasep" },
        { status: 403 }
      );
    }

    const { dejasepId, action } = await request.json();

    if (!dejasepId || !action) {
      return NextResponse.json(
        { error: "Dejasep ID and action are required" },
        { status: 400 }
      );
    }

    if (action !== "accept" && action !== "reject") {
      return NextResponse.json(
        { error: "Action must be 'accept' or 'reject'" },
        { status: 400 }
      );
    }

    // Find the dejasep and verify they chose this kajasep
    const dejasep = await prisma.dejasep.findUnique({
      where: { id: dejasepId },
    });

    if (!dejasep) {
      return NextResponse.json({ error: "Dejasep not found" }, { status: 404 });
    }

    if (dejasep.chosenKajasepId !== user.kajasep.id) {
      return NextResponse.json(
        { error: "This Dejasep did not choose you" },
        { status: 403 }
      );
    }

    if (action === "accept") {
      // Accept the dejasep
      await prisma.dejasep.update({
        where: { id: dejasepId },
        data: { status: "accepted" },
      });
    } else {
      // Reject the dejasep - clear their choice so they can choose again
      await prisma.dejasep.update({
        where: { id: dejasepId },
        data: {
          chosenKajasepId: null,
          status: "pending" // Reset to pending so they can choose again
        },
      });
    }

    return NextResponse.json({ success: true, action });
  } catch (error) {
    console.error("Manage dejasep error:", error);
    return NextResponse.json(
      { error: "Failed to manage Dejasep" },
      { status: 500 }
    );
  }
}
