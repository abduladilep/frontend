/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import moment from "moment";
import { CustomerSearch } from "../scence/components/customerSearch";
import { CustomerFilter } from "./components/customerFilter";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { jsPDF } from "jspdf";
import "jspdf-autotable";

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

function CollectedReport() {
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (ALLUSERS.length === 0) {
      dispatch(allUsers());
    }
  }, []);

  useEffect(() => {
    const Collected = [];

    if (Array.isArray(ALLUSERS)) {
      const collectedUsers = ALLUSERS.filter((user) => user.Collected);
      collectedUsers.forEach((user) => {
        user?.Collected.forEach((value) => {
          const userDetails = {
            ...user,
            amount: value.amount,
            date: value.date,
          };

          Collected.push(userDetails);
        });
      });
    }

    setFilteredData(Collected);

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

  const exportTableData = () => {
    console.log("expoted");
    const doc = new jsPDF({ orientation: "landsacpe" });

    const columns = ["Date", "Name", "Phone", "Amount", "Remaining"];
    const dataa = data.map((customer) => [
      moment(customer.date).format("DD/MM/YYYY"),
      customer.Name,
      customer.MobileNo,
      customer.amount,
      customer.TotalAmountCopy,
    ]);

    doc.autoTable({
      columns,
      body: dataa,
    });

    doc.save("Collected.pdf");
  };

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
            <CustomerFilter
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
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
        <Table id="my-table">
          <TableHead>
            <TableRow>
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
              return (
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">
                        {moment(customer.date).format("DD/MM/YYYY")}{" "}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.Name}</TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.amount}</TableCell>
                  <TableCell>{customer.TotalAmountCopy}</TableCell>
                  <TableCell>
                    <Typography>
                      <Button type="submit" color="secondary">
                        More Details
                      </Button>
                    </Typography>
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
