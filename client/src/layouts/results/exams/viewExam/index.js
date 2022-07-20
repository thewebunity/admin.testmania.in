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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Custom components
import Notification from "examples/Notification";
import Questions from "../components/Questions";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Store
import { getExam } from "store/students-slice";
import { notificationActions } from "store/notification-slice";

export default function EditExam() {
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
        <Grid item xs={12} md={3}>
          <MDBox>
            {!isLoading &&
              (studentsSlice.exam ? (
                <Grid>
                  <DefaultInfoCard
                    icon="book"
                    title={studentsSlice.exam.title}
                    description={studentsSlice.exam.subject.name}
                    value={`${
                      studentsSlice.exam.score * studentsSlice.exam.marks
                    } / ${
                      studentsSlice.exam.questions.length *
                      studentsSlice.exam.marks
                    }`}
                  />
                </Grid>
              ) : (
                <MDTypography variant="caption"></MDTypography>
              ))}
          </MDBox>
        </Grid>
        {isLoading && (
          <MDBox display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </MDBox>
        )}
        {!isLoading &&
          (studentsSlice.exam ? (
            <Grid item xs={12} md={9}>
              <Questions
                questions={
                  studentsSlice.exam.questions &&
                  studentsSlice.exam.questions.length > 0 &&
                  studentsSlice.exam.questions
                }
              />
            </Grid>
          ) : (
            <MDBox pt={4} pb={3} px={3}>
              <MDTypography variant="caption">
                Exam not found! Please try again.
              </MDTypography>
            </MDBox>
          ))}
      </Grid>
    </DashboardLayout>
  );
}
