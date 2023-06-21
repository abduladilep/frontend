import React, { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Modal } from "antd";
import { handlePaymentRequest } from "../Redux/Actions/userAction";
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
import { collectionList } from "../Redux/Actions/userAction";


function CollectionReport() {

  // const { users, loading, error } = useSearchUsers(searchKey);

  const dispatch=useDispatch()
  const{COLLECTIONS}=useSelector((state)=>state.collection)
  const [data, setData] = useState([]);
  const [searchKey, setSearchKey] = useState("");


//   useEffect(() => {
//     const collectionList = async () => {
//       const response = await axios.get("/api/user/collectionList");
//       setData(response.data.todayDates);
// console.log(response,"resspoooooooooooooooo");

//     };
//     collectionList();
//   }, []);

useEffect(() => {
  // if(COLLECTIONS===0){
  //   console.log("insidee");

    dispatch(collectionList())
  // }
}, [])

useEffect(() => {
  console.log("outsidee");


  const searchValue = searchKey.toLowerCase(); // Define searchValue based on searchKey
  const nameStartsWith = [];
  const nameIncludes = [];
  
  COLLECTIONS.forEach((customer) => {
    const name = customer?.Name.toLowerCase();
    
    if (name.startsWith(searchValue)) {
      nameStartsWith.push(customer);
    } else if (name.includes(searchValue)) {
      nameIncludes.push(customer);
    }
  });
  
  const filteredData = nameStartsWith.concat(nameIncludes);
    setData(filteredData);
  
  
  
  // setData(COLLECTIONS)


}, [COLLECTIONS,searchKey])




  console.log(data, "collecbbbbtion");

  const useCustomers = (page, rowsPerPage) => {
    console.log(data, "pageeeee");
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
  console.log(customersIds, "sgdsghvgiiis");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
    // console.log(event.target.value, "valuee0000e");
  }, []);

  // const PaymentModal = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

  
  const [payObj, setPayOjb] = useState({
    userId: "",
    amount: "",
  });

 
  

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Box display="flex" justifyContent="space-around" p={2}>
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
              <TableCell>Address</TableCell>
              <TableCell>Phone</TableCell>
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
                <TableRow key={customer.userId} hover>
                  <TableCell>
                    <Stack alignItems="center" direction="row" spacing={2}>
                      {/* <Avatar src={customer.avatar}> */}
                      {/* {getInitials(customer.name)} */}
                      {/* </Avatar> */}
                      <Typography variant="subtitle2">
                        {moment(customer.date).format("DD/MM/YYYY")}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{customer.Name}</TableCell>
                  <TableCell>{customer.Address}</TableCell>
                  <TableCell>{customer.MobileNo}</TableCell>
                  <TableCell>{customer.CollectionAmount}</TableCell>
                  {/* <TableCell>{customer.CollectionAmount}</TableCell> */}
                  <TableCell>
                    <Typography color={colors.grey[100]}>
                      <Button
                        type="primary"
                        // onClick={(showModal)}>
                        // onClick={()=>showModal(customer.userId)}>
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
                    >
                      <input
                        // value={payObj.value}
                        // id={customer.userId}
                        // defaultValue={customer.CollectionAmount}
                        cols="30"
                        rows="10"
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
// }

export default CollectionReport;
