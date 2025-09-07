import { Router } from "express";
import { chatController } from "../controller/chat";

const router = Router();

router.post("/", chatController.createChat);
router.get("/:id", chatController.getChat);
router.get("/user/:userId", chatController.getUserChats);
router.put("/:id", chatController.updateChat);
router.delete("/:id", chatController.deleteChat);

export default router;
