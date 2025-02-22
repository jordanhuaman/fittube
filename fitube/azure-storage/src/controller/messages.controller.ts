import { Request, Response } from "express";

const reciveDirectMessage = (req: Request, res: Response) => {
  const message = req.body.message;
  console.log("message recived:::: " , message)
  return res.json({ msg: "ok", message })
}

export default reciveDirectMessage;