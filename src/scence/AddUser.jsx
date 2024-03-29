import React from "react";
import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { addWeeks } from "@progress/kendo-date-math";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/Actions/userAction";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;
const userSchema = Yup.object().shape({
  Name: Yup.string()
    .min(3)
    .max(50)
    .required("Please enter your name"),
  MobileNo: Yup.string()
    .min(10)
    .max(10)
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Mobile number is must be 10 digits"),
  Address: Yup.string().required(),
  GivenAmount: Yup.number()
    .positive()
    .integer()
    .required("Please Enter the amount to give"),

  //   collectionPeriod: Yup.number()
  //   .positive()
  //   .integer()
  //   .required("Please Enter the Collection period")
  //   ,
  InterestAmount: Yup.number()
    .positive()
    .integer()
    .lessThan(Yup.ref("GivenAmount"))
    .required("Please Enter the amount to give"),

  // InterestPercentage: Yup.number()
    // .positive("Profit percentage must be a number")
    // .integer("Profit percentage must be a integer")
    // .test(
      // "is-percentage",
      // "profit percentage must be between 0 and 100",
      // (value) => value >= 0 && value <= 100
    // ),
  TotalAmount: Yup.number()
    .positive()
    .integer()
    .moreThan(Yup.ref("GivenAmount"))
    .required("Please enter the total amount "),

    CollectionAmount: Yup.number()
    .positive()
    // .integer()
    .required("Please Enter the amount"),

  Photo: Yup.mixed()
    .test(
      "fileType",
      "Invalid file type, only JPG and PNG are allowed",
      (value) => {
        if (!value) return true; // allow empty values
        const supportedFormats = ["image/jpeg", "image/png"];
        return supportedFormats.includes(value.type);
      }
    )
    .test(
      "fileSize",
      "Image size is too large, maximum size is 5MB",
      (value) => {
        if (!value) return true; // allow empty values
        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
        return value.size <= maxFileSize;
      }
    )
    ,
  IdProof: Yup.mixed()
    .test(
      "fileType",
      "Invalid file type, only JPG and PDF are allowed",
      (value) => {
        if (!value) return true; // allow empty values
        const supportedFormats = ["image/jpeg", "application/pdf"];
        return supportedFormats.includes(value.type);
      }
    )
    .test(
      "fileSize",
      "Image size is too large, maximum size is 2MB",
      (value) => {
        if (!value) return true; // allow empty values
        const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes
        return value.size <= maxFileSize;
      }
    ),
    collectionDate: Yup.date()
  .typeError("Please enter a valid date")
  .required("Please enter a collection date")
  ,

  collectionEndDate: Yup.date()
  .typeError("Please enter a valid date")
  .required("Please enter a collection date"),
});

const initialValues = {
  Name: "",
  MobileNo: "",
  Address: "",
  GivenAmount: "",
  TotalAmount: "",
  InterestAmount: "",
  InterestPercentage: "",
  // profitPercentage: "",
  CollectionAmount: "",
  IdProof: "",
  Photo: "",
  collectionDate: new Date(),
  collectionPeriod: 2,
  collectionEndDate: addWeeks(new Date(), 2),
};

function AddUser() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [photoPreview, setPhotoPreview] = useState();
  const [idPreview, setidPreview] = useState(); // add state to preview uploaded photo
  const [Date, setDate] = useState(); // add state to  collection date
  const [endDate, setEndDate] = useState(); // add state to  collection date
  

  const dispatch = useDispatch();

  const handleFormSubmit = async (values) => {
    const { Photo } = values;
    const { IdProof } = values;
    const data = new FormData();
    data.append("file", Photo);
      data.append("upload_preset", "pxsh0zzx");
    data.append("cloud_name", "dtx0rkh3i");
    await fetch(`https://api.cloudinary.com/v1_1/dtx0rkh3i/image/upload`,{
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        values.Photo = data.url;
      })
      .catch((err) => {
        console.log(err);
      });

      const IdData = new FormData();

      IdData.append("file", IdProof);
        IdData.append("upload_preset", "pxsh0zzx");
        IdData.append("cloud_name", "dtx0rkh3i");
    await fetch(`https://api.cloudinary.com/v1_1/dtx0rkh3i/image/upload`,{
        method: "POST",
        body: IdData,
      })
        .then((res) => res.json())
        .then((IdData) => {
          values.IdProof = IdData.url;
        })
        .catch((err) => {
          console.log(err);
        });

      dispatch(addUser(values));
  };

 
  return (
    <Box m="20px">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
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
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4,minmax(0,1fr))"
              sx={{
                "&> div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
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
                value={
                  (values.TotalAmount =
                    Number(values.GivenAmount) + Number(values.InterestAmount))
                }
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
              />
              <TextField
                fullWidth
                name="InterestPercentage"
                variant="filled"
                type="percentage"
                label="Interest Percentage"
                onBlur={handleBlur}
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
                    value={Date}
                    onBlur={handleBlur}
                    format="yyyy,MM,dd"
                    // onChange={handleDate}
                    onChange={(event) => {
                      setFieldValue("collectionDate", event.target.value);
                      setDate(event.target.value);
                    }}
                    error={!!touched.collectionDate && !!errors.collectionDate}
                    helperText={touched.collectionDate && errors.collectionDate}
                    //  sx={{ gridColumn: "span 2" }}
                  />
                )}
              </Field>
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
                    value={endDate}
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
                  />
                )}
              </Field>

              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
              >
                {photoPreview ? (
                  <Box
                    component="img"
                    src={photoPreview}
                    sx={{ width: 100, height: 100 }}
                  />
                ) : (
                  <Box
                    component="img"
                    sx={{ width: 100, height: 100 }}
                  />
                )}

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
           
                      
              <Button type="submit" color="secondary" varient="contained">
                submit
              </Button>
                         
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default AddUser;
