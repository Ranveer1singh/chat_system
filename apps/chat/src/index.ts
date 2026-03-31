import Server from "./utils/server";


class ChatApplication{
    public run():void{
        const server = new Server()
        server.start()
    }
}

const chatApplication = new ChatApplication
chatApplication.run()