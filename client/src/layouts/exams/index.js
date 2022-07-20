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
import { useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

// Custom components
import Notification from "examples/Notification";

// Components
import ExamInformation from "./components/ExamInformation";

// Store
import { getExams } from "store/exams-slice";
import { notificationActions } from "store/notification-slice";

function Exams() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationSlice = useSelector((state) => state.notification);
  const examsData = useSelector((state) => state.exams?.exams);

  const [isLoading, setIsLoading] = useState(true);

  const [exams, setExams] = useState();

  const [searchName, setSearchName] = useState("");
  const handleSearchNameChange = (e) => {
    setSearchName(() => e.target.value);

    if (e.target.value === "") {
      setExams(() => examsData);
    }

    console.log(
      "examsData",
      examsData.filter((exam) =>
        exam.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setExams(() =>
      examsData.filter((exam) =>
        exam.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const getExamsData = async () => {
    const data = await dispatch(getExams());

    setExams(() => data);
    setIsLoading(false);
  };

  useEffect(() => {
    getExamsData();

    return () => {};
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

      {isLoading && (
        <MDBox pt={6} pb={3}>
          Loading...
        </MDBox>
      )}

      <MDBox justifyContent="space-between" display="flex" my={4} mr={1}>
        <MDInput
          type="text"
          label="Search Exam..."
          htmlFor="search"
          variant="standard"
          value={searchName}
          onChange={handleSearchNameChange}
        />
        <MDButton
          variant="gradient"
          color="dark"
          onClick={() => navigate("/add-exam")}
        >
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;add new exam
        </MDButton>
      </MDBox>

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
