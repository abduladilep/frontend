import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import { Link } from "react-router-dom";
import { CustomerSearch } from "../scence/components/customerSearch";
import {
  Box,
  Button,
  Stack,
  SvgIcon,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
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
import jsPDF from "jspdf";

function AllUsers() {
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    dispatch(allUsers());
  }, []);

  useEffect(() => {
    if(ALLUSERS===null){
      dispatch(allUsers());
  }else{
    
    if (Array.isArray(ALLUSERS)) {
    const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
    const filteredData = ALLUSERS.filter((customer) => {
      const nameIncludes = customer?.Name.toLowerCase().includes(searchValue);
      const mobileIncludes =
        customer?.MobileNo.toString().includes(searchValue);
      return nameIncludes || mobileIncludes;
    });
    setData(filteredData);

  }
}
  
  }, [ALLUSERS, searchKey]);

 

  const useCustomers = (page, rowsPerPage) => {
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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


  const exportTableData= () => {
    const doc =new jsPDF({orientation:'landsacpe'})
    
  const columns = [ "Name","Phone","Address","Amount"];
  const dataa = data.map((customer) => [
    customer.Name,
    customer.MobileNo,
    customer.Address,
    customer.TotalAmount,
  ]);

  doc.autoTable({
    columns,
    body: dataa,
  });
    
  doc.save("All Customers.pdf")
    
  }

  return (
    <Box mx="20px">
      <Box
        position="sticky"
        top={0}
        zIndex={1}
        sx={{
          backgroundColor: theme.palette.background.default,
          backdropFilter: "blur(6px)",
        }}
      >
        <Box display="flex" justifyContent="space-between" p={4}>
          <Box>
            <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
              Collected Report
            </Typography>
            <Button
              color="inherit"
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowDownOnSquareIcon />
                </SvgIcon>
              }
              onClick={exportTableData}
            >
              Export
            </Button>
          </Box>
          <Box>
          </Box>
        </Box>
        <Box
          position="sticky"
          top={0}
          zIndex={1}
          sx={{
            backgroundColor: theme.palette.background.default,
            backdropFilter: "blur(6px)",
          }}
          p={4}
        >
          <CustomerSearch setSearchKey={setSearchKey} />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-around" p={4}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => {
              return (
                <TableRow key={customer._id} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">
                        {customer.Name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.Address}</TableCell>
                  <TableCell>{customer.TotalAmount}</TableCell>

                  <TableCell>
                    
                    <Link
                      to={`/account/${customer._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button color="secondary">More Details</Button>
                    </Link>

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
