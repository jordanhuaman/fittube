import express, { Router } from "express"
import azure from "azure-storage"

const appRouter = Router();

const STORAGE_ACCOUNT_NAME = process.env.sotrage_name as string
const STORAGE_ACCOUNT_KEY = process.env.storage_key  as string

const createBlobService = () => {
  return azure.createBlobService(STORAGE_ACCOUNT_NAME, STORAGE_ACCOUNT_KEY)
}

appRouter.get("/", (req, res) => {
  return res.json({ msg: "go to -> video?path=SampleVideo_1280x720_1mb.mp4" })
})

appRouter.get('/video', (req, res) => {
  const videoPath = req.query.path as string
  console.log('from azure-storage -> videoPath: ', videoPath)
  
  const blobService = createBlobService()
  const containerName = "videos"

  blobService.getBlobProperties(containerName, videoPath, (err, properties) => {
    if (err) {
      console.error("Error getting blob properties:", err)
      return res.status(500).json({ error: "Error retrieving video properties" }) // ✅ Se detiene aquí en caso de error
    }
    res.writeHead(200, {
      "Content-Length": properties.contentLength,
      "Content-Type": "video/mp4",
    })
    const stream = blobService.createReadStream(containerName, videoPath, (streamErr) => {
      if (streamErr) {
        console.error("Error streaming video:", streamErr)
        res.end() // ✅ Cierra la respuesta sin enviar otro header
      }
    })
    stream.pipe(res) // ✅ Conecta el stream directamente a la respuesta
  })
})

export default appRouter;