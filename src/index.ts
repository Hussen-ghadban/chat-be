import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import messageRoutes from "./features/messages/message.routes";
import userRouter from "./features/users/user.routes";
import { app, server } from "./utils/socket";
import errorMiddleware from "./middleware/errorHandler";
import router from "./routes";

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(router);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use(errorMiddleware);
