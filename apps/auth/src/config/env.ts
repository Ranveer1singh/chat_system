import dotenv from "dotenv";
import path from "path";

// Resolve from this app rather than the process working directory. This lets
// `pnpm dev` from the monorepo root load apps/auth/.env correctly.
dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});
