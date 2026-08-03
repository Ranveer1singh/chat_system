import { Router } from "express";
import { chatController } from "../controller/chat";

const router = Router();

router.post("/", chatController.createChat);
router.get("/user/:userId", chatController.getUserChats);
router.get("/:id/access", chatController.checkAccess);
router.get("/:id/messages", chatController.getMessages);
router.get("/:id", chatController.getChat);
router.put("/:id", chatController.updateChat);
router.delete("/:id", chatController.deleteChat);

export default router;
