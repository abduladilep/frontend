import React, {useState} from 'react'
          import { Link, useNavigate } from 'react-router-dom';
          import { useDispatch, useSelector } from "react-redux";
        //   import Logo from '../../Social Club Logo.png'
        //   import ForgotModal from './ForgotModal/ForgotModal';
        //   import { setToken, setUser} from '../../Redux/Actions';
        //   import './Login.css'
          import { toast } from "react-toastify";
          import DotSpinner from '../Dotspinner/Dotspinner'

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
            // const dispatch = useDispatch();
            const [loading,setLoading] = useState(false);
            // const [isOpen,setIsOpen] = useState(false)
            const [name, setName] = useState("");
            const [mobile, setMobile] = useState("");

            const [password, setPassword] = useState("");

            async function loginUser(e) {

                console.log("asvahdh");
                e.preventDefault();
                if(name.trim() === ""){
                    toast.error("Please provide Email first", toastConfig);
                    return
                }
                if(mobile.trim() === ""){
                    toast.error("Please provide Number first", toastConfig);
                    return
                }
                if(mobile.length<10 || mobile.length>10){
                    toast.error("Please provide valid mobile number", toastConfig);
                    return
                }
                if(password.length < 5 || password.length > 15){
                    toast.error("Invalid password", toastConfig);
                    return
                }
                if(password.trim() === ""){
                    toast.error("Enter password", toastConfig);
                    return;
                }
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/user/login`, {
                    method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  password,
                  mobile
                }),
            })
            console.log(mobile, password,"email+pass");
              const data = await response.json();
              console.log(data,"datatta");
              if(data.admin){
                setLoading(false);
                toast.success("Successfully Logged In", toastConfig)
                localStorage.setItem('token',data.admin);
                // dispatch(setToken(data.user));
                // dispatch(setUser(data.details));
                navigate('/');
            }else if(data.status === 'wrong'){
              setLoading(false);
              toast.error("Invalid Email or password", toastConfig);
            }else{
              setLoading(false);
              toast.error("No account with this Email", toastConfig);
            }
            }

            return (
              <div className="row" style={{ height: '100vh' }}>

                {/* left side */}

                <div className="col-md-6 a-left">
                  {/* <img src={Logo} alt="" /> */}

                  <div className="Webname">
                    <h1 >ChatBuddy</h1>
                    <h6>Explore the ideas throughout the world</h6>
                  </div>
                </div>

                {/* right form side */}

                <div className="col-md-6 p-5 a-right">
                <form className="authForm">
                  <h4 className='text-center' >Login</h4>
            <div class="form-group">
              <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" name="name" value={name} aria-describedby="nameHelp" placeholder="Name"></input>
            </div>
            <div class="form-group">
              <input onChange={(e) => setMobile(e.target.value)} type="text" className="form-control" name="mobile" value={mobile} aria-describedby="mobileHelp" placeholder="Mobile Number"></input>
            </div>
            <div className="form-group">
              <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" name="password" value={password} placeholder="Password"></input>
            </div>
            <div className='d-flex justify-content-center'>
            <button style={{width:'200px'}} onClick={loginUser}  className="button logout-button">
                {loading? <DotSpinner/> : 'Login'}</button>
            </div>
          </form>
          {/* <ForgotModal open={isOpen} onClose={()=> setIsOpen(false)} /> */}
          <Link to="/signup" className='linkword'>New User? Create New Account</Link>
                </div>
              </div>
            )
          }

          export default Login