import { Router } from "express";
import userRouter from "./features/users/user.routes";
import messageRoutes from "./features/messages/message.routes";

const router=Router();

router.use("/api/messages", messageRoutes);
router.use("/api/users", userRouter);

router.get("/", (req, res) => {
  res.send("Welcome to the Chat API!");
}
);

export default router;