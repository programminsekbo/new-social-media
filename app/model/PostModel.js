import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref: "User", required:true},
    caption:{
        type:String,
        trim:true
    },
    image:[{
        type:String,
        required:false
    }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  shares: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // যে ইউজার শেয়ার করেছে
      sharedAt: { type: Date, default: Date.now }, // শেয়ারের সময়
    },
  ],
},{timestamps: true, versionKey: false});

export const PostModel = mongoose.model('Post', DataSchema)