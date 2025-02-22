import { Router } from "express";
import { getVideo } from "../controllers/vide.controller";
import sendMessageToVideoStorage from "../controllers/directmessaing.controller";

const appRouter = Router();

appRouter.get('/', (req, res) => res.json({ msg: "ok"}))
appRouter.get('/video', getVideo)
appRouter.get("/directmessage", sendMessageToVideoStorage)

export default appRouter;