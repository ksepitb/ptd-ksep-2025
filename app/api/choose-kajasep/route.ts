import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// POST - Choose a Kajasep
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user's dejasep
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { dejasep: true },
    });

    if (!user?.dejasep) {
      return NextResponse.json(
        { error: "Only Dejasep can choose Kajasep" },
        { status: 403 }
      );
    }

    if (user.dejasep.chosenKajasepId) {
      return NextResponse.json(
        { error: "You have already chosen a Kajasep" },
        { status: 400 }
      );
    }

    const { kajasepId } = await request.json();

    if (!kajasepId) {
      return NextResponse.json(
        { error: "Kajasep ID is required" },
        { status: 400 }
      );
    }

    // Get the kajasep and check availability
    const kajasep = await prisma.kajasep.findUnique({
      where: { id: kajasepId },
      include: {
        _count: {
          select: { chosenBy: true },
        },
      },
    });

    if (!kajasep) {
      return NextResponse.json({ error: "Kajasep not found" }, { status: 404 });
    }

    const maxChoosers = kajasep.amountDejasep + 1;
    if (kajasep._count.chosenBy >= maxChoosers) {
      return NextResponse.json(
        { error: "This Kajasep is already full" },
        { status: 400 }
      );
    }

    // Update dejasep with chosen kajasep
    await prisma.dejasep.update({
      where: { id: user.dejasep.id },
      data: { chosenKajasepId: kajasepId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Choose kajasep error:", error);
    return NextResponse.json(
      { error: "Failed to choose Kajasep" },
      { status: 500 }
    );
  }
}

// DELETE - Unchoose Kajasep
export async function DELETE() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get current user's dejasep
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { dejasep: true },
    });

    if (!user?.dejasep) {
      return NextResponse.json(
        { error: "Only Dejasep can manage Kajasep selection" },
        { status: 403 }
      );
    }

    // Clear the chosen kajasep
    await prisma.dejasep.update({
      where: { id: user.dejasep.id },
      data: { chosenKajasepId: null },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unchoose kajasep error:", error);
    return NextResponse.json(
      { error: "Failed to unchoose Kajasep" },
      { status: 500 }
    );
  }
}
