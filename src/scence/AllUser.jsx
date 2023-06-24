import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import { Link } from 'react-router-dom'
import { CustomerSearch } from "../scence/components/customerSearch";


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

function AllUsers() {
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");



  useEffect(() => {
    dispatch(allUsers());
  },[]);

  useEffect(() => {   


    // const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
    // const nameStartsWith = [];
    // const nameIncludes = [];
    
    // ALLUSERS.forEach((customer) => {
    //   const name = customer?.Name.toLowerCase();
      
    //   if (name.startsWith(searchValue)) {
    //     nameStartsWith.push(customer);
    //   } else if (name.includes(searchValue)) {
    //     nameIncludes.push(customer);
    //   }
    // });
    
    // const filteredData = nameStartsWith.concat(nameIncludes);

      
      const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
      const filteredData = ALLUSERS.filter((customer) => {
        const nameIncludes = customer?.Name.toLowerCase().includes(searchValue);
        const mobileIncludes = customer?.MobileNo.toString().includes(searchValue);
        return nameIncludes || mobileIncludes;
      });
      setData(filteredData);

    // setData(ALLUSERS);
  }, [ALLUSERS,searchKey]);

  console.log("datas only", data);

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
    // const customersIds = useCustomerIds(customers);
    // console.log(customers._id,"uuuuuuu");


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
    // console.log(value, "valueee");
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    // console.log(event.target.value, "valuee0000e");
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
      <CustomerSearch setSearchKey={setSearchKey} />

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
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
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
                        {customer.Name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.Address}</TableCell>
                  <TableCell>{customer.GivenAmount}</TableCell>

                  <TableCell>
                    <Typography
                    // color={colors.palette.grey[200]}
                    >
                      <Button type="submit" color="secondary">
                     <Link to={`/account/${customer._id}`}>
                        More Details</Link>
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

export default AllUsers;
