import { MotionsRecord } from "@prisma/client";
import prisma from "../lib/db";

export async function GET() {
  const data = await prisma.motionsRecord.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ data });
}

export async function POST() {
  const data = await prisma.motionsRecord.create({
    data: {
      title: "Motion Detected",
    },
  });

  console.log(data);

  return Response.json({ data });
}
