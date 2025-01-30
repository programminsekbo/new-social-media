import React from 'react';
import toast from 'react-hot-toast';
import UserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import Registration from './Registration';









const Loging = () => {


  const Navigate = useNavigate();
  const { LoginFormValue, LoginFormOnChange, LoginRequest } = UserStore();
  console.log(LoginRequest)

  const onFormSubmit = async (event) => {
      event.preventDefault(); 
      const postBody = { ...LoginFormValue };
      try {
          let response = await LoginRequest(postBody);
          if (response.status === 'success') {
              setTimeout(() => {
                  Navigate('/Verification');
              },1000)
              toast.success("Your 6 Digit Code Has Been Send Successfully");
          } else {
              toast.error("Fail to send to code");
          }
      } catch (err) {
          toast.error('Error to send code:', err.message);
      }
  }






    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-6 col-lg-4">
            <div className="bg-info p-4 rounded shadow animate-fade-in">
              <h2 className="form-title text-center text-white mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <label className="form-label text-white">Email address</label>
                  <input value={LoginFormValue.email} onChange={(event) => {LoginFormOnChange('email', event.target.value)}} required type="email" className="form-control" placeholder="Enter your email"  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white">Password</label>
                  <input value={LoginFormValue.password} onChange={(event) => {LoginFormOnChange('password', event.target.value)}} required type="password" className="form-control" placeholder="Enter your password"  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label text-white" htmlFor="rememberMe">Remember me</label>
                </div>

                <button  onClick={onFormSubmit} type="submit" className="btn btn-lg btn-dark w-100 text-white">Login</button>
                          
            <h4 className="mt-4 text-center text-white">
                Do Not Have an Account? <a href="/"className="text-warning" style={{ cursor: 'pointer' }}>Registration</a>
            </h4>
              </form>
            </div>
          </div>
        </div>
    );
};

export default Loging;