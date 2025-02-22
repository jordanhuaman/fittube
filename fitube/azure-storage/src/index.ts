import express from "express"
import azure from "azure-storage"
import appRouter from "./controller/app.controller"

const app = express()
const PORT = process.env.PORT || 5001

app.use(appRouter)

app.listen(PORT, () => {
  console.log("Hello azure-storage hot reloaing")
  console.log(`http://localhost:${PORT}`)
})
