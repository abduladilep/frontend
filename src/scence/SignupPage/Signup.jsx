

import React, { useEffect, useState } from "react";
// import "./Auth.scss";
// import Logo from "../../img/logo.png";
// import { logIn, signUp } from "../../redux/actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
// import { alertsReducer } from "../Redux/Actions/userAction";
import { toast } from "react-toastify";
import "./index.css";
import axios from "axios";
import { Col, Row, message } from "antd";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggble: true,
  progress: undefined,
  theme: "colored",
};

const Signup = () => {
  
  // const loading = useSelector((state) => state.alertsReducer);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [minutes, setMinutes] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setVisible(true);
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes]);

  // const dispatch = useDispatch()

  // Reset Form
  // const resetForm = () => {
  //   setData(initialState);
  //   setConfirmPass(confirmPass);
  // };

  // handle Change in input
  // const handleChange = (e) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // };

  async function verifyAccount(e) {
    console.log("dvasgh", e);
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      mobile.trim() === "" ||
      password.trim() === ""
    ) {
      toast.error("Please provide details first", toastConfig);
      return;
    }
    if (password.length === 10) {
      toast.error("Password must be with in 5 to 15 letters", toastConfig);
      return;
    }
    if (password.length < 5 || password.length > 15) {
      toast.error("Password must be with in 5 to 15 letters", toastConfig);
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords are mismatched", toastConfig);
      return;
    }
    setLoading(true);
    const response = await fetch("https://kingspacefinance.in/backend/api/user/otpsend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        mobile

      }),
    });

    const data = await response.json();
   
    setLoading(false);
    if (data.status === "sended") {
      message.success("otpsend")
      toast.success("An OTP sended, check it....", toastConfig);
      setIsActive(true);
      setMinutes(1);
      setSeconds(30);
    }
    else if(data.status==="exist"){
      message.error("Nope ! Try with another Mobile Number !");
      Navigate("/signup");

    }
     else {
      toast.error("Try with another email", toastConfig);
      message.error("Signup Failed ! Try again")
    }
  }

  async function registerUser(e) {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`http://localhost:5000/api/user/verifyotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });
    const data = await response.json();
    console.log(response.data, "svgsh");
    console.log(data, "respoopoitss");
    if (data.status === "success") {
      const response = await fetch(`http://localhost:5000/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmpassword,
          mobile,
        }),
      });
      const data = await response.json();
      setLoading(false);
      console.log(data, "response");
      if (data.status === "ok") {
        // toast.success("Successfully registered".toastConfig)
        message.success("successfully registered !")
        navigate("/login");
       
        toast.error("Nope ! Try with another Mobile Number ".toastConfig);
      }
    } else if (data.status === "fail") {
      toast.error("Nope ! Try with another email ".toastConfig);
      message.error("Signup Failed ! Try again");
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="login">
      <Row gutter={16} className="d-flex align-item-center">
        <Col lg={12}  style={{ position: "relative"  }}>
          <div className="imgbox col-md-9 col-lg-6 col-xl-5">
            <img
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"

            alt="login IMG"
            className="responsive-image"
            ></img>
           </div>
           </Col>
           <Col lg={9} className="text-left p-5">
           {loading ? (
            <Loader />
           ) : (
            <div className="a-right col-md-9 col-lg-6 col-xl-5">
              <form
                className="infoForm authForm"
                style={{ display: isActive ? "none" : "block" }}
              >
                <h3>{isActive ? "Enter OTP" : "Signup"}</h3>
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Name"
                    className="infoInput"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* {isSignUp && ( */}

                <div>
                  <input
                    required
                    type="text"
                    placeholder="email"
                    className="infoInput"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* )} */}

                <div>
                  <input
                    required
                    type="password"
                    className="infoInput"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    required
                    type="text"
                    className="infoInput"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div>
                  {/* {isSignUp && ( */}
                  <input
                    required
                    type="password"
                    className="infoInput"
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                  {/* )} */}
                </div>
{/* 
                 <span
                style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
              }}
                 >
              *Confirm password is not same
              </span> */}
                 {/* <div> 
                 <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
             >
             {isSignUp
               ? "Already have an account Login"
               : "Don't have an account Sign up"}
              </span>  */}

 



              <div className="d-flex justify-content-center">
                <button
                  onClick={verifyAccount}
                  className=" infoButton"
                  style={{ width: "100px", height:"35px"  }}
                  type="Submit"
                  
                  // disabled={loading}
                  >
                  SIGNUP
                  {/* {loading ? "Loading..." : isActive ? "SignUp" : "Confirm"} */}
                </button>
                  </div>
                  <Link to="/login" className="linkword">
                New User? Create New Account
              </Link>
               
              </form>
              <div style={{ dispaly: isActive ? "block" : "none" }}>
                <input
                  value={otp}
                  type="password"
                  className="infoInput"
                  name="otp"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={registerUser}
                  className="button infoButton"
                  // className="btn1 mt-2 mb-4"
                  type="Submit"
                  // disabled={loading}
                >
                  {loading ? "Loading..." : isActive ? "SignUp" : "Confirm"}
                </button>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Signup;
