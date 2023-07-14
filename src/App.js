
import { colorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {Route,Routes,useLocation, useNavigate} from "react-router-dom";


import TopBar from "./scence/global/TopBar";
import SidBar from "./scence/global/SidBar";



import AddUser from "./scence/AddUser";
import CollectionReport from "./scence/CollectionReport";
import CollectedReport from "./scence/CollectedReport";
import PendingReport from "./scence/PendingReport";
import Dashboard from "./scence/Dashboard";
import AllUsers from "./scence/AllUser";
import Signup from "./scence/SignupPage/Signup";
import Login from "./scence/loginPage/Login"
import Account from "./scence/Account";
import AdminDetails from "./scence/AdminDetails";
import RequireAuth from "./scence/authentication/Auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";




function App() {
  const[theme,colorMode]= useMode()
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";


  const { token } = useSelector((state) => state.token);
  console.log('toekeeeen',token);

  useEffect(() => {
    // Redirect to the desired page after successful login
    if (token && (isLoginPage || isSignupPage)) {
      navigate("/");
    }
  }, [token, isLoginPage, isSignupPage, navigate]);

  return (
    <colorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
    <div className="app">
    {!isLoginPage &&!isSignupPage&&<SidBar />}
      <main className="content">
      {!isLoginPage && !isSignupPage&&<TopBar />}


      <Routes>
      <Route path="/login" element={<Login></Login>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route element={<RequireAuth/>}>


        <Route path="/" element={<Dashboard></Dashboard>}/>
         <Route path="/adduser" element={<AddUser></AddUser>}/>
        <Route path="/collectionReport" element={<CollectionReport></CollectionReport>}/>
        <Route path="/collectedReport" element={<CollectedReport></CollectedReport>}/>
        <Route path="/pendingReport" element={<PendingReport></PendingReport>}/>
        <Route path="/allUsers" element={<AllUsers></AllUsers>}/>
        <Route path="/account/:customerId" element={<Account></Account>}/>
        <Route path="/admin" element={<AdminDetails></AdminDetails>}/>

</Route>
        {/* <Route path="/addStaff" element={<AddStaff></AddStaff>}/> */}
        {/* <Route path="/form" element={<Form/>}/> */}
        </Routes>
      </main>

    </div>

    </ThemeProvider>

</colorModeContext.Provider>
  );
}

export default App;


// import TopBar from "./scence/global/TopBar";
// import SidBar from "./scence/global/SidBar";
// import AddUser from "./scence/AddUser";
// import CollectionReport from "./scence/CollectionReport";
// import CollectedReport from "./scence/CollectedReport";
// import PendingReport from "./scence/PendingReport";
// import Dashboard from "./scence/Dashboard";
// import AllUsers from "./scence/AllUser";
// import Signup from "./scence/SignupPage/Signup";
// import Login from "./scence/loginPage/Login";
// import Account from "./scence/Account";
// import AdminDetails from "./scence/AdminDetails";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// // import RequireAuth from "./scence/Authentication/Auth";
// import { Col } from "antd";
// import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// function App() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isLoginPage = location.pathname === "/login";
//   const isSignupPage = location.pathname === "/signup";

//   const { token } = useSelector((state) => state.token);

//   useEffect(() => {
//     // Redirect to the desired page after successful login
//     if (token && (isLoginPage || isSignupPage)) {
//       navigate("/");
//     }
//   }, [token, isLoginPage, isSignupPage, navigate]);

//   return (
//     <div className="app">
//       {!isLoginPage && !isSignupPage && <SidBar />}
//       <main className="content">
//         {!isLoginPage && !isSignupPage && <TopBar />}

//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           {/* <Route element={<RequireAuth />}> */}
//             <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
//              {/* <Route path="/" element={<Dashboard></Dashboard>}/> */}

//             <Route path="/adduser" element={token ? <AddUser /> : <Navigate to="/login" />} />
//             <Route
//               path="/collectionReport"
//               element={token ? <CollectionReport /> : <Navigate to="/login" />}
//             />
//             <Route
//               path="/collectedReport"
//               element={token ? <CollectedReport /> : <Navigate to="/login" />}
//             />
//             <Route path="/pendingReport" element={token ? <PendingReport /> : <Navigate to="/login" />} />
//             <Route path="/allUsers" element={token ? <AllUsers /> : <Navigate to="/login" />} />
//             <Route
//               path="/account/:customerId"
//               element={token ? <Account /> : <Navigate to="/login" />}
//             />
//             <Route
//               path="/adminDetails"
//               element={token ? <AdminDetails /> : <Navigate to="/login" />}
//             />
//           {/* </Route> */}
          
//         </Routes>
//       </main>

//       <ToastContainer />
//     </div>
//   );
// }

// export default App;