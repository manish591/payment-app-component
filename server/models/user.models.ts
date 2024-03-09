import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    minlength: 6,
    maxlength: 10,
    trim: true,
    required: true,
  },
  first_name: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true
  },
  last_name: {
    type: String,
    maxlength: 50,
    trim: true,
    required: true
  },
  refresh_token: {
    required: true,
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
},
{
  timestamps: true
});

export default mongoose.model("User", schema);