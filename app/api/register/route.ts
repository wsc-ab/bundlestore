import { prisma } from "@/utils/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const register = await prisma.register.create({
    data,
  });

  return NextResponse.json({ register });
}
