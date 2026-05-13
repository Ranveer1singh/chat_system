import Server from "./utility/server"
import "dotenv/config"
import cors from "cors";
class Gateway {
    public run(): void {
        const server = new Server()
        server.start()
    }
}
const app = new Gateway()
app.run()
