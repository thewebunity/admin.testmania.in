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

// react
import { useEffect, useState } from "react";

// react redux
import { useDispatch, useSelector } from "react-redux";

// react router
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Custom components
import Notification from "examples/Notification";

// Components
import ExamInformation from "./components/ExamInformation";

// Store
import { getStudentExams } from "store/exams-slice";
import { notificationActions } from "store/notification-slice";

function Exams() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const exams = useSelector((state) => state.exams?.exams);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getStudentExams(id));
      setIsLoading(false);
    };

    getData();

    return () => {};
  }, []);

  const navigate = useNavigate();

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

      {!isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <ExamInformation exams={exams} />
          </Grid>
        </Grid>
      )}
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Exams;
