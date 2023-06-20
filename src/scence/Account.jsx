// import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from '../Account/AccountProfile';
import{AccountTransaction} from '../Account/AccountTransaction';
import Transactions from '../Account/Transactions';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useCallback, useEffect,  } from "react";
import { allUsers } from "../Redux/Actions/userAction";




const Account = () =>{
  let { customerId } = useParams()
  const[data,setData] = useState([])

  console.log(customerId,"dfsagdasgfd");
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();



  useEffect(() => {
    if (ALLUSERS.length === 0) {

     dispatch(allUsers())

    } else {

      setData(ALLUSERS.find(o => o._id === customerId));
    }

  }, [ALLUSERS]);
  
  // console.log(data,"dattttttt================>");




return (
  
    
  <>
    {/* <Head>
      <title>
        Account | Devias Kit
      </title>
    </Head> */}
    <Box 
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            
            <Grid 
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile data={data}  />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountTransaction
                // customerId={customerId}
                // setData={setData}
                 data={data}/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
    <Box>
    <Grid 
              // container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <Transactions data={data}/>
              </Grid>
            </Grid>

    </Box>
  </>
);
    }

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Account;
