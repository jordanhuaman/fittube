import { Request, Response } from "express";
import http from "node:http";
import mongodb, { MongoClient, ObjectId } from "mongodb"
import { getCollection } from "../utils/mongodb_connection";
import { sourceMapsEnabled } from "node:process";

//? Host when we run containers video-storage
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST || "localhost";
const VIDEO_STORAGE_PORT = process.env.VIDEO_STORAGE_PORT || 5001;

const getVideo = async (req: Request, res: Response) => {

  const videoID = new ObjectId(req.query.id as string);
  const videoRecord = await getCollection("videos").findOne({ _id: videoID })

  if (!videoRecord) {
    return res.status(404).json({ msg: "not found", error: 404 })
  }
  const forwardRequest = http.request(
    {
      host: VIDEO_STORAGE_HOST,
      port: VIDEO_STORAGE_PORT,
      path: `/video?path=${videoRecord.videoPath}`,
      method: "GET",
      headers: req.headers,
    },
    (forwardResponse) => {
      res.writeHead(forwardResponse.statusCode || 500, forwardResponse.headers);
      forwardResponse.pipe(res);
    }
  );
  req.pipe(forwardRequest);

  // Manejar errores
  forwardRequest.on("error", (err) => {
    console.error("Error en la petición al servidor de video:", err.message);
    res.status(500).send("Error al obtener el video");
  });
};

export { getVideo };
