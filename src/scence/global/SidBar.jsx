import React from 'react';
import {useState} from "react";
// import {Menu,MenuItem,SubMenu} from "react-pro-sidebar";
// import { Sidebar } from 'react-pro-sidebar';
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import {Box,IconButton,Typography,useTheme} from "@mui/material"
import{Link} from "react-router-dom"
import {tokens} from "../../theme"
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { useLocation } from 'react-router-dom';





const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const isActiveLink = location.pathname === to;

  const itemStyle = {
    color: isActiveLink ? colors.greenAccent[500] : colors.grey[100],
  };
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

function SidBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed,setIsCollapsed]=useState(false)
  const[selected,setSelected]=useState("Dashboard")
  return (
    
    <Box  
      sx={{
        
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: colors.grey[500] + " !important",
          backgroundColor: 'rgba(255, 255, 255, 0.04)'
        },
      }}
    >
      <ProSidebar width="40vh" collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "0px 0 0px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                // display="flex"
                // justifyContent="space-between"
                // alignItems="center"
                // ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                King space finance
                </Typography> */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            
            
            <Box mb="25px" >
              <Box display="flex" justifyContent="center" alignItems="center" mb="25px" >
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/kingspacelogo.jpg`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                 King Space  Finance
                </Typography>
                {/* <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography> */}
              </Box>
            </Box>
          )}


          <Box paddingLeft={isCollapsed ? undefined : "7%"}>
            
            <Item
              title="OVERVIEW"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="ADMIN PANEL "
              to="/admin"
              icon={<ManageAccountsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
             Client Data
            </Typography>
             <Item
              title="CLIENT DIRECTORY" 
              to="/allusers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="CREATE CUSTOMER"
              to="/adduser"
              icon={<PersonAddAltOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
            {/* <Item
              title="ADD STAFFS"
              to="/addstaff"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Reports
            </Typography>
            <Item
              title= "PENDING COLLECTIONS"
              to="/collectionReport "
              icon={<PendingActionsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="RECIEVED PAYMENTS"
              to="/collectedReport "
              icon={<CreditScoreOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="OUTSTANDING DUES"
              to="/pendingReport"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
           
             

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default SidBar
