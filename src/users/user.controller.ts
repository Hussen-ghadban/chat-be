import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";
import { errorHandler } from "../utils/error";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";
import bcrypt from "bcrypt";

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
    return next(errorHandler(500, "Failed to fetch users"));
  }
}
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "Email and password are required"));
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid email or password"));
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    res.status(200).json({
      status: 200,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return next(errorHandler(500, "Login failed"));
  }
};
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(400, "Username, email, and password are required"));
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return next(errorHandler(409, "Email already in use"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      status: 201,
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return next(errorHandler(500, "Registration failed"));
  }
};
