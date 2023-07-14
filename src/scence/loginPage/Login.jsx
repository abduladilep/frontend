import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//   import Logo from '../../Social Club Logo.png'
//   import ForgotModal from './ForgotModal/ForgotModal';
//   import { setToken, setUser} from '../../Redux/Actions';
//   import './Login.css'
import { toast } from "react-toastify";
import DotSpinner from "../Dotspinner/Dotspinner";
import { Col, Row, message } from "antd";
import "./index.css";
import { LoginUser } from "../../Redux/Actions/userAction";

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const [isOpen,setIsOpen] = useState(false)
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const [password, setPassword] = useState("");

  async function loginUser(e) {
    console.log("asvahdh");
    e.preventDefault();
    if (name.trim() === "") {
      toast.error("Please provide Email first", toastConfig);
      return;
    }
    if (mobile.trim() === "") {
      toast.error("Please provide Number first", toastConfig);
      return;
    }
    if (mobile.length < 10 || mobile.length > 10) {
      toast.error("Please provide valid mobile number", toastConfig);
      return;
    }
    if (password.length < 5 || password.length > 15) {
      toast.error("Invalid password", toastConfig);
      return;
    }
    if (password.trim() === "") {
      toast.error("Enter password", toastConfig);
      return;
    }
    setLoading(true);
    // const response = await fetch(`http://localhost:5000/api/user/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     name,
    //     password,
    //     mobile,
    //   }),
    // });
    // console.log(mobile, password, "email+pass");
    const token=await dispatch(LoginUser({name,password,mobile}))
    // const data = await token.json();
    // console.log(data, "datatta");
    if (token) {
      setLoading(false);
      toast.success("Successfully Logged In", toastConfig);
      localStorage.setItem("token", token);
      message.success("Successfully Logged In")
      
      // dispatch(setToken(data.user));
      // dispatch(setUser(data.details));
      navigate("/");
    // } else if (data.status === "wrong") {
    //   setLoading(false);
    //   toast.error("Invalid Email or password", toastConfig);
    } else {
      setLoading(false);
      toast.error("No account with this Email", toastConfig);
      message.error("Login Failed");

    }
  }

  return (
    //
    <div className="login">
      <Row gutter={16} className="d-flex align-item-center">
        <Col lg={12} style={{ position: "relative" }}>
          <div className="imgbox col-md-9 col-lg-6 col-xl-5">
            <img
              data-aos="slide-left"
              data-aos-duration="1500"
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8Vqurm4gw0UwCA2CgHO1-3NkPi6vWnfcFhA&usqp=CAU"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              alt=""
              className="responsive-image"
            ></img>
            {/* <h1 className="login-logo">car-rent</h1> */}
          </div>
        </Col>

        <Col lg={9} className="text-left p-5">
          <div className="a-right col-md-9 col-lg-6 col-xl-5">
            <form className="infoForm authForm">
              <h3 className="text-center">Login</h3>
              {/* <div class="form-group"> */}
              <div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="infoInput"
                  name="name"
                  value={name}
                  aria-describedby="nameHelp"
                  placeholder="Name"
                ></input>
              </div>
              <div class="form-group">
                <input
                  onChange={(e) => setMobile(e.target.value)}
                  type="text"
                  className="infoInput"
                  name="mobile"
                  value={mobile}
                  aria-describedby="mobileHelp"
                  placeholder="Mobile Number"
                ></input>
              </div>
              <div className="form-group">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="infoInput"
                  name="password"
                  value={password}
                  placeholder="Password"
                ></input>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  style={{ width: "100px", height:"35px"  }}
                  onClick={loginUser}
                  className=" infoButton"
                >
                  {loading ? <DotSpinner /> : "Login"}
                </button>
              </div>
              {/* <ForgotModal open={isOpen} onClose={()=> setIsOpen(false)} /> */}
              <Link to="/signup" className="linkword">
                New User? Create New Account
              </Link>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
