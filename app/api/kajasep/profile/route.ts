import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT - Update Kajasep profile
export async function PUT(request: NextRequest) {
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
        { error: "Only Kajasep can update profile" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Validate and extract allowed fields
    const allowedFields = [
      "name",
      "jurusan",
      "idLine",
      "instagram",
      "mbti",
      "hobby",
      "tigaKata",
      "preferensiDejasep",
      "description",
      "photoUrl",
    ];

    const updateData: Record<string, string | null> = {};
    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        updateData[field] = data[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Update kajasep profile
    const updatedKajasep = await prisma.kajasep.update({
      where: { id: user.kajasep.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, kajasep: updatedKajasep });
  } catch (error) {
    console.error("Update kajasep profile error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
