import { IncomingMessage, ServerResponse } from "http";

import * as userService from "../services/userService";
import { parseRequestBody, sendJsonResponse } from "../utils/index";

export const usersRouter = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  try {
    const url = new URL(req.url || "", `http://${req.headers.host}`);
    const userId = url.pathname.split("/")[3];

    switch (req.method) {
      case "GET":
        if (userId) {
          const user = userService.getUserById(+userId);
          if (user) {
            sendJsonResponse(res, user, 200);
          } else {
            sendJsonResponse(res, { error: "User not found" }, 404);
          }
        } else {
          const users = userService.getAllUsers();
          sendJsonResponse(res, users, 200);
        }
        break;
      case "POST":
        const newUser = await parseRequestBody(req);
        const createdUser = userService.createUser(newUser);
        sendJsonResponse(res, createdUser, 201);
        break;
      case "PUT":
        if (userId) {
          const userData = await parseRequestBody(req);
          const updatedUser = userService.updateUser(+userId, userData);
          if (updatedUser) {
            sendJsonResponse(res, updatedUser, 200);
          } else {
            sendJsonResponse(res, { error: "User not found" }, 404);
          }
        } else {
          sendJsonResponse(res, { error: "User ID is required" }, 400);
        }
        break;
      case "DELETE":
        if (userId) {
          const isDeleted = userService.deleteUser(+userId);
          if (isDeleted) {
            res.writeHead(204);
            res.end();
          } else {
            sendJsonResponse(res, { error: "User not found" }, 404);
          }
        } else {
          sendJsonResponse(res, { error: "User ID is required" }, 400);
        }
        break;
      default:
        sendJsonResponse(res, { error: "Method not allowed" }, 405);
    }
  } catch (error) {
    console.error(error);
    sendJsonResponse(res, { error: "Internal server error" }, 500);
  }
};
