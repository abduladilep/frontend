import { useCallback, useState, useEffect } from "react";
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
  Unstable_Grid2 as Grid,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { allUsers } from "../Redux/Actions/userAction";
import { handleTransactionPay } from "../Redux/Actions/userAction";
import { tokens } from "../theme";
import moment from "moment";

export const AccountTransaction = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const { ALLUSERS } = useSelector((state) => state.users);

  console.log(data, "iiiiii");

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

  const userId = data._id;

  return (
    <Card style={{ backgroundColor: colors.primary[400] }}>
      <CardHeader
      // subheader="The information can be edited"
      // title="sdsd"
      />
      <CardContent sx={{ pt: 0 }}>
        <Box  sx={{ m: -1.5 }}>
          <Grid container spacing={4}>
            <Grid xs={12} md={6}>
              <CardContent maxWidth="sm">
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="center"
                  spacing={-2}
                >
                  <Stack spacing={2}>
                    <Typography color="text.secondary" variant="overline">
                     Collection Start
                    </Typography>
                    <Stack spacing={1} mt="50px">
                      <Typography variant="h4">
                        {moment(data.collectionDate).format('DD-MM-YYYY')}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems="flex-end"></Stack>
                </Stack>
              </CardContent>

              <Divider />
            </Grid>
            <Grid xs={12} md={6}>
              <CardContent maxWidth="sm">
                <Stack
                  alignItems="flex-start"
                  direction="row"
                  justifyContent="center"
                  spacing={-2}
                >
                  <Stack spacing={2}>
                    <Typography color="text.secondary" variant="overline">
                    Collection End
                    </Typography>
                    <Stack spacing={1} mt="50px">
                      <Typography variant="h4">
                         {moment(data.collectionEndDate).format('DD-MM-YYYY')}

                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack alignItems="flex-end"></Stack>
                </Stack>
              </CardContent>
              <Divider />
            </Grid>
            <Grid xs={12} md={4}>
            <CardContent maxWidth="sm">
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
                spacing={-2}
              >
                <Stack spacing={2}>
                  <Typography color="text.secondary" variant="overline">
                    Total Amount
                  </Typography>
                  <Stack spacing={1} mt="50px">
                    <Typography variant="h4">
                    
                      {data.TotalAmount}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end"></Stack>
              </Stack>
            </CardContent>
              <Divider />
            </Grid>
            <Grid xs={12} md={4}>
            <CardContent maxWidth="sm">
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
                spacing={-2}
              >
                <Stack spacing={2}>
                  <Typography color="text.secondary" variant="overline">
                  Investment
                  </Typography>
                  <Stack spacing={1} mt="50px">
                    <Typography variant="h4">
                      {data.GivenAmount}
                      
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end"></Stack>
              </Stack>
            </CardContent>
              <Divider />
            </Grid>
            <Grid xs={12} md={4}>
            <CardContent maxWidth="sm">
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
                spacing={-2}
              >
                <Stack spacing={2}>
                  <Typography color="text.secondary" variant="overline">
                  Interest Amount
                  </Typography>
                  <Stack spacing={1} mt="50px">
                    <Typography variant="h4">
                    
                      {data.InterestAmount}
                      
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end"></Stack>
              </Stack>
            </CardContent>
              <Divider />
            </Grid>
            <Grid xs={12} md={4}>
            <CardContent maxWidth="sm">
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
                spacing={-2}
              >
                <Stack spacing={2}>
                  <Typography color="text.secondary" variant="overline">
                  Total Profit
                  </Typography>
                  <Stack spacing={1} mt="50px">
                    <Typography variant="h4">
                    
                    {Math.round(data.TotalProfit)}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end"></Stack>
              </Stack>
            </CardContent>
              {/* <Divider /> */}
            </Grid>

            <Grid xs={12} md={4}>
            <CardContent maxWidth="sm">
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
                spacing={-2}
              >
                <Stack spacing={2}>
                  <Typography color="text.secondary" variant="overline">
                  Total Collected
                  </Typography>
                  <Stack spacing={1} mt="50px">
                    <Typography variant="h4">
                    
                      {data.TotalCollected}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end"></Stack>
              </Stack>
            </CardContent>
            </Grid>
            <Grid xs={12} md={4}>
            <CardContent maxWidth="sm">
              <Stack
                alignItems="flex-start"
                direction="row"
                justifyContent="center"
                spacing={-2}
              >
                <Stack spacing={2}>
                  <Typography color="text.secondary" variant="overline">
                    Total Pending
                  </Typography>
                  <Stack spacing={1} mt="50px">
                    <Typography variant="h4">
                      {data.TotalPendingAmount}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-end"></Stack>
              </Stack>
            </CardContent>
            </Grid> 
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => showModal()}
        >
          Pay
        </Button>
      </CardActions>

      {isModalOpen && (
        <Modal
          title="Pay"
          open={isModalOpen}
          onOk={() => handleOk(payObj)}
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
              value.userId = userId;
              setPayOjb(value);
            }}
          ></input>
        </Modal>
      )}
    </Card>
  );
};
