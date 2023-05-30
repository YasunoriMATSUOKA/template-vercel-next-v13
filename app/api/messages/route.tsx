import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(_request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    const messages = await prisma.message.findMany();
    if (!messages.length) {
      return NextResponse.json([], {status: 204});
    }
    return NextResponse.json(messages, {status: 200});      
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message}, {status: 500});
    }
    return NextResponse.json({message: "unknown error"}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();
  try {
    const data = await request.json();
    await prisma.$connect();
    const message = await prisma.message.create({data});
    if (!message) {
      return NextResponse.json({message: "unknown error"}, {status: 500});
    }
    return NextResponse.json(message, {status: 201});
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message}, {status: 500});
    }
    return NextResponse.json({message: "unknown error"}, {status: 500});
  } finally {
    await prisma.$disconnect();
  }
}
