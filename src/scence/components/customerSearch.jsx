import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Box, Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';
import CollectionReport from '../CollectionReport';
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

export const CustomerSearch = ({setSearchKey,setStartDate,setEndDate}) =>{

    // const [serachKey,setSearchKey]= useState("")

    
        const handleSearchChange = (event) => {
          setSearchKey(event.target.value);
          console.log(event.target.value,"targettt");
        };

        // function selectDates(values){
        //   if (values && values.length >= 2) {
        //   const startDateFormatted = values[0]?.format("MM DD YYYY");
        //   const endDateFormatted = values[1]?.format("MM DD YYYY");
        //   setStartDate(startDateFormatted);
        //   setEndDate(endDateFormatted);
        //   }
        // }
        
      

    return (

  // <Card sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
    // <Box>

    
    // <OutlinedInput
    //   defaultValue=""
    //   fullWidth
    //   placeholder="Search company"
    //   startAdornment={(
    //     <InputAdornment position="start" 
    //     >
    //       <SvgIcon
            // color="action"
    //         fontSize="small"
    //       >
    //         <MagnifyingGlassIcon />
    //       </SvgIcon>
    //       {/* {serachKey.trim().length > 0 && <CollectionReport searchKey={serachKey} />} */}

    //     </InputAdornment>
    //   )}
    //   sx={{ maxWidth: 500 }}
    //   onChange={handleSearchChange}

      
    // />
    // </Box>
    // <Box>

    //  {/* <RangePicker format="DD/MM/YYYY"   onChange={selectDates}/> */}
    // </Box>
    // </>
  
  /* // </Card> */
  // <Card sx={{ p: 2 }}>
  <OutlinedInput
    defaultValue=""
    fullWidth
    placeholder="Search customer"
    startAdornment={(
      <InputAdornment position="start">
        <SvgIcon
          color="action"
          fontSize="small"
        >
          <MagnifyingGlassIcon />
        </SvgIcon>
      </InputAdornment>
    )}
    sx={{ maxWidth: 500 }}
    onChange={handleSearchChange}
  />

)}
