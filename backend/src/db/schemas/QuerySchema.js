import { Schema } from "mongoose"
import userDataSchema from "./UserDataSchema.js"

const QuerySchema = new Schema({
  user: {
    type: userDataSchema,
    required: true,
  },
  etat: {
    type: String,
    default: "Pending",
  }, //PENDIND,ERROR, SUCCESS
  commande: {
    type: String,
    required: true,
  },
  sortie: {
    type: String,
  },
})

export default QuerySchema
