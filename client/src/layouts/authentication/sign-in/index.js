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
import { Link, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";
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
import { login } from "store/auth-slice";
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

  const {
    value: password,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    resetinput: resetpassword,
  } = useFormInput((value) => value.trim() !== "" && value.trim().length >= 8);

  const resetForm = () => {
    resetemail();
    resetpassword();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationSlice = useSelector((state) => state.notification);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(email, password);

    const res = await dispatch(
      login({
        email,
        password,
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
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <form onSubmit={formSubmitHandler}>
              <MDBox mb={2}>
                <MDInput
                  required
                  autoComplete="email"
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

              <MDBox mt={4} mb={1}>
                <MDButton
                  variant="gradient"
                  color="info"
                  fullWidth
                  type="submit"
                >
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/sign-up"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign up
                  </MDTypography>
                </MDTypography>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  <MDTypography
                    component={Link}
                    to="/forgot-password"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Forgot Password
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </form>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
