import { useCallback, useState,useEffect } from 'react';
import { Modal } from "antd";
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
import { useDispatch, useSelector } from "react-redux";

import { allUsers } from "../Redux/Actions/userAction";
import { handleTransactionPay } from "../Redux/Actions/userAction";
import { tokens } from "../theme";


export const AccountTransaction = ({data}) => {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const { ALLUSERS } = useSelector((state) => state.users);

    console.log(data._id,"iiiiii");
    
    
   
   
    // const [userId, setUserId] = useState("");
  
  const [payObj, setPayOjb] = useState({
    userId: "",
    amount: "",
  });
    
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    // setUserId(userid);
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    console.log(values, "handle  ");
    dispatch(handleTransactionPay(values));
    // dispatch(allUsers())
    // setData(ALLUSERS.find(o => o._id === customerId))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const userId=data._id

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
         total profit:{Math.round(data.TotalProfit)}
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
          <Button variant="contained"
         onClick={() => showModal()}>
            Save details
          </Button>
        </CardActions>


        {isModalOpen && (
                    <Modal
                      title="Pay"
                      open={isModalOpen}
                      onOk={()=>handleOk(payObj)}
                      onCancel={handleCancel}
                    >
                      <input
                        // value={payObj.value}
                        // id={customer.userId}
                        // defaultValue={customer.CollectionAmount}
                        cols="30"
                        rows="10"
                        onChange={(e) => {
                          const value = { ...payObj };
                          value.amount = e.target.value;
                          value.userId=userId
                          setPayOjb(value);
                        }}
                      ></input>
                    </Modal>
                  )}
      </Card>
    
  );
};
