// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useParams } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

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

// Custom components
import Notification from "examples/Notification";

// Store
import { editStudent, getStudent } from "store/students-slice";
import { notificationActions } from "store/notification-slice";

export default function EditStudent() {
  const { id } = useParams();
  const {
    value: firstName,
    setValue: firstNameSetValue,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: lastName,
    setValue: lastNameSetValue,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: phone,
    setValue: phoneSetValue,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    hasError: phoneHasError,
  } = useFormInput(
    (value) => value && value?.toString().trim() !== "" && value.length === 10
  );

  const [male, setMale] = useState(false);
  const handleMaleChange = (e) => {
    setFemale(male);
    setMale(!male);
  };

  const [female, setFemale] = useState(false);
  const handleFemaleChange = (e) => {
    setMale(female);
    setFemale(!female);
  };

  const {
    value: email,
    setValue: emailSetValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    hasError: emailHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const studentsSlice = useSelector((state) => state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getStudent(id));

      if (data && data.student) {
        firstNameSetValue(data.student.firstName);
        lastNameSetValue(data.student.lastName);
        phoneSetValue(data.student.phone);
        emailSetValue(data.student.email);
        data.student.gender === "MALE" ? setMale(true) : setFemale(true);
      }

      setIsLoading(false);
    };

    getData();
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(
      id,
      firstName,
      lastName,
      phone,
      male ? "MALE" : "FEMALE",
      email
    );

    if (firstNameHasError || lastNameHasError || phoneHasError) {
      return;
    }

    const res = await dispatch(
      editStudent({
        id,
        firstName,
        lastName,
        phone,
        gender: male ? "MALE" : "FEMALE",
        email,
      })
    );

    if (res === true) {
      dispatch(getStudent(id));
    }
  };

  return (
    <DashboardLayout>
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
                Student Profile
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              {!isLoading &&
                (studentsSlice.student ? (
                  <form onSubmit={formSubmitHandler}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
                        <MDInput
                          required
                          type="text"
                          label="First Name"
                          htmlFor="firstName"
                          variant="standard"
                          value={firstName}
                          onChange={firstNameChangeHandler}
                          onBlur={firstNameBlurHandler}
                          fullWidth
                          error={firstNameHasError}
                          success={!firstNameHasError}
                        />
                        {firstNameHasError && (
                          <MDTypography variant="caption" color="error">
                            Please enter your first name.
                          </MDTypography>
                        )}
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <MDInput
                          required
                          type="text"
                          label="Last Name"
                          htmlFor="lastName"
                          variant="standard"
                          value={lastName}
                          onChange={lastNameChangeHandler}
                          onBlur={lastNameBlurHandler}
                          fullWidth
                          success={!lastNameHasError}
                          error={lastNameHasError}
                        />
                        {lastNameHasError && (
                          <MDTypography variant="caption" color="error">
                            Please enter your last name.
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
                            Please enter your phone number.
                          </MDTypography>
                        )}
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <MDInput
                          disabled
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
                            Please enter your email address.
                          </MDTypography>
                        )}
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <MDBox
                          display="flex"
                          alignItems="center"
                          mb={0.5}
                          ml={-1.5}
                        >
                          <MDBox mt={0.5}>
                            <Switch
                              checked={male}
                              onChange={handleMaleChange}
                            />
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
                          Save Changes
                        </MDButton>
                      </Grid>
                    </Grid>
                  </form>
                ) : (
                  <MDTypography variant="caption">
                    Student not found! Please try again.
                  </MDTypography>
                ))}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
