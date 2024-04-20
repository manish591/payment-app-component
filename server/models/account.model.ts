import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true
  }
},{
  timestamps: true
});

export default mongoose.model("Account", schema);