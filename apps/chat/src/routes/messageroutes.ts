import express from "express"
import { chatController } from "../controller/chat"
import { messageController } from "../controller/message"

const router = express.Router()

router.post("/" , messageController.sendMessage)
router.get("/:chatId",messageController.getMessageByChatId)


export default router