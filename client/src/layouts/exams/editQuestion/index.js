// react
import { useState, useEffect } from "react";

// react-router-dom components
import { useParams, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";

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
import RadioGroup from "components/RadioGroup";

// Store
import { getQuestion, editQuestion } from "store/exams-slice";
import { notificationActions } from "store/notification-slice";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditQuestion() {
  const { id, questionId } = useParams();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState(null);

  const notificationSlice = useSelector((state) => state.notification);

  const {
    value: question,
    setValue: questionSetValue,
    inputChangeHandler: questionChangeHandler,
    inputBlurHandler: questionBlurHandler,
    hasError: questionHasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: description,
    setValue: descriptionSetValue,
    inputChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    hasError: descriptionHasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option1,
    setValue: option1SetValue,
    inputChangeHandler: option1ChangeHandler,
    inputBlurHandler: option1BlurHandler,
    hasError: option1HasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option2,
    setValue: option2SetValue,
    inputChangeHandler: option2ChangeHandler,
    inputBlurHandler: option2BlurHandler,
    hasError: option2HasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option3,
    setValue: option3SetValue,
    inputChangeHandler: option3ChangeHandler,
    inputBlurHandler: option3BlurHandler,
    hasError: option3HasError,
  } = useFormInput((value) => value.trim() !== "");

  const {
    value: option4,
    setValue: option4SetValue,
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

      const imageRef = ref(storage, imageUrl);

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
    const res = await dispatch(
      editQuestion({
        id,
        questionId,
        question,
        description,
        imageUrl: url || imageUrl,
        options,
        answer: options[answer - 1],
      })
    );

    if (res === true) {
      navigate("/exams/edit/" + id);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [defaultAnswer, setDefaultAnswer] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getQuestion(id, questionId));

      if (data && data.question) {
        setAnswer(data.question.answer);
        questionSetValue(data.question.question);
        descriptionSetValue(data.question.description);
        option1SetValue(data.question.options[0]);
        option2SetValue(data.question.options[1]);
        option3SetValue(data.question.options[2]);
        option4SetValue(data.question.options[3]);
        const temp = data.question.options.indexOf(data.question.answer);
        setDefaultAnswer(temp);
        if (data.question.imageUrl) {
          setImageUrl(data.question.imageUrl);
        }
      }

      setIsLoading(false);
    };

    getData();
  }, []);

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
      <Grid pt={10} pb={3} container spacing={2}>
        <Grid item xs={12} md={12}>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="dark"
              borderRadius="lg"
              coloredShadow="info"
              mx={4}
              mt={-3}
              p={1}
              mb={1}
              textAlign="center"
            >
              <MDTypography
                variant="h4"
                fontWeight="medium"
                color="white"
                mt={1}
              >
                Edit Question
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              {isLoading && (
                <MDBox display="flex" justifyContent="center" p={4}>
                  <CircularProgress />
                </MDBox>
              )}
              {!isLoading && (
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
                        error={descriptionHasError}
                        success={!descriptionHasError}
                      />
                      {descriptionHasError && (
                        <MDTypography variant="caption" color="error">
                          Please enter a valid description.
                        </MDTypography>
                      )}
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
                      <RadioGroup
                        onChange={(val) => setAnswer(val)}
                        answer={defaultAnswer}
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      {imageUrl && (
                        <>
                          <img src={imageUrl} alt="question" width="100%" />
                        </>
                      )}

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
                        Save Changes
                      </MDButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </MDBox>
          </Card>
        </Grid>
        {isLoading && (
          <MDBox display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </MDBox>
        )}
      </Grid>
    </DashboardLayout>
  );
}
