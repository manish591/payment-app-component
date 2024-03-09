import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  balance: {
    type: Number
  }
},{
  timestamps: true
});

export default mongoose.model("Account", schema);