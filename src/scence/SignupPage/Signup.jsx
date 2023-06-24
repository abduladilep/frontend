

// import React, { useState, useEffect} from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from '../Loader/Loader'
// // import Logo from "../../Social Club Logo.png";
// import "./index.css"
// import { toast } from "react-toastify";

// const toastConfig = {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "colored",
// };

// function Signup() {
//   const navigate = useNavigate();
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [repassword, setRepassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isActive, setIsActive] = useState(false);
//   const [visible,setVisible] = useState(false);
//   const [loading,setLoading] = useState(false);
//   const [seconds, setSeconds] = useState(30);
//   const [minutes, setMinutes] = useState(1);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }
//       if (seconds === 0) {
//         if (minutes === 0) {
//           setVisible(true)
//           clearInterval(interval);
//         } else {
//           setSeconds(59);
//           setMinutes(minutes - 1);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   },[seconds, minutes]);


//   async function registerUser(e) {
//     e.preventDefault();
//     setLoading(true);
//     const response = await fetch(`${process.env.REACT_APP_BACKEND}/register/verifyotp`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//         otp,
//       }),
//     });
//     const data = await response.json();
//     if (data.status === "success") {
//       const response = await fetch(`${process.env.REACT_APP_BACKEND}/register/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName,
//           email,
//           password,
//         }),
//       });
//       const data = await response.json();
//       setLoading(false);
//       if (data.status === "ok") {
//         toast.success("Successfully Registered", toastConfig);
//         navigate("/login");
//       } else if (data.status === "fail") {
//         toast.error("Nope ! Try with another Email", toastConfig);
//       }
//     } else if (data.status === "fail") {
//       toast.error("Nope ! Try with another Email", toastConfig);
//     }
//   }
//   async function verifyAccount(e) {
//     e.preventDefault();
//     if (
//       email=== "adilep7165@gmail.com",
//       userName.trim() === "" ||
//       password.trim() === ""
//     ) {
//       toast.error("Please provide details first", toastConfig);
//       return;
//     }
//     if (password.length < 5 || password.length > 15) {
//       toast.error("Password must be with in 5 to 15 letters", toastConfig);
//       return;
//     }
//     if (password !== repassword) {
//       toast.error("Passwords are mismatched", toastConfig);
//       return;
//     }
//     setLoading(true)
//     const response = await fetch(`${process.env.REACT_APP_BACKEND}/register/otpsend`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email,
//       }),
//     });
//     const data = await response.json();
//     setLoading(false);
//     if (data.status === "sended") {
//       toast.success("An OTP sended, Check it..", toastConfig)
//       setIsActive(true);
//       setMinutes(1);
//       setSeconds(30);
//     }else{
//       toast.error("Try with another Email", toastConfig);
//     }
//   }

//   // function resendOtp() {
//   //   fetch(`${process.env.REACT_APP_BACKEND}/register/otpsend`, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //        "X-Custom-Header": `${token}`,
//   //     },
//   //     body: JSON.stringify({
//   //       email,
//   //     }),
//   //   }).then((res) => res.json())
//   //   .then(data => {
//   //       if(data.status === 'sended') {
//   //           setMinutes(1);
//   //           setSeconds(30);
//   //       }
//   //   })
//   // }
//   // setInterval(updateCount, 1000);

// if(loading) return <Loader/>
//   return (
//     <div className="row Auth">
//       {/* left side */}

//       <div className="col-md-6 a-left">
//         {/* <img src={Logo} alt="" /> */}

//         <div className="Webname">
//           <h1>ChatBuddy</h1>
//           <h6>Explore the ideas throughout the world</h6>
//         </div>
//       </div>

//       {/* right form side */}
//       { loading ? <Loader/> : 
//       <div className="col-md-5  a-right">
//         <form style={{ display: isActive ? "none" : "block" }}>
//           <h4 className="text-center ">{isActive ? "Enter OTP" : "Signup"}</h4>
//           <div class="form-group">
//             <input
//               onChange={(e) => setUserName(e.target.value)}
//               type="text"
//               class="form-control"
//               name="userName"
//               value={userName}
//               aria-describedby="emailHelp"
//               placeholder="Username"
//             ></input>
//           </div>
//           <div class="form-group">
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               class="form-control"
//               name="email"
//               value={"adilep716@gmail.com"}
//               aria-describedby="emailHelp"
//               placeholder="Email"
//             ></input>
//           </div>
//           <div class="form-group">
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               class="form-control"
//               value={password}
//               name="password"
//               placeholder="Password"
//             ></input>
//           </div>
//           <div class="form-group">
//             <input
//               onChange={(e) => setRepassword(e.target.value)}
//               type="password"
//               class="form-control"
//               value={repassword}
//               name="repassword"
//               placeholder="Re-Enter Password"
//             ></input>
//           </div>
//           <button onClick={verifyAccount} type="submit" className="button logout-button">
//             SignUp
//           </button>
//         </form>
//         <div style={{ display: isActive ? "block" : "none"}}>
//           <input
//             className="form-control"
//             type="password"
//             value={otp}
//             name="otp"
//             onChange={(e) => setOtp(e.target.value)}
//             placeholder="Enter OTP"
//           ></input>
//           { visible ? <p className="text-center linkword" onClick={verifyAccount} style={{fontSize:'15px',marginTop:'10px',cursor:'pointer'}} >Resend OTP</p> : <p className="text-center" style={{fontSize:'15px',marginTop:'10px'}}>Resend Code in  {minutes} : {seconds} Minutes</p> }
//           <button

//             onClick={registerUser}
//             type="submit"
//             className="button logout-button">
//             Confirm
//           </button>
//         </div>
//       </div>
//       }
//     </div>
//   );
// }

// export default Signup;







import React, { useEffect, useState } from "react";
// import "./Auth.scss";
// import Logo from "../../img/logo.png";
// import { logIn, signUp } from "../../redux/actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from '../Loader/Loader'
// import { alertsReducer } from "../Redux/Actions/userAction";
import {toast} from "react-toastify"
import "./index.css"
import axios from "axios";

const toastConfig={
  position:"top-center",
  autoClose:5000,
  hideProgressBar:false,
  closeOnClick:true,
  pauseOnHover:true,
  draggble:true,
  progress:undefined,
  theme:"colored",
}

const Signup = () => {
  // const initialState = {
  //   name: "",
  //   // lastname: "",
  //   email: "adilep7165@gmail.com",
  //   password: "",
  //   confirmpassword: "",
  //   otp: "",
  // };
  // const loading = useSelector((state) => state.alertsReducer);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [visible,setVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [minutes, setMinutes]=useState(1);

useEffect(() => {
  const interval = setInterval(() =>{
    if(seconds>0){
      setSeconds(seconds-1);
      
    }
    if(seconds===0){
      if(minutes===0 ){
        setVisible(true)
        clearInterval(interval)
      }else{
        setSeconds(59)
        setMinutes(minutes-1)
      }
  }
},1000)
return()=>{
  clearInterval(interval)
}},[seconds,minutes])



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


async function  verifyAccount(e){

  console.log("dvasgh",e);
  e.preventDefault();
  if(
  name.trim() === ""||
  email.trim() === ""||
  mobile.trim() === ""||
  password.trim() === ""

  ){
    toast.error("Please provide details first", toastConfig);
    return;
  }
  if ( password.length ===10) {
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
const response= await fetch('http://localhost:5000/api/user/otpsend',{
  method: 'POST',
  headers:{"Content-Type": 'application/json'},
  body: JSON.stringify({
    email,
  }),
})

const data= await response.json();
console.log(data,"gggggggg");
setLoading(false);
if(data.status === 'sended'){
  toast.success("An OTP sended, check it....",toastConfig)
  setIsActive(true);
  setMinutes(1);
  setSeconds(30)
}else{
  toast.error("Try with another email",toastConfig)
}

}


async function registerUser(e){
  e.preventDefault()
  setLoading(true)
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
  console.log(response.data,"svgsh")
  console.log(data,"respoopoitss");;
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
        mobile
  }),
});
    const data = await response.json()
    setLoading(false)
    console.log(data,"response");
    if(data.status==="ok"){

      // toast.success("Successfully registered".toastConfig)
      navigate("/login")
    }else if(data.status==="fail"){
      toast.error("Nope ! Try with another email ".toastConfig)

    }
  }else if(data.status==="fail"){
    toast.error("Nope ! Try with another email ".toastConfig)
  }
}


  // // Form Submission

  // const handleSubmit = (e) => {
  //   setConfirmPass(true);
  //   e.preventDefault();
  //   if (isSignUp) {
  //     data.password === data.confirmpass
  //       ? 
  //       dispatch(signUp(data, navigate))
  //       : setConfirmPass(false);
  //   } else {
  //     dispatch(logIn(data, navigate));
  //   console.log("asvdgsahv");
  //   }
  // };
if(loading) return <Loader />; 
  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        {/* <img src={Logo} alt="" /> */}

        <div className="Webname">
          <h1>chatBuddy</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}
      {loading ?<Loader/>:

      <div className="a-right">
        <form className="infoForm authForm" style={{ display: isActive ? "none" : "block"}} >
          <h3>{isActive ? "Enter OTP" : "Signup"}</h3>
            <div>
              <input
                required
                type="text"
                placeholder="Name"
                className="infoInput"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}

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
              onChange={(e)=>setEmail(e.target.value)}
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
              onChange={(e)=>setPassword(e.target.value)}
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
              onChange={(e)=>setMobile(e.target.value)}
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
                onChange={(e)=>setconfirmPassword(e.target.value)}
              />
            {/* )} */}
          </div>

          {/* <span
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
          {/* <div> */}
            {/* <span
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
            </span> */}
            <button
            onClick={verifyAccount}
              className="button infoButton"
              type="Submit"
              // disabled={loading}
            >
              SIGNUP
              {/* {loading ? "Loading..." : isActive ? "SignUp" : "Confirm"} */}
            </button>
          {/* </div> */}
        </form>
        <div style={{dispaly:isActive ? "block" : "none"}}>
        <input
                value={otp}
                type="password"
                className="infoInput"
                name="otp"
                placeholder="Enter OTP"
                onChange={(e)=>setOtp(e.target.value)}
              />
              <button
            onClick={registerUser}
              className="button infoButton"
              type="Submit"
              // disabled={loading}
            >
              {loading ? "Loading..." : isActive ? "SignUp" : "Confirm"}
            </button>
        </div>

      </div>
}
    </div>
  );
};

export default Signup;