import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import UserModel from "../db/models/UserModel.js"
import bcrypt from "bcrypt"

const createToken = (id) => {
  return jsonwebtoken
    .sign(
      {
        id,
      },
      config.security.jwt.secret,
      { expiresIn: config.security.jwt.expiresIn }
    )
    .toString("hex")
}

const makeSignRoutes = ({ app }) => {
  //Connexion
  app.post("/signin", async (req, res) => {
    const { pseudo, password } = req.body

    try {
      const user = await UserModel.findOne({ pseudo })

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.msgError("Invalid credentials", 401)
      }

      return res.msgSuccess("Connexion réussie", {
        id: user._id,
        pseudo: user.pseudo,
        token: createToken(user._id),
      })
    } catch (error) {
      return res.msgError(error, 500)
    }
  })

  //Inscription
  app.post("/signup", async (req, res) => {
    const { pseudo, password, confirmPassword } = req.body

    try {
      if (password != confirmPassword) {
        return res.msgError("Les mots de passe ne sont pas identiques", 400)
      }

      const user = await UserModel.findOne({ pseudo })

      if (user) {
        return res.msgError("Ce pseudo est déjà pris", 400)
      }

      const newUser = await UserModel.create({ pseudo, password })

      return res.msgSuccess("Inscription réussie", { id: newUser._id }, 201)
    } catch (error) {
      return res.msgError(error, 500)
    }
  })
}

export default makeSignRoutes
