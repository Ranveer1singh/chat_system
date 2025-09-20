import { Request, Response } from "express";
import twilio from "twilio"
import { makeCall } from "../utils/initiateCall";
class VocieCallController {

    async generatetoken(req: Request, res: Response) {
        try {
            const AccessToken = require('twilio').jwt.AccessToken;
            const VoiceGrant = AccessToken.VoiceGrant;
            const accountSid = process.env.TWILIO_ACC_SID;
            const apiKeySid = process.env.TWILIO_APIKEY_SID;
            const apiKeySecret = process.env.TWILIO_APIKEY_SECRET;
            const identity = 'user_identity'

            const accessToken = new AccessToken(
                accountSid,
                apiKeySid,
                apiKeySecret,
                { identity: identity }
            );
            const voiceGrant = new VoiceGrant({
                outgoingApplicationSid: process.env.TWILIO_TwiML_App_SID!, // Replace with your TwiML App SID
                // incomingAllow: true, // Uncomment to allow incoming calls
            });
            // Add the Voice Grant to the Access Token
            accessToken.addGrant(voiceGrant);
            const token = accessToken.toJwt();
            return res.status(200).json({token:token})
        } catch (error) {

        }
    }
    async voiceCall(req: Request, res: Response) {
        try {
            const { to } = req.body
            const call = await makeCall(to)
            return res.status(200).json({ data: call })
        } catch (error) {
            throw new Error(error as any)
        }
    }
    async voiceResponse(req: Request, res: Response) {
        try {
            const twiml = new twilio.twiml.VoiceResponse();
            // twiml.say("Hello, this is a test call from Twilio!");
            const to = req.body.To || "+918889332916";
             twiml.dial(to);
            res.type("text/xml");
            res.send(twiml.toString());
        } catch (error) {
            throw new Error(error as any)
        }
    }
    async callStatus(req: Request, res: Response) {
        console.log("📞 Call Status Update:", req.body);
        res.sendStatus(200);
    };
    async recordingStatus(req: Request, res: Response) {
        console.log("🎙️ Recording Status Update:", req.body);
        res.sendStatus(200);
    };
}

export const vocieCallController = new VocieCallController