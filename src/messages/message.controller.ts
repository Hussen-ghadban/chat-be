import { NextFunction, Request, Response } from "express";
import { getReceiverSocketId, io } from "../utils/socket";
import prisma from "../lib/prisma";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { senderId, receiverId, content } = req.body;

  if (!senderId || !receiverId || !content) {
    res.status(400).json({ error: "senderId, receiverId, and content are required" });
    return;
  }

  try {
    const message = await prisma.message.create({
      data: {
        content,
        senderId: Number(senderId),
        receiverId: Number(receiverId),
      },
    });

    const receiverSocketId = getReceiverSocketId(receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { senderId, receiverId } = req.query;

  if (!senderId || !receiverId) {
    res.status(400).json({ error: "senderId and receiverId are required" });
    return;
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: Number(senderId),
            receiverId: Number(receiverId),
          },
          {
            senderId: Number(receiverId),
            receiverId: Number(senderId),
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
