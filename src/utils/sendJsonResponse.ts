import { ServerResponse } from "http";

const sendJsonResponse = (
  res: ServerResponse,
  data: any,
  statusCode: number = 200,
) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export default sendJsonResponse;
