import {
  Box,
  Unstable_Grid2 as Grid,
  Container,
} from "@mui/material";
import moment from "moment";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import  CurrencyRupeeIcon from "@heroicons/react/24/solid/CurrencyRupeeIcon";
import  QueueListIcon from "@heroicons/react/24/solid/QueueListIcon";
import React, { useEffect, useState } from "react";
import Overview from "./components/overview";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import { collectionList } from "../Redux/Actions/userAction";



function Dashboard() {
  const [overview, setOverview] = useState({
    InvestmentAmount: "",
    InterestAmount:"",
    TotalAmount: "",
    TotalProfit: "",
    TotalCollected: "",
    TotalPending: "",
    TodayProfit:"",
    TodayCollected: "",
    TodayPending: "",
  });

  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(collectionList())
  }, [])

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  useEffect(() => {
    if (Array.isArray(ALLUSERS)) {
      const {
        sumGivenAmount,
        sumTotalProfit,
        sumTotalCollected,
        sumTotalAmount,
        sumIntrestAmount,
        sumTotalPendingAmount,
      } = ALLUSERS.reduce(
        (totals, user) => {
          totals.sumGivenAmount += parseFloat(user.GivenAmount);
          totals.sumIntrestAmount += parseFloat(user.InterestAmount);
          totals.sumTotalAmount += parseFloat(user.TotalAmount);

          if (user.TotalPendingAmount && !isNaN(user.TotalPendingAmount)) {
            totals.sumTotalPendingAmount += parseFloat(user.TotalPendingAmount);
          }
          if (user.TotalProfit && !isNaN(user.TotalProfit)) {
            totals.sumTotalProfit += parseFloat(user.TotalProfit);
          }
          if (user.TotalCollected && !isNaN(user.TotalCollected)) {
            totals.sumTotalCollected += parseFloat(user.TotalCollected);
          }
          return totals;
        },
        {
          sumGivenAmount: 0,
          sumTotalProfit: 0,
          sumTotalCollected: 0,
          sumTotalAmount: 0,
          sumIntrestAmount: 0,
          sumTotalPendingAmount:0,
        }
      );
      
const currentDate = new Date();

const todayprofit = ALLUSERS.filter((user) => user.TodayProfit  );
const todaycollected =ALLUSERS.filter((user) => user.Collected );
const todaypending =ALLUSERS.filter((user) => user.Pending );

let profitSum = 0;
let collectedSum = 0;
let pendingSum = 0;

todayprofit.forEach((user) => {
  user?.TodayProfit.forEach((profit) => {
  const profitDate=new Date(profit.date)
    if (moment(profitDate).format("DD/MM/YYYY")===moment(currentDate).format("DD/MM/YYYY") ) {
      if (typeof  parseFloat(profit.Profit) === 'number') {
        profitSum += parseFloat(profit.Profit);
        
      }
    }
  });
});
const todayProfit= profitSum

todaycollected.forEach((user) => {
  user?.Collected.forEach((collected) => {
  const collectedDate=new Date(collected.date)
  if (moment(collectedDate).format("DD/MM/YYYY")===moment(currentDate).format("DD/MM/YYYY") ) {
      if (typeof parseFloat(collected.amount) === 'number') {
        collectedSum += parseFloat(collected.amount);
      }
    }
  });
});
  const todayCollected= collectedSum
  todaypending.forEach((user) => {
    user?.Pending.forEach((pending) => {
    const pendingDate=new Date(pending.date)
      if (moment(pendingDate).format("DD/MM/YYYY")===moment(currentDate).format("DD/MM/YYYY") ) {
   
        if (typeof parseFloat(pending.pendingAmount) === 'number') {
          pendingSum += parseFloat(pending.pendingAmount);
          
        }}
    });
  });
 const todayPending =pendingSum

setOverview({
  InvestmentAmount: sumGivenAmount,
  InterestAmount:sumIntrestAmount,
  TotalAmount: sumTotalAmount,
  TotalProfit: sumTotalProfit,
  TotalCollected: sumTotalCollected,
  TodayProfit:todayProfit,
  TodayCollected:todayCollected,
  TotalPending: sumTotalPendingAmount,
  TodayPending:todayPending,
})
    }
  }, [ALLUSERS]);


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Overview heading="Total Investment" subHeading="Gross Profit" amount={overview.InvestmentAmount}   subAmount={overview.InterestAmount}  avatar={<CurrencyDollarIcon />} />
            <Overview heading="Total Profit" subHeading="Today Profit" amount= {Math.round(overview.TotalProfit)}  subAmount={Math.round(overview.TodayProfit)}  avatar={<CurrencyRupeeIcon/>} />
            <Overview heading="Total Collected" subHeading="Today Collected" amount={Math.round(overview.TotalCollected)} subAmount={Math.round(overview.TodayCollected)} avatar={<BanknotesIcon/>}  />
            <Overview heading="Total Pending" subHeading="Today Pending" amount={Math.round(overview.TotalPending)}  subAmount={Math.round(overview.TodayPending)} avatar={<QueueListIcon/>}/>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
