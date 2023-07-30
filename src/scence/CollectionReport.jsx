import React, { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { handlePaymentRequest } from "../Redux/Actions/userAction";
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
import { collectionList } from "../Redux/Actions/userAction";
import { CustomerFilter } from "./components/customerFilter";
import jsPDF from "jspdf";



function CollectionReport() {

  const dispatch=useDispatch()
  const{COLLECTIONS}=useSelector((state)=>state.collection)
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userId, setUserId] = useState("");
  const [payObj, setPayOjb] = useState({
    userId: "",
    amount: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);


useEffect(() => {
  // if(COLLECTIONS===0){
    dispatch(collectionList())
  // }
}, [])

useEffect(() => {
  const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
  const filteredData = COLLECTIONS.filter((customer) => {
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
}, [COLLECTIONS, searchKey, startDate, endDate]);


  const useCustomers = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [data, page, rowsPerPage]);
  };

  const useCustomerIds = (customers) => {
    return useMemo(() => {
      return customers.map((customer) => customer.userId);
    }, [customers]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const customers = useCustomers(page, rowsPerPage);

  const customersIds = useCustomerIds(customers);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);


  const showModal = (user_id) => {
    setUserId(user_id);
    setIsModalOpen(true);
  };
  const handleOk = (values) => {
    dispatch(handlePaymentRequest(values));
    
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const exportTableData= () => {
    const doc =new jsPDF({orientation:'landsacpe'})
    
  const columns = ["Date", "Name","Address","Phone","Amount"];
  const dataa = data.map((customer) => [
    moment(customer.date).format("DD/MM/YYYY"),
    customer.Name,
    customer.Address,
    customer.MobileNo,
    customer.amount,
  ]);

  doc.autoTable({
    columns,
    body: dataa,
  });
    
doc.save("Collection.pdf")
  }


  return (
    <Box mx="20px">
    <Box position="sticky" top={0} zIndex={1} sx={{ backgroundColor: theme.palette.background.default, backdropFilter: "blur(6px)" }}>
      <Box display="flex" justifyContent="space-between" p={4}>
        <Box>
          <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
           Collection Report
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
      
      <Box display="flex" justifyContent="space-around" p={2}>
        <Table id="my-table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell></TableCell>
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
                  <TableCell>{customer.Name}</TableCell>
                  <TableCell>{customer.Address}</TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.CollectionAmount}</TableCell>
                  <TableCell>
                    <Typography color={colors.grey[100]}>
                      <Button
                        type="primary"
                        color="secondary"
                        onClick={() => showModal(customer.userId)}
                      >
                        Pay
                      </Button>
                    </Typography>
                  </TableCell>
                  
                  {isModalOpen && customer.userId === userId && (
                    <Modal
                      title="Pay"
                      open={isModalOpen}
                      onOk={()=>handleOk(payObj)}
                      onCancel={handleCancel}
                      bodyStyle={{ width: '10px', height: '5px', fontSize: '16px' }}
                    >
                      <input
                        placeholder={customer.CollectionAmount}
                        type="number"
                        cols="30"
                        rows="10"
                        
                        style={{ fontSize: '16px' , margin: '15px 20px', width: '100', height: '80', }}

                        onChange={(e) => {
                          const data = { ...payObj };
                          data.amount = e.target.value;
                          data.userId=customer.userId;
                          setPayOjb(data);
                        }}
                      ></input>
                    </Modal>
                  )}
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


export default CollectionReport;
