import React from 'react';
import AboutImg from "../../assets/images/pngtree-modern-flat-design-of-social-media-concept-vector-illustration-png-image_4157744.jpg";
import UserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Registration = () => {
  
    const Navigate = useNavigate();
    const { RegisterFormValue, RegisterFormOnChange, RegisterRequest } = UserStore();

    const onFormSubmit = async (event) => {
        event.preventDefault(); 
        const postBody = { ...RegisterFormValue };
        try {
            let response = await RegisterRequest(postBody);
            if (response.status === 'Success') {
                setTimeout(() => {
                    Navigate('/Login');
                },1000)
                toast.success("Registration Success");
            } else {
                toast.error("Registration Failure");
            }
        } catch (err) {
            toast.error('Error registering user:', err.message);
        }
    }
       
      
        return (
         <>
          <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
              {/* Logo Section */}
              <div className="col-md-6 d-flex align-items-center justify-content" style={{ paddingLeft: '300px',  }}>
                <img 
                  className="img-fluid text-opacity-25" 
                  width="800px" 
                  
               
                  src={AboutImg}
               
                  alt="twitter-logo" 
                />
              </div>
      
              {/* Form Section */}






              <div className="col-md-6 col-lg-5">
                <div className="bg-info p-4 rounded shadow animate-fade-in">
                    <h2 className="form-title text-center text-white mb-4">Create Account</h2>
                    <form>
                        <div className="mb-2">
                            <label className="form-label text-white">First Name</label>
                            <input  value={RegisterFormValue.firstName} onChange={(event) => {RegisterFormOnChange('firstName', event.target.value)}} type="text" className="form-control" placeholder="Enter Your First Name" />
                        </div>

                        <div className="mb-1">
                            <label className="form-label text-white">Last Name</label>
                            <input value={RegisterFormValue.lastName} onChange={(event) => {RegisterFormOnChange('lastName', event.target.value)}} type="text" className="form-control" placeholder="Enter Your Last Name "/>
                        </div>

                        <div className="mb-1">
                            <label className="form-label text-white">Phone Number</label>
                            <input  value={RegisterFormValue.phone} onChange={(event) => {RegisterFormOnChange('phone', event.target.value)}} type="text" className="form-control" placeholder="Enter Your Last Name:+088"/>
                        </div>

                        <div className="mb-1">
                            <label className="form-label text-white">Email Address</label>
                            <input  value={RegisterFormValue.email} onChange={(event) => {RegisterFormOnChange('email', event.target.value)}} required  type="email" className="form-control" placeholder="Enter Your Email" />
                        </div>

                        <div className="mb-1">
                            <label className="form-label text-white">Password</label>
                            <input value={RegisterFormValue.password} onChange={(event) => {RegisterFormOnChange('password', event.target.value)}} type="password" className="form-control" placeholder="Enter Your Password" />
                        </div>

                        <div className="mt-4">
                            <button onClick={onFormSubmit} type="submit" className="btn btn-lg btn-dark w-100 text-white">Registration</button>
                        </div>

                                    
                <h4 className="mt-3 text-center">
                    Already Have an Account? <a href="/login" className="text-warning " style={{ cursor: 'pointer' }}>Login</a>
                </h4>
                    </form>
                </div>


               




            </div>
















             
            </div>
        </div>















      
          
         </>
        );
      };
  
export default Registration;