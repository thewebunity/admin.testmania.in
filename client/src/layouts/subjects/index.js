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

// react router
import { useNavigate } from "react-router-dom";

// react redux
import { useDispatch, useSelector } from "react-redux";

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
import SubjectInformation from "./components/SubjectInformation";

// Store
import { getSubjects } from "store/subjects-slice";
import { notificationActions } from "store/notification-slice";

function Subjects() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notificationSlice = useSelector((state) => state.notification);
  const subjectsData = useSelector((state) => state.subjects?.subjects);

  const [isLoading, setIsLoading] = useState(true);

  const [subjects, setSubjects] = useState();

  const [searchName, setSearchName] = useState("");
  const handleSearchNameChange = (e) => {
    setSearchName(() => e.target.value);

    if (e.target.value === "") {
      setSubjects(() => subjectsData);
    }

    console.log(
      "subjectsData",
      subjectsData.filter((subject) =>
        subject.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setSubjects(() =>
      subjectsData.filter((subject) =>
        subject.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const getSubjectsData = async () => {
    const data = await dispatch(getSubjects());

    setSubjects(() => data);
    setIsLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await dispatch(getSubjects());

      setSubjects(() => data);
      setIsLoading(false);
    };

    getData();

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

      {!isLoading && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <MDBox justifyContent="space-between" display="flex" my={2} mr={1}>
              <MDInput
                type="text"
                label="Search Subject..."
                htmlFor="search"
                variant="standard"
                value={searchName}
                onChange={handleSearchNameChange}
              />
              <MDButton
                variant="gradient"
                color="dark"
                onClick={() => navigate("/add-subject")}
              >
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;add new subject
              </MDButton>
            </MDBox>
            <SubjectInformation subjects={subjects} getData={getSubjectsData} />
          </Grid>
        </Grid>
      )}
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Subjects;
