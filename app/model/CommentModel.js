import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref: "User", required:true},
      
    postId: { type: mongoose.Schema.Types.ObjectId,required: true },
    text:{
        type:String,
        required:true,
        trim:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
  
},{timestamps: true, versionKey: false});

export const CommentModel = mongoose.model('comments', DataSchema)