import React from "react";
import UserStore from "../../store/UserStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const OtpVerifison = () => {
  const { VerifyLoginRequest, OtpFormOnChange, OtpFormValue } = UserStore();

  const Navigate = useNavigate();
  const onFormSubmit = async event => {
    event.preventDefault();
    try {
      let response = await VerifyLoginRequest(OtpFormValue.otp);
      if (response.status === "success") {
        setTimeout(() => {
          Navigate("/Home");
        }, 1000);
        toast.success("Login Success");
      } else {
        toast.error("Fail to Login");
      }
    } catch (err) {
      toast.error("Error login user:", err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6 col-lg-4">
        <div className="bg-info p-4 rounded shadow animate-fade-in">
          <h2 className="form-title text-center text-white mb-4">
            Verify Login
          </h2>
          <form>
            <div className="mb-3">
              <label className="form-label text-white">Enter Your OTP</label>
              <input
                value={OtpFormValue.otp}
                onChange={event => {
                  OtpFormOnChange("otp", event.target.value);
                }}
                required
                type="text"
                className="form-control"
                placeholder="Enter your code"
              />
            </div>
            <button
              onClick={onFormSubmit}
              type="submit"
              className="btn btn-lg btn-dark w-100 text-white"
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpVerifison;
