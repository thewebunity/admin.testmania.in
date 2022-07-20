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

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Custom components
import Notification from "examples/Notification";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Hooks
import useFormInput from "hooks/form-input";

// Store
import { reset } from "store/auth-slice";
import { notificationActions } from "store/notification-slice";

function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const {
    value: email,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    resetinput: resetemail,
  } = useFormInput(
    (value) => value.trim() !== "" && value.trim().includes("@")
  );

  const resetForm = () => {
    resetemail();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationSlice = useSelector((state) => state.notification);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(email);

    const res = await dispatch(
      reset({
        email,
      })
    );

    if (res === true) {
      navigate("/");
    }
    resetForm();
  };

  return (
    <BasicLayout image={bgImage}>
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
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Forgot Password
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <form onSubmit={formSubmitHandler}>
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

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                >
                  Reset Password
                </MDButton>
              </MDBox>
            </form>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
