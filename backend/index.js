import express from "express"
import cors from "cors"
import config from "./src/config.js"
import response from "./src/middlewares/response.js"
import makeSignRoutes from "./src/routes/makeSignRoutes.js"
import makeQueryRoutes from "./src/routes/makeQueryRoutes.js"
import mongoose from "mongoose"

const app = express()
const ctx = { app }

mongoose
  .connect(config.db.uri)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((error) => {
    console.log(error)
  })

//Utilisation des différents middlewares
app.use(cors())
app.use(express.json())
app.use(response)

//Routes
makeSignRoutes(ctx)
makeQueryRoutes(ctx)

//Définition du port et démarrage du serveur
const PORT = config.port || 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
