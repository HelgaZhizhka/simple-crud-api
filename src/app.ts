import { createServer } from "http";
import { config } from "dotenv";

import { server } from "./server";

config();

const PORT = process.env.PORT || 3000;

createServer(server).listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
