import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import messageRoutes from "./features/messages/message.routes";
import userRouter from "./features/users/user.routes";
import { app, server } from "./utils/socket";

dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the Chat API!");
}
);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
