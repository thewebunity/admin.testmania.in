// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useParams, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

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
import { editSubject, getSubject } from "store/subjects-slice";
import { notificationActions } from "store/notification-slice";

export default function EditSubject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    value: name,
    setValue: nameSetValue,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: description,
    setValue: descriptionSetValue,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    hasError: descriptionHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const subjectsSlice = useSelector((state) => state.subjects);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getSubject(id));

      if (data && data.subject) {
        nameSetValue(data.subject.name);
        descriptionSetValue(data.subject.description);
      }

      setIsLoading(false);
    };

    getData();
  }, []);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(id, name, description);

    const res = await dispatch(
      editSubject({
        id,
        name,
        description,
      })
    );

    if (res === true) {
      navigate("/subjects");
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
      <MDBox pt={10} pb={3} px={4}>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
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
                  Edit Subject
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                {!isLoading &&
                  (subjectsSlice.subject ? (
                    <form onSubmit={formSubmitHandler}>
                      <Grid container spacing={5}>
                        <Grid item xs={12} md={6}>
                          <MDInput
                            required
                            autoFocus
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
                              Please enter subject name.
                            </MDTypography>
                          )}
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <MDInput
                            type="text"
                            label="Description"
                            htmlFor="description"
                            variant="standard"
                            value={description}
                            onChange={descriptionChangeHandler}
                            onBlur={descriptionBlurHandler}
                            fullWidth
                            success={!descriptionHasError}
                            error={descriptionHasError}
                          />
                          {descriptionHasError && (
                            <MDTypography variant="caption" color="error">
                              Please enter your last name.
                            </MDTypography>
                          )}
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
                      Subject not found! Please try again.
                    </MDTypography>
                  ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
