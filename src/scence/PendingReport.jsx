/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import { CustomerSearch } from "../scence/components/customerSearch";
import { CustomerFilter } from "./components/customerFilter";
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
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

function CollectedReport() {
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  let Collected = [];

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  
  // useEffect(() => {
  //   const collectionList = async () => {
  //     const response = await axios.get("/api/user/collectionList");
  //     // setData(response.data.todayDates);
  //   };
  //   collectionList();
  // }, []);


  useEffect(() => {



    const Collected = [];
    if (ALLUSERS) { 
      const collectedUsers = ALLUSERS.filter((user) => user.Pending);
      collectedUsers.forEach((user) => {
        console.log(user, "is the user...");
        user?.Pending.forEach((value) => {
          console.log(value, "is the value from mpl...");
        if(value.pendingAmount<=0){
          console.log("vha");
        } else {
          const userDetails={
            ...user,
            amount: value.pendingAmount,
            date: value.date,
          }
          Collected.push(userDetails);
          }

        });
      });
    }

    setFilteredData(Collected);

    // const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
    // const filteredData = Collected.filter((customer) => {
    //   const nameIncludes = customer?.Name.toLowerCase().includes(searchValue);
    //   const mobileIncludes = customer?.MobileNo.toString().includes(searchValue);
    //   return nameIncludes || mobileIncludes;
    // });




    // setData(filteredData);


    const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
    const filteredData = Collected.filter((customer) => {
      const nameIncludes = customer?.Name.toLowerCase().includes(searchValue);
      const mobileIncludes =
        customer?.MobileNo.toString().includes(searchValue);

      const dateMatches =
        startDate && endDate
          ? new Date(customer.date) >= new Date(startDate) &&
            new Date(customer.date) <= new Date(endDate)
          : true;
      return (nameIncludes || mobileIncludes) && dateMatches;
    });

    setData(filteredData);
  }, [ALLUSERS, searchKey, startDate, endDate]);
  


    // setData(Collected);

  

  // useEffect(() => {
  //   if (ALLUSERS) {
  //     const collectedData = [];
  //     ALLUSERS.forEach((user) => {
  //       if (user.Collected) {
  //         user.Collected.forEach((value) => {
  //           collectedData.push(value);
  //         });
  //       }
  //     });
  //     setData(collectedData);
  //   }
  // }, [ALLUSERS]);

  
  console.log(data, "collected report");
  
  const useCustomers = (page, rowsPerPage) => {
    console.log(data, "pageeeee");
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

  const customersIds = useCustomerIds(customers);
  console.log(customers.id,"uuuuuuu");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const exportTableData= () => {
    console.log("expoted");
    const doc =new jsPDF({orientation:'landsacpe'})
    
  const columns = ["Date", "Name","Phone","Amount"];
  const dataa = data.map((customer) => [
    moment(customer.date).format("DD/MM/YYYY"),
    customer.Name,
    customer.MobileNo,
    customer.amount,
    // customer.TotalAmountCopy,
  ]);

  doc.autoTable({
    columns,
    body: dataa,
  });
    
    
doc.save("Pending.pdf")
  }
  return (
  

    <Box mx="20px">
    <Box position="sticky" top={0} zIndex={1} sx={{ backgroundColor: theme.palette.background.default, backdropFilter: "blur(6px)" }}>
      <Box display="flex" justifyContent="space-between" p={4}>
        <Box>
          <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
           Pending Report
          </Typography>
          <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon>}
           onClick={exportTableData}>
            Export
          </Button>
        </Box>
        <Box >
           <CustomerFilter setStartDate={setStartDate} setEndDate={setEndDate}/>
        </Box>
      </Box>
      <Box position="sticky" top={0} zIndex={1} sx={{ backgroundColor: theme.palette.background.default, backdropFilter: "blur(6px)" }} p={4}>
        <CustomerSearch setSearchKey={setSearchKey}  />
      </Box>
    </Box>
      {/* <Card > */}
      <Box display="flex" justifyContent="space-around" p={4}>
        <Table id="my-table">
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
              <TableCell></TableCell>
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
                <TableRow key={customer._id} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {/* <Avatar src={customer.avatar}> */}
                      {/* {getInitials(customer.name)} */}
                      {/* </Avatar> */}
                      <Typography variant="subtitle2">
                        {moment(customer.date).format("DD/MM/YYYY")}{" "}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.Name}</TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.amount}</TableCell>
                  <TableCell>{customer.remining}</TableCell>
                  <TableCell>
                   
                    
                        <Link to={`/account/${customer._id}`}>
                      <Button type="submit" color="secondary">
                        More Details </Button>
                         </Link>
                   

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
