import { create } from "zustand";
import axios from 'axios';
import cookie from "js-cookie";

const UserStore = create((set) => ({






 // Reload toggle
 reload: false,
 setReload: () => set((state) => ({ reload: !state.reload })),

  isLogin : () => {
    return !!cookie.get('token')
},


RegisterFormValue : {firstName : '', lastName : '', phone : '', email : '', password : '',bio:'',coverPicture: '',profilePicture:'',},

RegisterFormOnChange : (name, value) => {
    set((state) => ({
        RegisterFormValue: {
            ...state.RegisterFormValue,
            [name]: value
        }
    }))
},







UpdaterFormValue : {firstName : '', lastName : '', bio:'',coverPicture: '',profilePicture:'',},

UpdateFormOnChange : (name, value) => {
    set((state) => ({
        UpdaterFormValue: {
            ...state.UpdaterFormValue,
            [name]: value
        }
    }))
},









OtpFormValue : {otp : ''},

OtpFormOnChange : (name, value) => {
set((state) => ({
    OtpFormValue: {
        ...state.OtpFormValue,
        [name]: value
    }
}))
},








// Login Form


LoginFormValue : {email : '', password : ''},

LoginFormOnChange : (name, value) => {
set((state) => ({
    LoginFormValue: {
        ...state.LoginFormValue,
        [name]: value
    }
}))
},



// Register Request-
RegisterRequest : async (postBody) => {
try {
    let response = await axios.post(`https://new-social-media-ten.vercel.app/api/CreateUserProfile`, postBody);
    return response.data;
} catch (e) {
    console.error('Error registering user:', e)
}
},








// Update Request-
UpdateRequest : async (postBody) => {
    try {
        // হেডারে user_id পাঠানো হচ্ছে
        const response = await axios.post(
            'https://new-social-media-ten.vercel.app/api/UpdateUserProfile',
            postBody,  
            {
                headers: {
                  
                    'user_id': 'USER_ID_HERE', 
                    'Content-Type': 'application/json',  
                }
              
            }
        );
        set((state) => ({ reload: !state.reload }));
        return response.data;  
      
    } catch (e) {
        console.error('Error updating profile:', e);
        return { status: 'fail', message: 'Something went wrong' };
    }
    },
    




// Login Request
LoginRequest : async (postBody) => {
try {
    let response = await axios.post(`/api/Login`, postBody);
    sessionStorage.setItem('email', postBody.email);
    return response.data;
    
} catch (e) {
    console.error('Error registering user:', e)
}
},






// Otp Verify
VerifyLoginRequest : async (otp) => {
try {  
    let email = sessionStorage.getItem('email');
    let response = await axios.post(`https://new-social-media-ten.vercel.app/api/VerifyLogin`,{email: email, otp: otp});
    cookie.set('token', response.data.token);
    return response.data
} catch (e) {
    console.error('Error verifying OTP:', e)
 } },









 UserList : null,
 UserListRequest : async () => {
   
       const response = await axios.get('/api/getUser')
    
      if(response.data['status']==='success'){
          set({UserList :response.data.data})

     }
 
 },




//LogoutRequest
LogoutRequest : async () => {
    try {
     let res=await axios.get(`/api/UserLogout`);
       return res.data['status']=='success';
    } catch (e) {
        console.error('Error registering user:', e)
    }
    },

















 
  }))

  export default UserStore;







































