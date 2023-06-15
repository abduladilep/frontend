import React, { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "antd";
import {
  Box,
  Button,
  // Container,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { applyPagination } from "../utils/applayPagination";
import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export const Transactions = ({data}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();

  const [collected, setCollected] = useState([]);
//   useEffect(() => {
//     let trans = [];
//     let pendingValues = [];
//     let collectedValues = [];
  
//     if (data.Collected && data.Pending) {
//       data.Pending.forEach((pending) => {
//         pendingValues.push(pending);
//         data.Collected.forEach((collected) => {
//             collectedValues.push(collected);
//             if (moment(pending.date).format("DD/MM/YYYY") === moment(collected.date).format("DD/MM/YYYY") ) {

//             const detail = {
//               pendingamount: pending.amount,
//               pendingdate: pending.date,
//               collectedamount: collected.amount,
//               collecteddate: collected.date
//             };

//             trans.push(detail);
//         }
//     });
//     console.log(trans,"transseess");
// });
//     } else if (data.Pending) {
//       pendingValues = data.Pending;
//     } else if (data.Collected) {
//       collectedValues = data.Collected;
//     }
  
//     // Print combined values
//     trans.forEach((detail, index) => {
//       console.log(`Detail ${index}:`);
//       console.log('Pending:', detail.pendingamount, detail.pendingdate);
//       console.log('Collected:', detail.collectedamount, detail.collecteddate);
//     });
  
//     // Print pending values
//     pendingValues.forEach((pending, index) => {
//       console.log(`Pending ${index}:`);
//       console.log('Pending:', pending.amount, pending.date);
//     });
  
//     // Print collected values
//     collectedValues.forEach((collected, index) => {
//       console.log(`Collected ${index}:`);
//       console.log('Collected:', collected.amount, collected.date);
//     });
//   }, [data]);
  useEffect(() =>{
      let trans = [];
let pendingValues = [];
let collectedValues = [];
let TotalAmountHistory=[]

// data.TotalAmountHistory.forEach((val)=>{
//     TotalAmountHistory

// })


if (data.Collected && data.Pending) {
  data.Pending.forEach((pending) => {

    const matchingCollected = data.Collected.find((collected) =>
      moment(pending.date).isSame(collected.date, 'day')
    );

    console.log(matchingCollected,"matchhhhh");

    if (matchingCollected) {
      if (trans.some((detail) => detail.pendingdate === pending.date)) {
        return; // Skip mapping pending value if there is already a match in 'trans'
      }

      trans.push({
        pendingAmount: pending.pendingAmount,
        // pendingdate: pending.date,
        amount: matchingCollected.amount,
        date: matchingCollected.date
      });
    } else {
        pendingValues.push(pending);
        // collectedValues.push(collected);
    }
  });

  collectedValues = data.Collected.filter((collected) =>
    !trans.some((detail) => moment(detail.date).isSame(collected.date))

  );
} else if (data.Pending) {
  pendingValues.push(...data.Pending);
} else if (data.Collected) {
  collectedValues.push(...data.Collected);
}

console.log("trannnns",trans);
console.log(pendingValues,"pendingValues");
console.log(collectedValues,"collectevalues");
// console.log(data.Collected,"collectevaluetttts");



const match=trans.concat(collectedValues.concat(pendingValues))

console.log(match,"concat");
setCollected(match)
// // Print combined values
// trans.forEach((detail, index) => {
//   console.log(`Detail ${index}:`);
//   console.log('Pending:', detail.pendingamount, detail.pendingdate);
//   console.log('Collected:', detail.collectedamount, detail.collecteddate);
// });

// // Print pending values
// pendingValues.forEach((pending, index) => {
//   console.log(`Pending ${index}:`);
//   console.log('Pending:', pending.pendingamount, pending.pendingdate);
// });

// // Print collected values
// collectedValues.forEach((collected, index) => {
//   console.log(`Collected ${index}:`);
//   console.log('Collected:', collected.collectedamount, collected.collecteddate);
// });

},[data])



console.log(collected,"lllllllllllllllllllllll");










const useCustomers = (page, rowsPerPage) => {
    // console.log(collected, "pageeeee");
    return useMemo(() => {
      return applyPagination(collected, page, rowsPerPage);
    }, [collected, page, rowsPerPage]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.userId);
    }, [customers]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const customers = useCustomers(page, rowsPerPage);

  const customersIds = useCustomerIds(customers);
//   console.log(customersIds, "sgdsghvgiiis");


  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-around" p={4}>
        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>Date</TableCell>
              <TableCell>Collected</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Remaing</TableCell>
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              return (
                <TableRow key={customer.userId} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">
                        {moment(customer.date).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.amount}</TableCell>
                  <TableCell>{customer.pendingAmount}</TableCell>
                  <TableCell>{}</TableCell>
                 
                 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      {data.length > 0 && (
        <TablePagination
          component="div"
          count={collected.length}
          page={page}
          rowsPerPage={rowsPerPage}
          items={customers}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 15]}
        ></TablePagination>
      )}
    </Box>
  );
};
// }
