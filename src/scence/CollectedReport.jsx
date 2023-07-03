/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../Redux/Actions/userAction";
import moment from "moment";
import { CustomerSearch } from "../scence/components/customerSearch";
import { CustomerFilter } from "./components/customerFilter";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DatePicker } from "antd";
import { format } from "date-fns";
// import { exportCSV } from "csv-export";
// import { saveAs } from "file-saver";
import {jsPDF} from "jspdf"
import 'jspdf-autotable';


import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Card,
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

// const { RangePicker } = DatePicker;
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

    if (ALLUSERS) {
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

  // function selectDates(values){
  //   if (values && values.length >= 2) {
  //   const startDateFormatted = values[0]?.format("MM DD YYYY");
  //   const endDateFormatted = values[1]?.format("MM DD YYYY");
  //   setStartDate(startDateFormatted);
  //   setEndDate(endDateFormatted);
  //   console.log("start", startDate, "end", endDate);
  //   }
  // }

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

  // const handleSelect = (date) => {
  //   console.log("loggg");
  //   setStartDate(date.selection.startDate);
  //   setEndDate(date.selection.endDate);
  // };


  // const exportTableData = () => {
  //   const csvData = data.map((customer) => ({
  //     Date: moment(customer.date).format("DD/MM/YYYY"),
  //     Name: customer.Name,
  //     Phone: customer.MobileNo,
  //     Amount: customer.amount,
  //     Remaining: customer.TotalAmountCopy,
  //   }));

  //   const csvHeaders = ["Date", "Name", "Phone", "Amount", "Remaining"];

  //   const fileName = "collected_report.csv";

  //   exportCSV({ headers: csvHeaders, data: csvData }, (err, csv) => {
  //     if (err) {
  //       console.error("Error exporting CSV: ", err);
  //       return;
  //     }

  //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  //     saveAs(blob, fileName);
  //   });
  // };


  const exportTableData= () => {
    console.log("expoted");
    const doc =new jsPDF({orientation:'landsacpe'})
    
  const columns = ["Date", "Name","Phone","Amount","Remaining"];
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
    
  doc.save("Collected.pdf")
    
  }


  
  return (

    <Box mx="20px">
    <Box position="sticky" top={0} zIndex={1} sx={{ backgroundColor: theme.palette.background.default, backdropFilter: "blur(6px)" }}>
      <Box display="flex" justifyContent="space-between" p={4}>
        <Box>
          <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
            Collected Report
          </Typography>
          <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon>}
            onClick={exportTableData}
          >
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
