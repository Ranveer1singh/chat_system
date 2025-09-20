import express, { Request, Response } from "express"
import { vocieCallController } from "../controller/voice"

const router = express.Router()

router.post("/generatetoken", vocieCallController.generatetoken)
router.post("/call", vocieCallController.voiceCall)
router.post("/voice", vocieCallController.voiceResponse )
router.post("/status-call", vocieCallController.callStatus )
router.post("/recording-call", vocieCallController.recordingStatus )
router.get("/",async (req : Request, res : Response)=>{
res.send("hello twilio")
})

export default router