import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    articleId: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true, collation: "comments" }
);

export default mongoose.model("Comment", commentSchema);
