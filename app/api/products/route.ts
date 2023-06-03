import { prisma } from "@/utils/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const product = await prisma.product.create({
    data,
  });

  return NextResponse.json({
    product,
  });
}

export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json({
    products,
  });
}
