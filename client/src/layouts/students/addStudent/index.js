// react
import { useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// react redux
import { useDispatch } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Hooks
import useFormInput from "hooks/form-input";

// Store
import { addStudent } from "store/students-slice";

export default function AddStudent() {
  const {
    value: name,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    resetinput: resetname,
  } = useFormInput((value) => value.trim() !== "");
  const {
    value: school,
    inputChangeHandler: schoolChangeHandler,
    inputBlurHandler: schoolBlurHandler,
    hasError: schoolHasError,
    resetinput: resetschool,
  } = useFormInput((value) => value.trim() !== "");
  const {
    value: password,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    resetinput: resetpassword,
  } = useFormInput((value) => value.trim() !== "" && value.length >= 6);

  const {
    value: phone,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    hasError: phoneHasError,
    resetinput: resetphone,
  } = useFormInput((value) => value.trim() !== "" && value.length === 10);

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

  const [dob, setDob] = useState(new Date());
  const handleDobChange = (val) => {
    setDob(() => val);
  };

  const {
    value: email,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
    resetinput: resetemail,
  } = useFormInput((value) => value.trim() !== "");

  const resetForm = () => {
    resetname();
    resetphone();
    resetemail();
    resetpassword();
    resetschool();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(name, phone, male ? "MALE" : "FEMALE", email, dob);

    if (nameHasError || emailHasError || phoneHasError || passwordHasError || schoolHasError) {
      return;
    }

    const res = await dispatch(
      addStudent({
        name,
        phone,
        password,
        gender: male ? "MALE" : "FEMALE",
        email,
        school,
        dob,
      })
    );

    if (res === true) {
      resetForm();
      navigate("/students");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={10} pb={3}>
        <Grid>
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
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Add Student
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form onSubmit={formSubmitHandler}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                    <MDInput
                      required
                      type="text"
                      label="Name"
                      htmlFor="name"
                      variant="standard"
                      value={name}
                      onChange={nameChangeHandler}
                      onBlur={nameBlurHandler}
                      fullWidth
                      error={nameHasError}
                      success={!nameHasError}
                    />
                    {nameHasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid name.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
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
                      error={passwordHasError}
                      success={!passwordHasError}
                    />
                    {passwordHasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid password.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <MDInput
                      required
                      type="number"
                      label="Phone"
                      htmlFor="phone"
                      variant="standard"
                      value={phone}
                      onChange={phoneChangeHandler}
                      onBlur={phoneBlurHandler}
                      fullWidth
                      success={!phoneHasError}
                      error={phoneHasError}
                    />
                    {phoneHasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid phone number.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
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
                      success={!emailHasError}
                      error={emailHasError}
                    />
                    {emailHasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter valid email address.
                      </MDTypography>
                    )}
                  </Grid>
             

<Grid item xs={12} md={6}>
                    <MDInput
                      required
                      type="text"
                      label="School"
                      htmlFor="school"
                      variant="standard"
                      value={school}
                      onChange={schoolChangeHandler}
                      onBlur={schoolBlurHandler}
                      fullWidth
                      error={schoolHasError}
                      success={!schoolHasError}
                    />
                    {schoolHasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid school.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={6} md={6}>
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
                    <MDBox
                      display="flex"
                      alignItems="center"
                      mb={0.5}
                      ml={-1.5}
                    >
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
                    <MDBox
                      display="flex"
                      alignItems="center"
                      mb={0.5}
                      ml={-1.5}
                    >
                      <MDBox mt={0.5}>
                        <Switch
                          checked={female}
                          onChange={handleFemaleChange}
                        />
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

                  <Grid item xs={12} md={12}>
                    <MDButton
                      variant="gradient"
                      color="info"
                      type="submit"
                      fullWidth
                    >
                      Add Student
                    </MDButton>
                  </Grid>
                </Grid>
              </form>
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
