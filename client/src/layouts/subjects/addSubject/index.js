// react-router-dom components
import { useNavigate } from "react-router-dom";

// react redux
import { useDispatch } from "react-redux";

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

// Store
import { addSubject } from "store/subjects-slice";

export default function AddSubject() {
  const {
    value: name,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
    resetinput: resetname,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: description,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    hasError: descriptionHasError,
    resetinput: resetdescription,
  } = useFormInput((value) => value.trim() !== "");
  const resetForm = () => {
    resetname();
    resetdescription();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(name, description);

    const res = await dispatch(
      addSubject({
        name,
        description,
      })
    );

    if (res === true) {
      resetForm();
      navigate("/subjects");
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
                Add Subject
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
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
                        Please enter subject title.
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
                        Please enter description.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDBox
                      justifyContent="flex-end"
                      display="flex"
                      my={4}
                      mr={1}
                    >
                      <MDButton variant="gradient" color="dark" type="submit">
                        Add Subject
                      </MDButton>
                    </MDBox>
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
