import { IncomingMessage, ServerResponse } from "http";

import { usersRouter } from "./controllers/usersController";

export const server = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;
  if (!url || !method) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Bad Request" }));
    return;
  }

  if (url.startsWith("/api/users")) {
    usersRouter(req, res);
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Not Found" }));
};
