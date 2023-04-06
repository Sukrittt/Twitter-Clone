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
      throw new Error("Invalid ID");
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const userFollowersCount = await prisma.user.count({
      where: {
        //count all users who follow "existingUser"
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...existingUser, userFollowersCount });
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
}
