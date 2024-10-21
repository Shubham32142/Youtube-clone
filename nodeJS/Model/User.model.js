import mongoose, { Schema } from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    commentId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    userId: String,
    text: String,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);
export const comment = mongoose.model("comment", commentSchema);
const userSchema = new mongoose.Schema({
  videoId: mongoose.Schema.Types.ObjectId,
  title: String,
  thumbnailUrl: String,
  description: String,
  channelId: {
    type: Schema.Types.ObjectId,
    ref: "channelData",
  },
  uploader: String,
  views: Number,
  likes: Number,
  dislikes: Number,
  uploadDate: String,
  comments: [commentSchema],
});

export const User = mongoose.model("User", userSchema);

const LoginSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  channels: [String],
});
export const Login = mongoose.model("Login", LoginSchema);

const channelSchema = new mongoose.Schema({
  channelId: Schema.Types.ObjectId,
  channelName: String,
  owner: String,
  description: String,
  channelBanner: String,
  subscribers: Number,
  videos: [String],
});
export const channelData = mongoose.model("channelData", channelSchema);
