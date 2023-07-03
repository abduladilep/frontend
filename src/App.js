
import { colorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import {Route,Routes,useLocation} from "react-router-dom";


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




function App() {
  const[theme,colorMode]= useMode()
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  return (
    <colorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      
    <div className="app">
    {!isLoginPage &&!isSignupPage&&<SidBar />}
      <main className="content">
      {!isLoginPage && !isSignupPage&&<TopBar />}


      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}/>
         <Route path="/adduser" element={<AddUser></AddUser>}/>
        <Route path="/collectionReport" element={<CollectionReport></CollectionReport>}/>
        <Route path="/collectedReport" element={<CollectedReport></CollectedReport>}/>
        <Route path="/pendingReport" element={<PendingReport></PendingReport>}/>
        <Route path="/allUsers" element={<AllUsers></AllUsers>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/account/:customerId" element={<Account></Account>}/>
        <Route path="/login" element={<Login></Login>}/>
        <Route path="/admin" element={<AdminDetails></AdminDetails>}/>


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
