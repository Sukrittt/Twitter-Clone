import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const retweetedPosts = await prisma.post.findMany({
      where: {
        retweetIds: {
          has: userId,
        },
      },
      include: {
        //include user and comments details along with it
        user: true,
        coments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(retweetedPosts);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
