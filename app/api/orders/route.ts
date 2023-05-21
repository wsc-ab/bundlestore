import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST() {
  const data = {
    email: "elsa@prisma.io",
    name: "Elsa Prisma",
  };

  try {
    await prisma.user.create({
      data,
    });
    return NextResponse.json({ data });
  } catch (error) {
    console.log("error", error);
  }
}
