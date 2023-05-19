import { Schema } from "mongoose"

const UserDataSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    pseudo: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

export default UserDataSchema
