import { useCallback, useState,useEffect } from 'react';
import {
  Box,
  useTheme,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';

import { tokens } from "../theme";


export const AccountTransaction = ({data}) => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const[pending,setPending] = useState()
    const[collected,setCollected] = useState()
    
  //   useEffect(() => {
  //  if(data && data.Collected) {
  //   //  let sumOfColected =0

  //   const sumOfColected= data.Collected.reduce((sum,element) => {
  //   console.log(element.amount);
  //    return sum + parseFloat(element.amount)
  //   },0)
    
  //     setCollected(sumOfColected)
  

    
  //  }
   
  // }, [data]);

   



  return (
   
      <Card   style={{ backgroundColor: colors.primary[500]}}>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={4}
            >
              <Grid
                xs={12}
                md={6}
              >
                <Box>

               <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
             {data.TotalAmount}
            </Typography>
                
              </Box>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Box>

               <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
             {data.GivenAmount}
            </Typography>
                
              </Box>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Box>

               <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
           total interst: {data.InterestAmount}
            </Typography>
                
              </Box>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Box>

               <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
         total profit:{data.TotalProfit}
            </Typography>
                
              </Box>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Box>

               <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
           total collected: {data.TotalCollected}
            </Typography>
                
              </Box>
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <Box>

               <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
              >
             total pending:{data.TotalPendingAmount}
            </Typography>
                
              </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    
  );
};
