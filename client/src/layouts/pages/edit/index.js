// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

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



// Store
import { editPage, getPage } from "store/page-slice";


export default function EditPage() {
  const { id } = useParams();
  const {
    value: name,
    setValue: nameSetValue,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    hasError: nameHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: html,
    setValue: htmlSetValue,
    inputChangeHandler: htmlChangeHandler,
    inputBlurHandler: htmlBlurHandler,
    hasError: htmlHasError,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: css,
    setValue: cssSetValue,
    inputChangeHandler: cssChangeHandler,
    inputBlurHandler: cssBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");




  const dispatch = useDispatch();

  const pagesSlice = useSelector((state) => state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getPage(id));

      if (data && data.page) {
        nameSetValue(data.page.name);
        htmlSetValue(data.page.html);
        cssSetValue(data.page.css);
     
      }

      setIsLoading(false);
    };

    getData();
  }, []);



  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();


    const res = await dispatch(
      editPage({
        id,
        name,
       html,
       css
      })
    );

    if (res === true) {
      navigate("/pages");
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
                Page
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              {!isLoading &&
                (pagesSlice.students ? (
                  <form onSubmit={formSubmitHandler}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
                      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                      <label className="control-label">Name</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler} disabled/>
                   
                    
                      </Grid>

                      <Grid item xs={50} md={25}>
                      <label htmlFor="message" className="control-label">Html</label>
        <textarea className="form-control" rows={3} id="message" name="message"  defaultValue={html}
          onChange={htmlChangeHandler}
          onBlur={htmlBlurHandler} />
    
                      </Grid>

                      
                      <Grid item xs={50} md={25}>
                      <label htmlFor="mess" className="control-label">Css</label>
        <textarea className="form-control" rows={3} id="messa" name="mess"  defaultValue={css}
          onChange={cssChangeHandler}
          onBlur={cssBlurHandler} />
    
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
                    Page not found! Please try again.
                  </MDTypography>
                ))}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
