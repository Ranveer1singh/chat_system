import "./config/env";
import Server from "./utils/server";
import { validateJwtConfig } from "@repo/utility";


class ChatApplication{
    public run():void{
        const server = new Server()
        server.start()
    }
}

const chatApplication = new ChatApplication
validateJwtConfig();
chatApplication.run()
