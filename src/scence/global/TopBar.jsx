import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { colorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { CustomerSearch } from "../components/customerSearch";
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
function TopBar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(colorModeContext);




    return(
    
    <Box  display="flex" justifyContent="space-between" p={4} className="fixed-top-bar" 
    // sx={{ backdropFilter: 'blur(6px)', position: 'sticky',
   
    //       // left: {
    //       //   lg: `${SIDE_NAV_WIDTH}px`
    //       // },
    //       top: 0,
    //       // width: {
    //       //   lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
    //       // },
    //       }}
    >
      <Box display="flex" 
      // backgroun  dColor={colors.primary[400]}
      borderRadius="5px" >
        {/* <InputBase sx={{ml:2, flex:1}} placeholder="search"></InputBase> */}
        {/* <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
          Company Name
        </Typography> */}
        {/* < */}
        {/* <IconButton type="button" sx={{p:1}} > */}
          {/* <SearchIcon /> */}
        {/* </IconButton> */}
  
      </Box>
      {/* /*icon/  */}
    <Box display="flex">
        <IconButton  >
       <SettingsOutlinedIcon/>
        </IconButton>
        
        <IconButton  onClick={colorMode.toggleColorMode}>
          {theme.palette.mode ==='dark' ?(
  
            <DarkModeOutlinedIcon />
          ):(
            <LightModeOutlinedIcon/>
          )}
  
          
  
        </IconButton>
    </Box>
  
    
    </Box>
)}

export default TopBar
