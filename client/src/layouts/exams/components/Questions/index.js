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
// react router
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// icons
import AddIcon from "@mui/icons-material/Add";

// other pages
import Question from "../Question";

function Questions(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Card id="delete-account">
      <MDBox
        pt={3}
        px={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <MDTypography variant="h4" fontWeight="medium">
          Questions
        </MDTypography>
        <MDButton
          variant="gradient"
          color="info"
          onClick={() => navigate(`/exams/add-question/${id}`)}
        >
          <AddIcon />
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            ml={2}
            color="white"
          >
            Add Question
          </MDTypography>
        </MDButton>
      </MDBox>
      {props.questions ? (
        <MDBox pt={1} pb={2} px={2}>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            {props.questions.map((q) => {
              return (
                <Question
                  key={q._id}
                  questionId={q._id}
                  description={q.description}
                  imageUrl={q.imageUrl}
                  question={q.question}
                  answer={q.answer}
                  options={q.options}
                />
              );
            })}
          </MDBox>
        </MDBox>
      ) : (
        <MDBox pt={4} pb={3} px={3}>
          <MDTypography variant="subtitle2" color="text" display="inline-block">
            No questions yet.
          </MDTypography>
        </MDBox>
      )}
    </Card>
  );
}

export default Questions;
