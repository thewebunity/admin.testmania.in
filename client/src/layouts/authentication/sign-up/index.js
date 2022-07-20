/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// react
import { useState } from "react";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react router
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import { DatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

// Custom components
import Notification from "examples/Notification";

// Hooks
import useFormInput from "hooks/form-input";

// Store
import { register } from "../../../store/auth-slice";
import { notificationActions } from "store/notification-slice";

function Cover() {
  const {
    value: name,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    resetinput: resetname,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: phone,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    hasError: phoneHasError,
    resetinput: resetphone,
  } = useFormInput((value) => value.trim() !== "" && value.length === 10);

  const {
    value: email,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    resetinput: resetemail,
  } = useFormInput(
    (value) => value.trim() !== "" && value.trim().includes("@")
  );

  const {
    value: password,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    resetinput: resetpassword,
  } = useFormInput((value) => value.trim() !== "" && value.trim().length >= 8);

  const [male, setMale] = useState(true);
  const handleMaleChange = (e) => {
    setFemale(male);
    setMale(!male);
  };

  const [female, setFemale] = useState(false);
  const handleFemaleChange = (e) => {
    setMale(female);
    setFemale(!female);
  };

  const [dob, setDob] = useState(null);
  const handleDobChange = (val) => {
    setDob(() => val);
  };

  const resetForm = () => {
    resetname();
    resetemail();
    resetpassword();
    resetphone();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificationSlice = useSelector((state) => state.notification);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(name, email, password);

    if (nameHasError || emailHasError || passwordHasError || phoneHasError) {
      return;
    }

    const res = await dispatch(
      register({
        name,
        email,
        password,
        phone,
        gender: male ? "MALE" : "FEMALE",
        dob,
      })
    );

    if (res === true) {
      navigate("/");
    }else{
alert('Email already Existe !')    }
  
  };

  return (
    <CoverLayout image={bgImage}>
      <>
        {notificationSlice.open && (
          <Notification
            color={`${notificationSlice.color}`}
            text={notificationSlice.message}
            onClose={() => dispatch(notificationActions.closeOpen())}
            open={notificationSlice.open}
          />
        )}
      </>

      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <form onSubmit={formSubmitHandler}>
              <MDBox mb={2}>
                <MDInput
                  required
                  type="text"
                  htmlFor="name"
                  label="Name"
                  variant="standard"
                  value={name}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  fullWidth
                />
                {nameHasError && (
                  <MDTypography variant="caption" color="error">
                    Name is required!
                  </MDTypography>
                )}
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  required
                  type="email"
                  label="Email"
                  htmlFor="email"
                  variant="standard"
                  value={email}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  fullWidth
                />
                {emailHasError && (
                  <MDTypography variant="caption" color="error">
                    Enter valid email address!
                  </MDTypography>
                )}
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  required
                  type="password"
                  label="Password"
                  htmlFor="password"
                  variant="standard"
                  value={password}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  fullWidth
                />
                {passwordHasError && (
                  <MDTypography variant="caption" color="error">
                    Password must be at least 8 characters long!
                  </MDTypography>
                )}
              </MDBox>

              <MDBox mb={2}>
                <MDInput
                  type="number"
                  label="Phone Number"
                  htmlFor="phone"
                  variant="standard"
                  value={phone}
                  onChange={phoneChangeHandler}
                  onBlur={phoneBlurHandler}
                  fullWidth
                />
                {phoneHasError && (
                  <MDTypography variant="caption" color="error">
                    Enter valid phone number!
                  </MDTypography>
                )}
              </MDBox>

              <Grid item xs={12} md={12} mt={4} mb={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    openTo="year"
                    views={["year", "month", "day"]}
                    label="Date of Birth"
                    mask="__-__-____"
                    inputFormat="dd-MM-yyyy"
                    value={dob}
                    onChange={handleDobChange}
                    renderInput={(params) => (
                      <TextField {...params} helperText={null} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
                  <MDBox mt={0.5}>
                    <Switch checked={male} onChange={handleMaleChange} />
                  </MDBox>
                  <MDBox width="80%" ml={0.5}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      Male
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
                  <MDBox mt={0.5}>
                    <Switch checked={female} onChange={handleFemaleChange} />
                  </MDBox>
                  <MDBox width="80%" ml={0.5}>
                    <MDTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                    >
                      Female
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Grid>

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type={`submit`}
                >
                  sign up
                </MDButton>
              </MDBox>

              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </form>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
