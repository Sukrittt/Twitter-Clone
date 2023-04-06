import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("Invalid Id");
    }

    const followingUsers = await prisma.user.findMany({
      where: {
        id: {
          in: user.followingIds,
        },
      },
    });

    return res.status(200).json(followingUsers);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
