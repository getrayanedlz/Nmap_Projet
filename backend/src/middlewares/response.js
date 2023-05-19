const response = (req, res, next) => {
  //Fonction pour envoyer les messages de succès
  res.msgSuccess = (msg, data, status = 200) => {
    return res.status(status).json({
      success: true,
      data: data,
      message: msg,
    })
  }

  //Fonction pour envoyer les messages d'erreurs
  res.msgError = (msg, status = 400) => {
    return res.status(status).json({
      success: false,
      message: msg,
    })
  }
  next()
}
export default response
