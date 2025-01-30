import SendEmail from "./../utility/emailUtility.js";
import { TokenEncode } from "./../utility/tokenUtility.js";
import { UserModel } from "./../model/UserModel.js";

import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"; // সঠিকভাবে import করা

export const LoginService = async req => {
  try {
    let { email, password } = req.body;
    password = password;
    let code = Math.floor(100000 + Math.random() * 900000);
    let expiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    let EmailText = ` Your Verification Code is ${code}`;
    let EmailSubject = "Email Verification";
    let EmailTo = email;
    try {
      await SendEmail(EmailTo, EmailText, EmailSubject);
    } catch (emailError) {
      return {
        status: "Fail",
        message: "Failed to send email. Please try again later.",
      };
    }

    let data = await UserModel.findOne({
      email: email,
      password: password,
    }).select("_id");

    if (data) {
      await UserModel.updateOne(
        { _id: data._id },
        { $set: { otp: code, otpExpiry: expiry } }
      );
      return {
        status: "success",
        message: "Your 6 Digit Code Has Been Send Successfully",
      };
    } else {
      return { status: "Fail", message: "Invalid information" };
    }
  } catch (e) {
    return { status: "Fail", data: e.toString() };
  }
};

export const VerifyLoginService = async req => {
  try {
    let { email, otp } = req.body;
    let total = await UserModel.find({ email: email, otp: otp });

    if (total.length === 1) {
      let user_id = await UserModel.find({ email: email, otp: otp }).select(
        "_id"
      );
      let token = TokenEncode(email, user_id[0]["_id"].toString());

      await UserModel.updateOne(
        { email: email },
        { $set: { otp: "0" } }
      ).select("_id");

      return { status: "success", message: "Valid otp", token: token };
    } else {
      return { status: "fail", message: "Invalid OTP" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

export const CreateProfileService = async req => {
  try {
    let reqBody = req.body;
    let data = await UserModel.create(reqBody);
    return {
      status: "Success",
      message: "User registered successfully",
      data: data,
    };
  } catch (error) {
    return { status: "Fail", message: error.toString() };
  }
};

export const UpdateProfileService = async req => {
  try {
    const user_id = req.headers.user_id;

    // Step 1: Check if the user exists
    const existingUser = await UserModel.findById(user_id);
    if (!existingUser) {
      return { status: "fail", message: "User not found" };
    }

    // Step 2: Update only the provided fields
    const updatedFields = req.body;

    const result = await UserModel.updateOne(
      { _id: user_id },
      { $set: updatedFields } // Only updates the fields provided in req.body
    );

    if (result.modifiedCount === 0) {
      return { status: "fail", message: "No changes made to the profile" };
    }

    // Step 3: Return success
    return { status: "success", message: "Profile updated successfully" };
  } catch (error) {
    console.error(error);
    return { status: "fail", message: "Something went wrong: " + error.message };
  }
};

export const ReadProfileService = async req => {
  try {
    let user_id = req.headers.user_id;
    let data = await UserModel.findOne({ userID: user_id });
    return {
      status: "success",
      message: "profile save Successfuily",
      data: data,
    };
  } catch (error) {
    return { status: "fail", message: "SameThing went wrong" };
  }
};

export const followUserService = async req => {
  try {
    const { followUserId } = req.params;
    const currentUserId = req.headers.user_id;

    // Check if the current user and the target user are the same
    if (currentUserId === followUserId) {
      return { status: "fail", message: "You cannot follow yourself" };
    }

    // Find users by their ids
    const currentUser = await UserModel.findById(currentUserId);
    const followUser = await UserModel.findById(followUserId);

    if (!currentUser || !followUser) {
      return { status: "fail", message: "User not found" };
    }

    // Check if already following
    if (currentUser.following.includes(followUserId)) {
      return { status: "fail", message: "You are already following this user" };
    }

    // Add the follow relationship
    currentUser.following.push(followUserId);
    followUser.followers.push(currentUserId);

    await currentUser.save();
    await followUser.save();

    return { status: "success", message: "Successfully followed the user" };
  } catch (e) {
    return {
      status: "fail",
      message: "Something went wrong",
      error: e.message,
    };
  }
};

export const unfollowUserService = async req => {
  try {
    const { unfollowUserId } = req.params;
    const currentUserId = req.headers.user_id;

    // Find users by their ids
    const currentUser = await UserModel.findById(currentUserId);
    const unfollowUser = await UserModel.findById(unfollowUserId);

    if (!currentUser || !unfollowUser) {
      return { status: "fail", message: "User not found" };
    }

    // Check if not following
    if (!currentUser.following.includes(unfollowUserId)) {
      return { status: "fail", message: "You are not following this user" };
    }

    // Remove the follow relationship
    currentUser.following = currentUser.following.filter(
      id => id.toString() !== unfollowUserId
    );
    unfollowUser.followers = unfollowUser.followers.filter(
      id => id.toString() !== currentUserId
    );

    await currentUser.save();
    await unfollowUser.save();

    return { status: "success", message: "Successfully unfollowed the user" };
  } catch (e) {
    return {
      status: "fail",
      message: "Something went wrong",
      error: e.message,
    };
  }
};

// Get all user
export const getUserService = async () => {
  try {
    const users = await UserModel.find()
      .populate("followers", "_id") // শুধু followers এর ObjectId আনুন
      .populate("following", "_id") // শুধু following এর ObjectId আনুন
      .populate({
        path: "postId",
        select: "image", // শুধু imageUrls আনুন
      });

    // প্রতিটি ইউজারের followers এবং following সংখ্যা যোগ করুন
    const formattedUsers = users.map(user => ({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      bio: user.bio,
      profilePicture: user.profilePicture,
      postImages: user.postId.map(post => post.image).flat(), // পোস্টের ইমেজগুলো আনুন, // পোস্ট ইমেজগুলো যোগ করুন
      coverPicture: user.coverPicture,
      followersCount: user.followers.length, // followers এর সংখ্যা
      followingCount: user.following.length, // following এর সংখ্যা
    }));

    return { status: "success", data: formattedUsers };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

// export const getProfileService = async (req) => {
//   try {
//     // কুকি থেকে টোকেন পেতে
//     const token = req.cookies['token'];

//     if (!token) {
//       throw new Error('Access denied, no token provided!');
//     }

//     // টোকেন যাচাই করা
//     const decoded = JWt.verify(token, 'your_jwt_secret'); // JWT Secret

//     // ইউজার খুঁজে বের করা
//     const user = await UserModel.findOne({ _id: decoded.id });

//     if (!user) {
//       throw new Error('User not found!');
//     }

//     // প্রোফাইল ডেটা ফেরত দেয়া
//     return {
//       status: "success",
//       data: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         bio: user.bio,
//         phone: user.phone,
//         followersCount: user.followersCount,
//         followingCount: user.followingCount
//       }
//     };
//   } catch (error) {
//     return { status: "fail", message: error.message };
//   }
// };
