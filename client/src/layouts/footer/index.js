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
import { editFooter , getFooter } from "store/footer-slice";


export default function EditFooter() {
 
  const {
    value: address,
    setValue: addressSetValue,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: phone,
    setValue: phoneSetValue,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: email,
    setValue: emailSetValue,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: fb,
    setValue: fbSetValue,
    inputChangeHandler: fbChangeHandler,
    inputBlurHandler: fbBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: inst,
    setValue: instSetValue,
    inputChangeHandler: instChangeHandler,
    inputBlurHandler: instBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: twiter,
    setValue: twiterSetValue,
    inputChangeHandler: twiterChangeHandler,
    inputBlurHandler: twiterBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: linkedin,
    setValue: linkedinSetValue,
    inputChangeHandler: linkedinChangeHandler,
    inputBlurHandler: linkedinBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: google,
    setValue: googleSetValue,
    inputChangeHandler: googleChangeHandler,
    inputBlurHandler: googleBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");

  const {
    value: youtube,
    setValue: youtubeSetValue,
    inputChangeHandler: youtubeChangeHandler,
    inputBlurHandler: youtubeBlurHandler,
  } = useFormInput((value) => value && value?.toString().trim() !== "");










  const dispatch = useDispatch();

  const footersSlice = useSelector((state) =>  state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getFooter());

      if (data && data.footer) {
        addressSetValue(data.footer.address);
        phoneSetValue(data.footer.phone);
        emailSetValue(data.footer.email);
        fbSetValue(data.footer.fb);
        instSetValue(data.footer.inst);
        twiterSetValue(data.footer.twiter);
        linkedinSetValue(data.footer.linkedin);
        youtubeSetValue(data.footer.youtube);
        googleSetValue(data.footer.google);
     
      }

      setIsLoading(false);
    };

    getData();
  }, []);



  const navigate = useNavigate();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
   


    const res = await dispatch(
      editFooter({
        
        address,
       phone,email,fb,inst,twiter,google,linkedin,youtube
      })
    );

    if (res === true) {
      navigate("/");
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
                Footer
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              {!isLoading &&
                (footersSlice.students ? (
                  <form onSubmit={formSubmitHandler}>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={6}>
                      <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                      <label className="control-label">Address</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={address}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler} />
                   
                    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">Phone</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={phone}
          onChange={phoneChangeHandler}
          onBlur={phoneBlurHandler} />
             
          
    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">Email</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler} />
             
          
    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">Facebook Link</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={fb}
          onChange={fbChangeHandler}
          onBlur={fbBlurHandler} />
             
          
    
                      </Grid>

                      <Grid item xs={50} md={25}>
                      <label className="control-label">Instagram Link</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={inst}
          onChange={instChangeHandler}
          onBlur={instBlurHandler} />
             
          
    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">Linkedin Link</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={linkedin}
          onChange={linkedinChangeHandler}
          onBlur={linkedinBlurHandler} />
             
          
    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">Google + Link</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={google}
          onChange={googleChangeHandler}
          onBlur={googleBlurHandler} />
             
          
    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">youtube Link</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={youtube}
          onChange={youtubeChangeHandler}
          onBlur={youtubeBlurHandler} />
             
          
    
                      </Grid>
                      <Grid item xs={50} md={25}>
                      <label className="control-label">Twiter Link</label>
        <input className="form-control" id="msg_subject" type="text" name="subject"  value={twiter}
          onChange={twiterChangeHandler}
          onBlur={twiterBlurHandler} />
             
          
    
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
                    Footer not found! Please try again.
                  </MDTypography>
                ))}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
