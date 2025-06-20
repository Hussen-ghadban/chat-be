import { NextFunction, Request, Response } from "express";
import { getReceiverSocketId, io } from "../../utils/socket";
import prisma from "../../lib/prisma";
import { errorHandler } from "../../utils/error";

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
        senderId: senderId,
        receiverId: receiverId,
      },
    });

    const receiverSocketId = getReceiverSocketId(receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);
    }

    res.status(201).json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    next(errorHandler(500, "Failed to send message"));
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

  const senderIdStr = String(senderId);
  const receiverIdStr = String(receiverId);

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: senderIdStr,
            receiverId: receiverIdStr,
          },
          {
            senderId: receiverIdStr,
            receiverId: senderIdStr,
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
    next(errorHandler(500, "Failed to fetch messages"));
  }
};


export const getUserChats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.query;

  if (!userId) {
    res.status(400).json({ error: "userId is required" });
    return;
  }

  const userIdStr = String(userId);

  try {
    const chats = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userIdStr },
          { receiverId: userIdStr }
        ]
      },
      select: {
        senderId: true,
        receiverId: true
      }
    });

    const chatUserIds = new Set<string>();
    chats.forEach(chat => {
      if (chat.senderId !== userIdStr) chatUserIds.add(chat.senderId);
      if (chat.receiverId !== userIdStr) chatUserIds.add(chat.receiverId);
    });

    res.json(Array.from(chatUserIds));
  } catch (error) {
    console.error("Error fetching user chats:", error);
    next(errorHandler(500, "Failed to fetch user chats"));
  }
};