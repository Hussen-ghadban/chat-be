import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username } = req.body;

  if (!username) {
    res.status(400).json({ error: "Username is required" });
    return;
  }

  try {
    const user = await prisma.user.create({
      data: { username },
    });

    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint failed
      res.status(409).json({ error: "Username already exists" });
    } else {
      console.error("Failed to add user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        username: "asc", // Optional: sort alphabetically
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}