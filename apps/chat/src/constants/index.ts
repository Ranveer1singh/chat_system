import "dotenv/config"

export const MongoDb_Uri  = process.env.Mongo_uri || "mongodb://localhost:27017/chat_service";