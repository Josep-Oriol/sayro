import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true, collection: "tags" }
);

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
