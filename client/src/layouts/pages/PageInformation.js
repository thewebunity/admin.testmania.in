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
import { useState } from "react";

// react redux
import { useDispatch } from "react-redux";

// react router
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

let columns, rows;

function PageInformation(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();

  columns = [
    { Header: "name", accessor: "name", align: "left" },

    { Header: "action", accessor: "action", align: "center" },
  ];

  rows =
    props.students?.length > 0 &&
    props.students?.map((student) => {
      return {
             name : (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {student.name}
          </MDTypography>
        ),
      
    

   
        action: (
          <MDTypography
            display="block"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(`/pages/edit/${student._id}`)}
            variant="button"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
        ),
      };
    });

  return (
    <>
      {props.students?.length > 0 ? (
        <MDBox pt={10} pb={10}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
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
                    Pages
                  </MDTypography>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      ) : (
        <MDBox pt={6} pb={3}>
          <MDTypography
            display="block"
            variant="body2"
            color="text"
            fontWeight="regular"
          >
            No rows added yet...
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

export default PageInformation;
