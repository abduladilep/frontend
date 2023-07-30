import React, { useState, useCallback, useEffect, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { adminDetails } from "../Redux/Actions/userAction";
import Modal from "antd/lib/modal/Modal";
import { handleAdminDelete } from "../Redux/Actions/userAction";
import axios from "axios";
import { CustomerSearch } from "../scence/components/customerSearch";

import {
  Box,
  Button,
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

function AdminDetails() {
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [adminId, setadminId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function admin() {
      try {
        const response = await axios.get("backend/api/user/adminDetails");
        setAdmin(response.data);
        
      } catch (error) {
        console.log(error);
      }
    }
    admin();
  }, []);


  const { confirm } = Modal;

  const showModal = (admin_id) => {
    console.log(admin_id, "admin iidd");
    setadminId(admin_id);

    setIsModalOpen(true);
  };

  const handleOk = (values) => {
    dispatch(handleAdminDelete(values));

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" p={4}>
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
          Admins
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
      <Box display="flex" justifyContent="center" p={2}>
      {admin && admin.length > 0 ? (

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {admin?.map((admin) => {
              return (
                <TableRow key={admin._id} hover>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell>{admin.mobile}</TableCell>
                  <TableCell>
                    <Typography>
                      <Button
                        type="submit"
                        color="secondary"
                        onClick={() => showModal(admin._id)}
                      >
                        Delete
                      </Button>
                    </Typography>
                  </TableCell>
                  <TableCell />
                  {isModalOpen && admin._id === adminId && (
                    <Modal
                      title="Do you want to Delete this Admin?"
                      open={isModalOpen}
                      onOk={() => handleOk(adminId)}
                      onCancel={handleCancel}
                      okText="Delete"
                      okType="danger"
                      cancelText="No"
                      style={{ backgroundColor: "black" }}
                      bodyStyle={{ fontSize: "16px" }}
                    ></Modal>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ):(
        <p>No admin data avilable.</p>

      )}
      </Box>
    </Box>
  );
}

export default AdminDetails;
