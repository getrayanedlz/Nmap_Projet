import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 55,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxLength: 1024,
    },
  },
  { timestamps: true }
)

//Exécuter cette fonction avant d'enrégistrer un utilisateur
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

export default UserSchema
