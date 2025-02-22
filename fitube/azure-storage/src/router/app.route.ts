import { Router } from "express";
import { getVideo, testStatusApp } from "../controller/app.controller";
import reciveDirectMessage from "../controller/messages.controller";

const appRouter = Router();

appRouter.get('/', testStatusApp)
appRouter.get('/video', getVideo)
appRouter.post("/viewed", reciveDirectMessage)
export default appRouter;
