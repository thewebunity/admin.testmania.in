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
import Card from "@mui/material/Card";

// @mui material icons
import AddIcon from "@mui/icons-material/Add";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Custom components
import Notification from "examples/Notification";

// Store

import { notificationActions } from "store/notification-slice";

import {getPages} from "../../store/page-slice"
import PageInformation from './PageInformation'


let columns, rows;

function Pages() {
  const dispatch = useDispatch();

  const notificationSlice = useSelector((state) => state.notification);
  const studentsData = useSelector((state) => state.students?.students);

  const [isLoading, setIsLoading] = useState(true);

  const [students, setPages] = useState();

  const [searchName, setSearchName] = useState("");
  const handleSearchNameChange = (e) => {
    setSearchName(() => e.target.value);

    if (e.target.value === "") {
      setPages(() => studentsData);
    }

    console.log(
      "studentsData",
      studentsData.filter((student) =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    setPages(() =>
      studentsData.filter((student) =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const getStudentsData = async () => {
    const data = await dispatch(getPages());

    setPages(() => data);
    setIsLoading(false);
  };

  useEffect(() => {
    getStudentsData();

    return () => {};
  }, []);

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <>
   
      </>

      <DashboardNavbar />
      {isLoading && (
        <MDBox pt={6} pb={3}>
          Loading...
        </MDBox>
      )}
      

      <Grid container justifyContent={`space-between`} mt={4}>
        <MDInput
          type="text"
          label="Search Pages..."
          htmlFor="search"
          variant="standard"
          value={searchName}
          onChange={handleSearchNameChange}
        />
          <MDButton
          variant="gradient"
          color="info"
          onClick={() => navigate("/page/editlogo")}
        >
          <AddIcon />
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            ml={2}
            color="white"
          >
            ADD NEW LOGO
          </MDTypography>
        </MDButton>
      </Grid>
      

      {!isLoading && <PageInformation students={students} />}

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Pages;
