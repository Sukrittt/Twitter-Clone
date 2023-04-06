import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { id } = req.body;
    if (!id || typeof id !== "string") {
      throw new Error("Invalid Id");
    }

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
