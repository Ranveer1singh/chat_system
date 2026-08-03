import "./config/env";
import Server from "./utility/server";
import { validateJwtConfig } from "@repo/utility";


class AuthApplication {
    public run(): void {
        const server = new Server()
        server.start()
    }
}

const authApplication = new AuthApplication
validateJwtConfig();
authApplication.run()
