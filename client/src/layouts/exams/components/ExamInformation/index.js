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
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";

// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import { deleteExam, getExams } from "store/exams-slice";

// components
import AlertDialog from "components/AlertDialog";

let columns, rows;
let examId;

function ExamInformation(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const deleteSelection = () => {
    setShowDialog(true);
  };

  columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "subject", accessor: "subject", align: "left" },
    { Header: "startDate", accessor: "startDate", align: "left" },
    { Header: "endDate", accessor: "endDate", align: "left" },
    { Header: "duration", accessor: "duration", align: "left" },
    { Header: "fee", accessor: "fee", align: "left" },
    { Header: "marks", accessor: "marks", align: "left" },
    { Header: "action", accessor: "action", align: "center" },
  ];

  rows =
    props.exams?.length > 0 &&
    props.exams?.map((exam) => {
      return {
        name: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.title}
          </MDTypography>
        ),
        subject: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.subject?.name}
          </MDTypography>
        ),
        startDate: (
          <MDTypography display="block" variant="inherit" fontWeight="light">
            {new Date(exam.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </MDTypography>
        ),
        endDate: (
          <MDTypography display="block" variant="inherit" fontWeight="light">
            {new Date(exam.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </MDTypography>
        ),
        duration: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.duration}
          </MDTypography>
        ),
        fee: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.fee}
          </MDTypography>
        ),
        marks: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.marks}
          </MDTypography>
        ),
        action: (
          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() => navigate(`/exams/edit/${exam.id}`)}
            >
              <Icon>visibility</Icon>&nbsp;view
            </MDButton>
            <MDBox>
              <MDButton
                variant="text"
                color="error"
                onClick={() => {
                  examId = exam.id;
                  deleteSelection();
                }}
              >
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
          </MDBox>
        ),
      };
    });

  const handleSubmit = async () => {
    const res = await dispatch(deleteExam(examId));
    if (res === true) {
      examId = null;
      await dispatch(getExams());
    }
  };

  return (
    <>
      {showDialog && (
        <AlertDialog
          title={`Are you sure?`}
          content={`Are you sure you want to delete this item? Items once deleted cannot be recovered.`}
          button1={`Close`}
          button2={`Delete`}
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
            examId = null;
          }}
          handleSubmit={handleSubmit}
        />
      )}

      <MDBox pt={6} pb={3}>
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
                  Exams
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {props.exams?.length > 0 ? (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                ) : (
                  <MDBox pt={6} pb={3}>
                    <MDTypography
                      display="flex"
                      justifyContent="center"
                      variant="body2"
                      color="text"
                      fontWeight="regular"
                    >
                      No exams added yet...
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default ExamInformation;
