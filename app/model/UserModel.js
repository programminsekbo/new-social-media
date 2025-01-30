import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String, required: true},
    bio:{
      type:String,
      default:""
  },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {type: String, required: true},
    otp : {type: Number, default:0},
    
   

    profilePicture:{
      type:String,
      default:""
  },
  coverPicture:{
      type:String,
      default:""
  },
  postId:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Post"
}],

followers: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}],
following: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
}],

},{timestamps: true, versionKey: false});

export const UserModel = mongoose.model('User', DataSchema)