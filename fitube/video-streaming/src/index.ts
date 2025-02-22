import express from 'express'
import { getVideo } from './controllers/vide.controller'
import { connecToDatabase } from './utils/mongodb_connection'
import sendMessageToVideoStorage from './controllers/directmessaing.controller'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 5000
if (!PORT) {
  throw new Error('Please specity a port')
}
// console.log(process.env.DATA)

app.get('/', (req, res) => {
  res.json({ msg: "all ok" })
})

app.get('/video', getVideo)
app.get("/direct_message", sendMessageToVideoStorage)

connecToDatabase()
  .then((e) => {
    app.listen(PORT, () => {
      console.log("DB CONNECTED again")
      console.log(`Lissening on: http://localhost:${PORT}/`)
    })
  })
  .catch(e => {
    console.log(e)
  })