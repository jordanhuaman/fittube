import express from 'express'
import { getVideo } from './controllers/vide.controller'
import { connecToDatabase } from './utils/mongodb_connection'
import sendMessageToVideoStorage from './controllers/directmessaing.controller'
import appRouter from './route/app.route'
import rabbitConnection from './utils/rabbit_connection'

const PORT = process.env.PORT || 5000
const rabbit = process.env.RABBIT || "amqp://guest:guest@rabbit:5672"
if (!PORT) {
  throw new Error('Please specity a port')
}

const app = express()

app.use(express.json())
app.use(appRouter)


const startup = async () => {
  const rabbitC = await rabbitConnection(rabbit);
  const dbconnection = await connecToDatabase();

  app.listen(PORT, () => {
    console.log("DB CONNECTED again")
    console.log("Rabbit connected")
    console.log(`Lissening on: http://localhost:${PORT}/`)
  })
}

startup()