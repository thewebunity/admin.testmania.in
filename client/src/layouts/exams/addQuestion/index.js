// react-router-dom components
import { useNavigate, useParams } from "react-router-dom";

// react
import { useState } from "react";

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
import { addQuestion } from "store/exams-slice";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// components
import RadioGroup from "components/RadioGroup";

export default function AddQuestion() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState(null);

  const {
    value: question,
    inputChangeHandler: questionChangeHandler,
    inputBlurHandler: questionBlurHandler,
    hasError: questionHasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: description,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option1,
    inputChangeHandler: option1ChangeHandler,
    inputBlurHandler: option1BlurHandler,
    hasError: option1HasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option2,
    inputChangeHandler: option2ChangeHandler,
    inputBlurHandler: option2BlurHandler,
    hasError: option2HasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option3,
    inputChangeHandler: option3ChangeHandler,
    inputBlurHandler: option3BlurHandler,
    hasError: option3HasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option4,
    inputChangeHandler: option4ChangeHandler,
    inputBlurHandler: option4BlurHandler,
    hasError: option4HasError,
  } = useFormInput((value) => value.trim() !== "");

  const navigate = useNavigate();

  const [image, setImage] = useState("");

  const upload = () => {
    return new Promise(function (resolve, reject) {
      const storage = getStorage();
      if (image == null) return;

      const imageRef = ref(
        storage,
        `exams/${id}/questions/${Math.floor(
          100000 + Math.random() * 900000
        ).toString()}`
      );
      const uploadTask = uploadBytes(imageRef, image);

      uploadTask.then(async function (snapshot) {
        console.log(`Uploaded image :========> ${JSON.stringify(snapshot)}`);
        const url = await getDownloadURL(snapshot.ref);
        resolve(url);
      });
    });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const options = [option1, option2, option3, option4];
    let url;
    if (image) {
      url = await upload();
      console.log(`Uploaded image :========> ${JSON.stringify(url)}`);

      if (!url) {
        alert("Image upload failed");
        return;
      }
    }
    
    if (answer==null) {
      alert("Correct answer is Required");

      return;
    }
    const res = await dispatch(
      addQuestion({
        id,
        question,
        description,
        options,
        imageUrl: url || "",
        answer: options[answer - 1],
      })
    );

    if (res === true) {
      navigate("/exams/edit/" + id);
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
              bgColor="dark"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={1}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h5"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Add Question
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <form onSubmit={formSubmitHandler}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={12}>
                    <MDInput
                      required
                      autoFocus
                      type="text"
                      label="Question"
                      htmlFor="question"
                      variant="standard"
                      value={question}
                      onChange={questionChangeHandler}
                      onBlur={questionBlurHandler}
                      fullWidth
                      error={questionHasError}
                      success={!questionHasError}
                    />
                    {questionHasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid question.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDInput
                      type="text"
                      label="Description"
                      htmlFor="description"
                      variant="standard"
                      value={description}
                      onChange={descriptionChangeHandler}
                      onBlur={descriptionBlurHandler}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDInput
                      required
                      type="text"
                      label="Option 1"
                      htmlFor="option1"
                      variant="standard"
                      value={option1}
                      onChange={option1ChangeHandler}
                      onBlur={option1BlurHandler}
                      fullWidth
                      error={option1HasError}
                      success={!option1HasError}
                    />
                    {option1HasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid option1.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDInput
                      required
                      type="text"
                      label="Option 2"
                      htmlFor="option2"
                      variant="standard"
                      value={option2}
                      onChange={option2ChangeHandler}
                      onBlur={option2BlurHandler}
                      fullWidth
                      error={option2HasError}
                      success={!option2HasError}
                    />
                    {option2HasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid option2.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDInput
                      required
                      type="text"
                      label="Option 3"
                      htmlFor="option3"
                      variant="standard"
                      value={option3}
                      onChange={option3ChangeHandler}
                      onBlur={option3BlurHandler}
                      fullWidth
                      error={option3HasError}
                      success={!option3HasError}
                    />
                    {option3HasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid option3.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDInput
                      required
                      type="text"
                      label="Option 4"
                      htmlFor="option4"
                      variant="standard"
                      value={option4}
                      onChange={option4ChangeHandler}
                      onBlur={option4BlurHandler}
                      fullWidth
                      error={option4HasError}
                      success={!option4HasError}
                    />
                    {option4HasError && (
                      <MDTypography variant="caption" color="error">
                        Please enter a valid option4.
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <RadioGroup onChange={(val) => setAnswer(val)} />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <input
                      type="file"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <MDButton
                      variant="gradient"
                      color="primary"
                      type="submit"
                      fullWidth
                    >
                      Add Question
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
