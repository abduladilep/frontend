import React, { useState, useCallback, useEffect, useMemo } from "react";
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
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import jsPDF from "jspdf";

 function Transactions ({ data }){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [collected, setCollected] = useState([]);

  useEffect(() => {
    let trans = [];
    let pendingValues = [];
    let collectedValues = [];
    let TotalAmountHistory = [];

    
    if (data.Collected && data.Pending) {
      data.Pending.forEach((pending) => {
        const matchingCollected = data.Collected.find((collected) =>
          moment(pending.date).isSame(collected.date, "day")
        );

        if (matchingCollected) {
          if (trans.some((detail) => detail.pendingdate === pending.date)) {
            return; // Skip mapping pending value if there is already a match in 'trans'
          }

          trans.push({
            pendingAmount: pending.pendingAmount,
            // pendingdate: pending.date,
            amount: matchingCollected.amount,
            date: matchingCollected.date,
          });
        } else {
          pendingValues.push(pending);
          // collectedValues.push(collected);
        }
      });

      collectedValues = data.Collected.filter(
        (collected) =>
          !trans.some((detail) => moment(detail.date).isSame(collected.date))
      );
    } else if (data.Pending) {
      pendingValues.push(...data.Pending);
    } else if (data.Collected) {
      collectedValues.push(...data.Collected);
    }

const match = trans.concat(collectedValues.concat(pendingValues));

console.log("match", match);

// Combine TotalAmountHistory with each element in match
const combinedData = match.map((element, index) => ({
  ...element,
  reming: data.TotalAmountHistory[index % data.TotalAmountHistory.length],
}));

setCollected(combinedData);
}, [data]);

const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(collected, page, rowsPerPage);
    }, [collected, page, rowsPerPage]);
  };
  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.id);
    }, [customers]);
  };
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


  
  const exportTableData= () => {
    const doc =new jsPDF({orientation:'landsacpe'})
  const columns = ["Date", "Collected","Pending","Remaining"];
  const dataa = collected.map((customer) => [
    moment(customer.date).format("DD/MM/YYYY"),
    customer.amount?customer.amount:0,
    customer.pendingAmount?customer.pendingAmount:0,
    customer.reming?customer.reming:0,
  ]);

  doc.autoTable({
    columns,
    body: dataa,
  });
  doc.save("TranactionDetails.pdf")
  }

  return (
    <Box m="20px">
  
        <Box display="flex" justifyContent="space-between" ml={4}  >
          
          <Button color="inherit" startIcon={<SvgIcon fontSize="small"><ArrowDownOnSquareIcon /></SvgIcon>}
            onClick={exportTableData}
          >
            Export
          </Button>
        </Box>
        
      
      <Box display="flex" justifyContent="space-around" p={4} >
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
                <TableRow key={customer.id} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      <Typography variant="subtitle2">
                        {moment(customer.date).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.amount ? customer.amount : 0}</TableCell>
                  <TableCell>
                    {customer.pendingAmount ? customer.pendingAmount : 0}
                  </TableCell>
                  <TableCell>{customer.reming}</TableCell>
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


export default Transactions

