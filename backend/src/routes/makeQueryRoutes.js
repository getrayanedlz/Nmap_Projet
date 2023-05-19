import QueryModel from "../db/models/QueryModel.js"
import auth from "../middlewares/auth.js"
import { spawn } from "node:child_process"

const makeQueryRoutes = ({ app }) => {
  //Faire une requête
  app.post("/query", auth, async (req, res) => {
    try {
      const query = await QueryModel.create({
        user: { id: req.user._id, pseudo: req.user.pseudo },
        commande: req.body.query,
      })

      res.msgSuccess("Requête créée", {
        query,
      })

      //Traitement proprement dit de la requête
      const nmap = spawn("nmap", req.body.options)
      let cmd = { success: false, message: "" }

      nmap.stdout.on("data", (data) => {
        cmd.success = true
        cmd.message += data.toString()
      })

      nmap.stderr.on("data", (data) => {
        cmd.success = false
        cmd.message += data.toString()
      })

      nmap.on("close", async () => {
        if (cmd.success) {
          await QueryModel.findByIdAndUpdate(query._id, {
            etat: "Success",
            sortie: cmd.message,
          })
        } else {
          await QueryModel.findByIdAndUpdate(query._id, {
            etat: "Error",
            sortie: cmd.message,
          })
        }
      })

      return
    } catch (error) {
      return res.msgError(error, 500)
    }
  })

  //Récupérer les données d'une requête
  app.get("/query/:id", auth, async (req, res) => {
    try {
      const query = await QueryModel.findOne({
        "user.id": req.user._id,
        _id: req.params.id,
      })

      return res.msgSuccess("Requête", {
        query,
      })
    } catch (error) {
      return res.msgError(error, 500)
    }
  })

  //Récupérer l'historique des requêtes d'un utilisateur
  app.get("/history", auth, async (req, res) => {
    try {
      const queries = await QueryModel.find({ "user.id": req.user._id })
        .sort({
          _id: -1,
        })
        .select("-user")

      return res.msgSuccess("Historique des requêtes de " + req.user.pseudo, {
        queries,
      })
    } catch (error) {
      return res.msgError(error, 500)
    }
  })
}

export default makeQueryRoutes
