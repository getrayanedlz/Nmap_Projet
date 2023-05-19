import mongoose from "mongoose"
import QuerySchema from "../schemas/QuerySchema.js"

const QueryModel = mongoose.model("Query", QuerySchema)

export default QueryModel
