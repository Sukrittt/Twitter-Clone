import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid Id");
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
    });

    if (!userDetails) {
      throw new Error("Invalid Id");
    }
    let updatedFollowingIds = [...(userDetails.followingIds || [])];

    console.log("userId: ", userId);
    console.log("user name", userDetails.name);
    console.log("updatedFollowingIds", updatedFollowingIds);

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: "Someone started following you!",
            userId,
          },
        });

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotifications: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (eachId) => eachId !== userId
      );
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
