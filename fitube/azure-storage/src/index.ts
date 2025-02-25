import express from "express"
import appRouter from "./router/app.route"

const app = express()
const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(appRouter)

app.listen(PORT, () => {
  console.log("Hello azure-storage hot reloaing")
  console.log(`http://localhost:${PORT}`)
})
