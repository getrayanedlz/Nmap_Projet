import jsonwebtoken from "jsonwebtoken"
import config from "../config.js"
import UserModel from "../db/models/UserModel.js"

const auth = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.msgError("Une authentification est recquise", 403)

    return
  }

  try {
    const { id } = jsonwebtoken.verify(
      authorization,
      config.security.jwt.secret
    )
    const user = await UserModel.findOne({ _id: id })

    if (!user) {
      res.msgError("Authentification échouée", 403)

      return
    }

    req.user = user
    next()
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      res.msgError("Une erreur s'est produite.", 403)

      return
    }

    res.msgError("Une erreur s'est produite.", 403)
  }
}

export default auth
