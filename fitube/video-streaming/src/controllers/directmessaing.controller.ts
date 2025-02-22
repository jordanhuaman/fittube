import http from "node:http"
import { Request, Response } from "express"
const sendMessageToVideoStorage = async (req: Request, res: Response) => {
  const postOptions = {
    method: "POST", // Sets the request method as POST.
    headers: {
      "Content-Type": "application/json", // Sets the content type for the request's body.
    },
  }
  const requestBody = { // Body of the HTTP POST request.
    message: "hello world"
  };

  const sending = http.request(
    "http://video-storage/viewed",
    postOptions
  )

  sending.on("close", () => {
    console.log("Sent 'viewed' message to history microservice.");
  });

  sending.on("error", (err) => {
    console.error("Failed to send 'viewed' message!");
    console.error(err && err.stack || err);
  });

  sending.write(JSON.stringify(requestBody)); // Write the body to the request.
  sending.end(); // End the request.
  res.json({ msg: "ok" })
}
export default sendMessageToVideoStorage;