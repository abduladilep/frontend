// import React, { useState, useCallback, useEffect, useMemo } from "react";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { Modal } from "antd";
// import {
//   Box,
//   Button,
//   // Container,
//   Stack,
//   SvgIcon,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import { tokens } from "../theme";
// import { applyPagination } from "../utils/applayPagination";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
// } from "@mui/material";

// export const Transactions = ({ data }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const dispatch = useDispatch();

//   const [collected, setCollected] = useState([]);

//   useEffect(() => {
//     let trans = [];
//     let pendingValues = [];
//     let collectedValues = [];
//     let TotalAmountHistory = [];

//     // data.TotalAmountHistory.forEach((val)=>{
//     //     TotalAmountHistory

//     // })

//     if (data.Collected && data.Pending) {
//       data.Pending.forEach((pending) => {
//         const matchingCollected = data.Collected.find((collected) =>
//           moment(pending.date).isSame(collected.date, "day")
//         );

//         console.log(matchingCollected, "matchhhhh");

//         if (matchingCollected) {
//           if (trans.some((detail) => detail.pendingdate === pending.date)) {
//             return; // Skip mapping pending value if there is already a match in 'trans'
//           }

//           trans.push({
//             pendingAmount: pending.pendingAmount,
//             // pendingdate: pending.date,
//             amount: matchingCollected.amount,
//             date: matchingCollected.date,
//           });
//         } else {
//           pendingValues.push(pending);
//           // collectedValues.push(collected);
//         }
//       });

//       collectedValues = data.Collected.filter(
//         (collected) =>
//           !trans.some((detail) => moment(detail.date).isSame(collected.date))
//       );
//     } else if (data.Pending) {
//       pendingValues.push(...data.Pending);
//     } else if (data.Collected) {
//       collectedValues.push(...data.Collected);
//     }

//     console.log("trannnns", trans);
//     console.log(pendingValues, "pendingValues");
//     console.log(collectedValues, "collectevalues");
//     // console.log(data.Collected,"collectevaluetttts");
// // const newarr=[];

// // const match = trans.concat(collectedValues.concat(pendingValues));

// //     match.map((val)=>{
// //         data.TotalAmountHistory.map((valval)=>{
// //           const newobj={
// //             ...val,
// //             reming: valval
// //            }

// //        newarr.push(newobj)
// //     })

// //     })
// //      console.log(newarr,"totalamounthistory");


// //     // const newmatch=match.map((val) =>
// //     //   data.TotalAmountHistory.map((d) => {
// //     //     return { ...val, d };
// //     //   })
// //     // );




// //     console.log(match, "concat");

// //     setCollected(match);
   
// //   }, [data]);


// const match = trans.concat(collectedValues.concat(pendingValues));

// console.log("match", match);

// // Combine TotalAmountHistory with each element in match
// const combinedData = match.map((element, index) => ({
//   ...element,
//   reming: data.TotalAmountHistory[index % data.TotalAmountHistory.length],
// }));

// console.log("combinedData", combinedData);

// setCollected(combinedData);
// }, [data]);

//   console.log(collected, "lllllllllllllllllllllll");

//   const useCustomers = (page, rowsPerPage) => {
//     // console.log(collected, "pageeeee");
//     return useMemo(() => {
//       return applyPagination(collected, page, rowsPerPage);
//     }, [collected, page, rowsPerPage]);
//   };

//   const useCustomerIds = (customers) => {
//     return useMemo(() => {
//       return customers.map((customer) => customer.userId);
//     }, [customers]);
//   };

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const customers = useCustomers(page, rowsPerPage);

//   const customersIds = useCustomerIds(customers);
//   //   console.log(customersIds, "sgdsghvgiiis");

//   const handlePageChange = useCallback((event, value) => {
//     setPage(value);
//   }, []);

//   const handleRowsPerPageChange = useCallback((event) => {
//     setRowsPerPage(event.target.value);
//   }, []);

//   return (
//     <Box m="20px">
//       <Box display="flex" justifyContent="space-around" p={4}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Collected</TableCell>
//               <TableCell>Pending</TableCell>
//               <TableCell>Remaing</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {customers.map((customer) => {
//               return (
//                 <TableRow key={customer.userId} hover>
//                   <TableCell>
//                     <Stack alignItems="center" direction="row" spacing={2}>
//                       <Typography variant="subtitle2">
//                         {moment(customer.date).format("DD/MM/YYYY")}
//                       </Typography>
//                     </Stack>
//                   </TableCell>
//                   <TableCell>{customer.amount ? customer.amount : 0}</TableCell>
//                   <TableCell>
//                     {customer.pendingAmount ? customer.pendingAmount : 0}
//                   </TableCell>
//                   <TableCell>{customer.reming}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </Box>

//       {data.length > 0 && (
//         <TablePagination
//           component="div"
//           count={collected.length}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           items={customers}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//           rowsPerPageOptions={[5, 10, 15]}
//         ></TablePagination>
//       )}
//     </Box>
//   );
// };


/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import moment from "moment";

import {
  Box,
  Button,
  // Container,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
// import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import { tokens } from "../theme";
// import { format, toDate } from "date-fns";
import { applyPagination } from "../utils/applayPagination";
import {
  // Avatar,

  // Card,
  // Checkbox,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

function CollectedReport() {
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  useEffect(() => {
    const Collected = [];
    if (ALLUSERS) { 
      const collectedUsers = ALLUSERS.filter((user) => user.Collected);
      collectedUsers.forEach((user) => {
        console.log(user, "is the user...");
        user?.Collected.forEach((value) => {
          console.log(value, "is the value from mpl...");
          const userDetails={
            ...user,  
            amount: value.amount,      
            date: value.date,
          }

          Collected.push(userDetails);
        });
      });
    }
    setData(Collected);
  }, [ALLUSERS]);

  
  
  console.log(data, "collected report");
  
  const useCustomers = (page, rowsPerPage) => {
    console.log(data,  "pageeeee");
    return useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [data, page, rowsPerPage]);
  };
  
  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.id);
    }, [customers]);
  };
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const customers = useCustomers(page, rowsPerPage);

  // console.log(customers.id,"uuuuuuu");
  //   const customersIds = useCustomerIds(customers);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" p={4}>
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
          USERS
        </Typography>
        <Box alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                {/* <ArrowUpOnSquareIcon /> */}
              </SvgIcon>
            }
          >
            {/* Import */}
          </Button>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowDownOnSquareIcon />
              </SvgIcon>
            }
          >
            Export
          </Button>
        </Box>
      </Box>
      {/* <Card > */}
      <Box display="flex" justifyContent="space-around" p={4}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.();
                    } else {
                      onDeselectAll?.();
                    }
                  }}
                />
                </TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Remaining</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              // const isSelected = selected.includes(customer.id);
              // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');
              // const createdAt = toDate(customer.createdAt);
              // const formattedDate = format(createdAt, 'dd/MM/yyyy')
              
              return (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {/* <Avatar src={customer.avatar}> */}
                      {/* {getInitials(customer.name)} */}
                      {/* </Avatar> */}
                      <Typography variant="subtitle2">
                        {moment(customer.date).format("DD/MM/YYYY")}{" "}
                        {/* {customer.date} */}
                        
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.Name}</TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.amount}</TableCell>
                  <TableCell>{customer.TotalAmountCopy}</TableCell>
                  <TableCell>
                    <Typography
                    // color={colors.palette.grey[200]}
                    >
                      <Button type="submit" color="secondary">
                        More Details
                      </Button>
                    </Typography>

                    {/* {formattedDate} */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      {data.length > 0 && (
        <TablePagination
          component="div"
          count={data.length}
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
}

export default CollectedReport;

