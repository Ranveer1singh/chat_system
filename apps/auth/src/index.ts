import "./config/env";
import Server from "./utility/server";


class AuthApplication {
    public run(): void {
        const server = new Server()
        server.start()
    }
}

const authApplication = new AuthApplication
authApplication.run()
