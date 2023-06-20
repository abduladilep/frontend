import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';
import CollectionReport from '../CollectionReport';

export const CustomerSearch = ({setSearchKey}) =>{

    // const [serachKey,setSearchKey]= useState("")

    
        const handleSearchChange = (event) => {
          setSearchKey(event.target.value);
          console.log(event.target.value,"targettt");
        };

        
      

    return (

  <Card sx={{ p: 2 }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search company"
      startAdornment={(
        <InputAdornment position="start"  onchange={handleSearchChange}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
          {/* {serachKey.trim().length > 0 && <CollectionReport searchKey={serachKey} />} */}

        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
      
    />
  </Card>
)};
