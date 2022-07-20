import { useState, useEffect, createRef } from "react";

// react-router-dom components
import { useParams, useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// other pages
import PageLayout from "examples/LayoutContainers/PageLayout";
import Question from "layouts/exams/components/Question";

// Store
import { getExam } from "store/students-slice";
import { notificationActions } from "store/notification-slice";

import PDF from "react-to-pdf";

export default function Reports(props) {
  const { id, examId } = useParams();

  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const studentsSlice = useSelector((state) => state.students);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getExam({ id, examId }));
      setIsLoading(false);
    };

    getData();
  }, []);

  const ref = createRef();

  return (
    <PageLayout>
      {/* Download pdf */}
      <PDF targetRef={ref} filename="results.pdf">
        {({ toPdf }) => (
          <MDBox display="flex" justifyContent="center" p={4}>
            <MDButton
              variant="contained"
              color="info"
              onClick={toPdf}
              style={{ marginTop: "1rem" }}
            >
              Download
            </MDButton>
          </MDBox>
        )}
      </PDF>
      {!isLoading && studentsSlice.exam ? (
        <MDBox pt={1} pb={2} px={2} ref={ref}>
          <MDTypography variant="h3" component="h2" gutterBottom>
            {studentsSlice.exam.title}
          </MDTypography>
          <MDBox my={2}>
            <MDTypography variant="h4" component="h2" gutterBottom>
              Score: {studentsSlice.exam.score * studentsSlice.exam.marks} /{" "}
              {studentsSlice.exam.questions.length * studentsSlice.exam.marks}
            </MDTypography>
          </MDBox>
          <MDBox my={2}>
            <MDTypography variant="h6" component="h2" gutterBottom>
              {new Date(studentsSlice.exam.startedAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </MDTypography>
          </MDBox>
          <MDBox
            component="ul"
            display="flex"
            flexDirection="column"
            p={0}
            m={0}
          >
            {studentsSlice.exam.questions.map((q, index) => {
              return (
                <Question
                  key={q._id}
                  questionId={q._id}
                  index={index}
                  description={q.description}
                  imageUrl={q.imageUrl}
                  question={q.question}
                  answer={q.answer}
                  selectedAnswer={q.selectedAnswer}
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
    </PageLayout>
  );
}
