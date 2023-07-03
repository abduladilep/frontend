// import Head from 'next/head';
import { Box, Container, Stack, Typography,useMediaQuery, Unstable_Grid2 as Grid, Button, useTheme , SvgIcon,TextField} from '@mui/material';
import { addWeeks } from "@progress/kendo-date-math";

// import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfile } from '../Account/AccountProfile';
import{AccountTransaction} from '../Account/AccountTransaction';
import Transactions from '../Account/Transactions';
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useCallback, useEffect,  } from "react";
import { allUsers,updateUser } from "../Redux/Actions/userAction";
import { tokens } from "../theme";
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';

// import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon'; 
// import { Modal } from "antd";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { dark } from '@mui/material/styles/createPalette';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Modal from 'antd/lib/modal/Modal';
import moment from 'moment';
import jsPDF from 'jspdf';




const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const userSchema = Yup.object().shape({
  // Name: Yup.string()
  //   .min(3)
  //   .max(50)
  //   .required("Please enter your name"),
  // MobileNo: Yup.string()
  //   .min(10)
  //   .max(10)
  //   .matches(phoneRegExp, "Phone number is not valid")
  //   .required("Mobile number is must be 10 digits"),
  // Address: Yup.string().required(),
  // GivenAmount: Yup.number()
  //   .positive()
  //   .integer()
  //   .required("Please Enter the amount to give"),

  //   collectionPeriod: Yup.number()
  //   .positive()
  //   .integer()
  //   .required("Please Enter the Collection period")
  //   ,

  // InterestAmount: Yup.number()
  //   .positive()
  //   .integer()
  //   .lessThan(Yup.ref("GivenAmount"))
  //   .required("Please Enter the amount to give"),

  // InterestPercentage: Yup.number()
  //   .positive("Profit percentage must be a number")
  //   // .integer("Profit percentage must be a integer")
  //   .test(
  //     "is-percentage",
  //     "profit percentage must be between 0 and 100",
  //     (value) => value >= 0 && value <= 100
  //   ),
  // TotalAmount: Yup.number()
  //   .positive()
  //   .integer()
  //   .moreThan(Yup.ref("GivenAmount"))
  //   .required("Please enter the total amount "),

  //   CollectionAmount: Yup.number()
  //   .positive()
  //   // .integer()
  //   .required("Please Enter the amount"),

  Photo: Yup.mixed()
    // .test(
    //   "fileType",
    //   "Invalid file type, only JPG and PNG are allowed",
      // (value) => {
      //   if (!value) return true; // allow empty values
      //   const supportedFormats = ["image/jpeg", "image/png"];
      //   return supportedFormats.includes(value.type);
      // }
    // )
    // .test(
    //   "fileSize",
    //   "Image size is too large, maximum size is 5MB",
    //   (value) => {
    //     if (!value) return true; // allow empty values
    //     const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
    //     return value.size <= maxFileSize;
    //   }
    // )
    ,
  IdProof: Yup.mixed()
    // .test(
    //   "fileType",
    //   "Invalid file type, only JPG and PDF are allowed",
      // (value) => {
      //   if (!value) return true; // allow empty values
      //   const supportedFormats = ["image/jpeg", "application/pdf"];
      //   return supportedFormats.includes(value.type);
      // }
    // )
    // .test(
    //   "fileSize",
    //   // "Image size is too large, maximum size is 2MB",
    //   (value) => {
    //     if (!value) return true; // allow empty values
    //     const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
    //     return value.size <= maxFileSize;
    //   }
    // )
    // .required("Please upload an ID proof image"),

  //   collectionDate: Yup.date()
  // .typeError("Please enter a valid date")
  // .required("Please enter a collection date")
  // ,

  // collectionEndDate: Yup.date()
  // .typeError("Please enter a valid date")
  // .required("Please enter a collection date"),
});

// const initialValues = {
//   Name: data.Nam,
//   MobileNo: "",
//   Address: "",
//   GivenAmount: "",
//   TotalAmount: "",
//   InterestAmount: "",
//   InterestPercentage: "",
//   // profitPercentage: "",
//   CollectionAmount: "",
//   IdProof: "",
//   Photo: "",
//   collectionDate: new Date(),
//   collectionPeriod: 2,
//   collectionEndDate: addWeeks(new Date(), 2),
// };





const Account = () =>{
  const[data,setData] = useState([])
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [photoPreview, setPhotoPreview] = useState();
  const [idPreview, setidPreview] = useState(); // add state to preview uploaded photo
  const [Date, setDate] = useState(); // add state to  collection date
  const [endDate, setEndDate] = useState(); // add state to  collection date

  const initialValues = {
    Name: data.Name,
    MobileNo: data.MobileNo,
    Address: data.Address,
    GivenAmount: data.GivenAmount,
    TotalAmount: data.TotalAmount,
    InterestAmount: data.InterestAmount,
    InterestPercentage: data.InterestPercentage,
    // profitPercentage: "",
    CollectionAmount: data.CollectionAmount,
    // IdProof: `https://api.cloudinary.com/v1_1/dqsdim3vv/image/upload/IdProof`,
    IdProof:data.IdProof,
    Photo:data.Photo,
    collectionDate: moment(data.collectionDate).format("YYYY-MM-DD"),
    collectionPeriod: 2,
    collectionEndDate: moment(data.collectionEndDate).format("YYYY-MM-DD")
  };
  let { customerId } = useParams()

  console.log(customerId,"dfsagdasgfd");
  const { ALLUSERS } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  console.log(initialValues.IdProof,"its user");



  useEffect(() => {
    if (ALLUSERS.length === 0) {

     dispatch(allUsers())

    } else {

      setData(ALLUSERS.find(o => o._id === customerId));
    }

  }, [ALLUSERS]);
  



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (user_id) => {
    console.log(user_id,"useriiiidd");
    setIsModalOpen(true);
  };
  // const handleOk = (values) => {
    
  //   setIsModalOpen(false);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  
const userId=data._id;

  const handleFormSubmit = async (values) => {
    console.log(values,'is the values from the state,')
    const { Photo } = values;
    const { IdProof } = values;


    const data = new FormData();
   

    data.append("file", Photo);
    
    data.append("upload_preset", "evqnxnlb");
    data.append("cloud_name", "dqsdim3vv");
    await fetch(`https://api.cloudinary.com/v1_1/dqsdim3vv/image/upload`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data");
        values.Photo = data.url;
        
        console.log(values, "Photodeetall");
      })
      .catch((err) => {
        console.log(err);
      });

    
      const IdData = new FormData();

      IdData.append("file", IdProof);
      IdData.append("upload_preset", "evqnxnlb");
      IdData.append("cloud_name", "dqsdim3vv");
      await fetch(`https://api.cloudinary.com/v1_1/dqsdim3vv/image/upload`, {
        method: "POST",
        body: IdData,
      })
        .then((res) => res.json())
        .then((IdData) => {
          console.log(IdData, "Idddddddata");
          values.IdProof = IdData.url;
          
          console.log(values, "Photodeetaleeel");
        })
        .catch((err) => {
          console.log(err);
        });
      
      values.id=userId
      console.log("onn work ", values);
      dispatch(updateUser(values));
      setIsModalOpen(false);
  };





  const exportTableData= () => {
    console.log("expoted");
    const doc =new jsPDF({orientation:'landsacpe'})
    
  // const columns = ["Date","Phone","Amount","Remaining"];
  // const dataa = data.map((customer) => [
  //   moment(customer.date).format("DD/MM/YYYY"),
   
  //   customer.MobileNo,
  //   customer.amount,
  //   customer.TotalAmountCopy,
  // ]);

  doc.autoTable({
    html:"#my-table"
  });
    
doc.save("data.pdf")
  }


return (

    
  <>
  
    {/* <Head>
      <title>
        Account | Devias Kit
      </title>
    </Head> */}
    <Box>
    <Box 
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
 <Box display="flex" justifyContent="space-between" p={4}>
        <Typography variant="h2" color={colors.grey[100]} fontWeight="bold">
          USERS
        </Typography>
        <Box alignItems="center" direction="row" spacing={1}>
          <Button
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowUpOnSquareIcon />
              </SvgIcon>
            }
            onClick={() =>showModal(data._id)}
            
          >
            
            Edit
          </Button>



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
      </Box>

      
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            
            <Grid 
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}  
                lg={4}
              >
                <AccountProfile data={data}  id="my-table" />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountTransaction
                // customerId={customerId}
                // setData={setData}
                 data={data}/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
    <Box>
    <Grid 
              // container
              spacing={3}
            >
              
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <Transactions data={data}/>
              </Grid>
            </Grid>

    <Modal 
  title="Update User"
  visible={isModalOpen}
  onCancel={handleCancel}
  
  
  
  footer={[
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button key="submit" type="submit" form="updateForm"  onClick={handleFormSubmit}>
      Submit
    </Button>
   
  ]}
  // open={isModalOpen}

    // style={{ backgroundColor: 'black' }} // Set the background color and text color


>

<Box  m="20px">
      {/* <Header title="CREATE USER" subtitle="Add a new user" /> */}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
        userId={data._id}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}    // Set the background color and text color
          >
            
            <Box
              // display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "&> div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
              // style={{ backgroundColor: 'black' }} // Set the background color and text color
              // color={colors.grey[100]} fontWeight="bold"

            >
              <TextField
              
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Name}
                name="Name"
                error={!!touched.Name && !!errors.Name}
                helperText={touched.Name && errors.Name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mobile Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.MobileNo}
                name="MobileNo"
                error={!!touched.MobileNo && !!errors.MobileNo}
                helperText={touched.MobileNo && errors.MobileNo}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Address}
                name="Address"
                error={!!touched.Address && !!errors.Address}
                helperText={touched.Address && errors.Address}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="GivenAmount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.GivenAmount}
                name="GivenAmount"
                error={!!touched.GivenAmount && !!errors.GivenAmount}
                helperText={touched.GivenAmount && errors.GivenAmount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                name="TotalAmount"
                variant="filled"
                type="text"
                label="TotalAmount"
                onBlur={handleBlur}
                onChange={handleChange}
                // value={values.TotalAmount}
               value= {(values.TotalAmount =
                  parseInt(values.GivenAmount) + parseInt(values.InterestAmount))}
                  
                
                error={!!touched.TotalAmount && !!errors.TotalAmount}
                helperText={touched.TotalAmount && errors.TotalAmount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="InterestAmount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.InterestAmount}
                name="InterestAmount"
                error={!!touched.InterestAmount && !!errors.InterestAmount}
                helperText={touched.InterestAmount && errors.InterestAmount}
                // sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                name="InterestPercentage"
                variant="filled"
                type="percentage"
                label="Interest Percentage"
                // onBlur={handleBlur}
                value={
                  (values.InterestPercentage =
                    (values.InterestAmount * 100) / values.TotalAmount)
                }
                onChange={handleChange}
                error={
                  !!touched.InterestPercentage && !!errors.InterestPercentage
                }
                helperText={
                  touched.InterestPercentage && errors.InterestPercentage
                }
                // sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Collection Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                // Value={values.CollectionAmount}
                value={
                  (values.CollectionAmount =
                    values.TotalAmount / values.collectionPeriod)
                }
                name="CollectionAmount"
                error={!!touched.CollectionAmount && !!errors.CollectionAmount}
                helperText={touched.CollectionAmount && errors.CollectionAmount}
                sx={{ gridColumn: "span 2" }}
              />

              <Field name="collectionDate">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    name="collectionDate"
                    variant="filled"
                    type="Date"
                    label="COLLECTION STARTING DATE"
                    value={values.collectionDate}
                    onBlur={handleBlur}
                    format="YYYY-MM-DD"
                    // onChange={handleDate}
                    onChange={(event) => {
                      setFieldValue("collectionDate", event.target.value);

                      //     handleDateChange(
                      //       {...values,collectionDate:moment(event.target.value).format("yyyy,MM,dd")},
                      //       setFieldValue
                      //       );
                      setDate(event.target.value);
                    }}
                    error={!!touched.collectionDate && !!errors.collectionDate}
                    helperText={touched.collectionDate && errors.collectionDate}
                    //  sx={{ gridColumn: "span 2" }}
                  />
                )}
              </Field>

              {/* <Field name="collectionDate">
    {({ field, form }) => (
      <TextField
        {...field}
        fullWidth
        name="collectionDate"
        variant="filled"
        type="date"
        label="COLLECTION STARTING DATE"
        value={Date}
        onBlur={field.onBlur}
        onChange={(event) => {
          const formattedDate = moment(event.target.value).format("yyyy-MM-DD");
          console.log(formattedDate,"formattedDate");
          form.setFieldValue("collectionDate", formattedDate);
          console.log(typeof formattedDate,"formtated date");
  
          handleDateChange(
            {...form.values, collectionDate: formattedDate},
            form.setFieldValue
          );
          setDate(event.target.value);
        }}
        error={form.touched.collectionDate && !!form.errors.collectionDate}
        helperText={form.touched.collectionDate && form.errors.collectionDate}
      />
    )}
  </Field> */}

              <Field name="CollectionPeriod">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="filled"
                    type="text"
                    label="CollectionPeriod"
                    onBlur={handleBlur}
                    // onChange={handleChange}

                    value={values.collectionPeriod}
                    name="collectionPeriod"
                    // error={!!touched.Period && !!errors.Period}
                    // helperText={touched.Period && errors.Period}
                    // sx={{ gridColumn: "span 1" }}
                    onChange={(event) => {
                      setFieldValue("collectionPeriod", event.target.value);
                      // handleDateChange(
                      //   { ...values, collectionPeriod: event.target.value },
                      //   setFieldValue
                      // );
                    }}
                  />
                )}
              </Field>

              <Field name="collectionEndDate">
                {({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    name="collectionEndDate"
                    variant="filled"
                    type="date"
                    label="Collection End Date"
                    value={values.collectionEndDate}
                    onBlur={handleBlur}
                    //   onChange={field.onChange}
                    onChange={(event) => {
                      setFieldValue("collectionEndDate", event.target.value);
                      // handleDateChange(
                      //   { ...values, collectionPeriod: event.target.value },
                      //   setFieldValue
                      // );

                      //   const adWeeks=addWeeks((values.collectionDate,values.CollectionPeriod))

                      setEndDate(event.target.value);
                    }}
                    error={
                      !!touched.collectionEndDate && !!errors.collectionEndDate
                    }
                    helperText={
                      touched.collectionEndDate && errors.collectionEndDate
                    }
                    //  sx={{ gridColumn: "span 2" }}
                  />
                )}
              </Field>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                {photoPreview? (
                  <Box
                    component="img"
                    src={photoPreview}
                    sx={{ width: 100, height: 100 }}
                  />
                ) 
                : (
                  <Box
                    component="img"
                    src={data.Photo}
                    sx={{ width: 100, height: 100 }}
                  />
                )
                }

                <Button variant="contained" component="label" sx={{ mb: 1 }}>
                  Upload Photo
                  <TextField
                    name="Photo"
                    type="file"
                    value={values.photoPreview}
                    onChange={(event) => {
                      console.log(event.currentTarget.files[0]); // check if this is being logged
                      setFieldValue("Photo", event.currentTarget.files[0]);

                      const file = event.target.files[0];

                      if (!file) return;

                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setPhotoPreview(reader.result);
                      };
                    }}
                    inputProps={{ accept: "image/jpeg,image/png" }}
                    helperText={touched.Photo && errors.Photo}
                    error={touched.Photo && Boolean(errors.Photo)}
                  />
                </Button>
                {touched.Photo && errors.Photo && (
                  <Box sx={{ color: "red" }}>{errors.Photo}</Box>
                )}
              </Box>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                {idPreview ? (
                  <Box
                    component="img"
                    src={idPreview}
                    sx={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={data.IdProof}
                    sx={{ width: 100, height: 100 }}
                  />
                )}

                <Button variant="contained" component="label" sx={{ mb: 1 }}>
                  Upload Photo
                  <TextField
                    name="IdProof"
                    type="file"
                    value={values.idPreview}
                    onChange={(event) => {
                      console.log(event.currentTarget.files[0]); // check if this is being logged
                      setFieldValue("IdProof", event.currentTarget.files[0]);

                      const file = event.target.files[0];

                      if (!file) return;

                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setidPreview(reader.result);
                      };
                    }}
                    inputProps={{ accept: "image/jpeg,image/png" }}
                    helperText={touched.IdProof && errors.IdProof}
                    error={touched.IdProof && Boolean(errors.IdProof)}
                  />
                </Button>
                {touched.IdProof && errors.IdProof && (
                  <Box sx={{ color: "red" }}>{errors.IdProof}</Box>
                )}
              </Box>
            </Box>

            <Box display="flex" justifyContent="end" mt="20px">
              {/* <Button type="submit"  color="secondary" varient="contained">
                submit
              </Button> */}
            </Box>
          </form>
        )}
      </Formik>
    </Box>
 

 
</Modal>
    </Box>
    </Box>
  </>
);


    }

    

// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Account;
