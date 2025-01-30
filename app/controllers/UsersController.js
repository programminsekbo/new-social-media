import { UserModel } from "../model/UserModel.js";

import {
  CreateProfileService,
  followUserService,
 
  getUserService,
  LoginService,
  ReadProfileService,
  unfollowUserService,
  UpdateProfileService,
  VerifyLoginService,
} from "../Services/UserServices.js";
import { TokenDecode } from "../utility/tokenUtility.js";

export const Login = async (req, res) => {
  let result = await LoginService(req);
  return res.json(result);
};

export const VerifyLogin = async (req, res) => {
  let result = await VerifyLoginService(req);

  if (result["status"] === "success") {
    // Cookies Option
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000),
      httpOnly: false,
    };

    // Set Cookies With Response
    res.cookie("token", result["token"], cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

export const CreateUserProfile = async (req, res) => {
  let result = await CreateProfileService(req);
  return res.json(result);
};

export const UpdateUserProfile = async (req, res) => {
  let result = await UpdateProfileService(req);
  return res.json(result);
};

export const ReadUserProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  return res.json(result);
};











// review

export const UserLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };

  res.cookie("token", "", cookieOption);
  return res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

// Follow a user
export const followUserController = async (req, res) => {
  const result = await followUserService(req);
  return res.status(result.status === "success" ? 200 : 400).json(result);
};

// Unfollow a user
export const unfollowUserController = async (req, res) => {
  const result = await unfollowUserService(req);
  return res.status(result.status === "success" ? 200 : 400).json(result);
};

// Get all blogs
export const getUser = async (req, res) => {
  const result = await getUserService();
  return res.json(result);
};






export const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token;  // কুকি থেকে টোকেন নেয়া

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided!' });
    }

    const decoded = TokenDecode(token);  // টোকেন ডিকোড করা

    if (!decoded) {
        return res.status(400).json({ message: 'Invalid token or something went wrong!' });
    }

    // ইউজারের প্রোফাইল খুঁজে বের করা
    const user = await UserModel.findById(decoded.user_id) // ডিকোড থেকে user_id ব্যবহার করে
        .select('-password') // পাসওয়ার্ড বাদ দেওয়া
        .populate('followers following postId');

    if (!user) {
        return res.status(404).json({ message: 'User not found!' });
    }

    // প্রোফাইল ডেটা রিটার্ন করা
    return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        phone: user.phone,
        followersCount: user.followers.length,
        followingCount: user.following.length,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
        postId: user.postId
    });

  } catch (error) {
    console.error('Error:', error.message);  // এরর লগিং
    return res.status(400).json({ message: 'Invalid token or something went wrong!' });
  }
};





