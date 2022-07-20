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
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

// import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";
import { getExams } from "store/exams-slice";

let columns, rows;

function ExamInformation(props) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);
  const deleteSelection = () => {
    setShowDialog(true);
  };

  columns = [
    { Header: "name", accessor: "name", align: "left" },
    { Header: "subject", accessor: "subject", align: "left" },
    { Header: "started at", accessor: "startedAt", align: "left" },
    { Header: "submitted at", accessor: "submittedAt", align: "left" },
    { Header: "score", accessor: "score", align: "center" },
    { Header: "report", accessor: "report", align: "left" },
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
            {exam.subject.name}
          </MDTypography>
        ),
        startedAt: (
          <MDTypography display="block" variant="inherit" fontWeight="light">
            {new Date(exam.startedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </MDTypography>
        ),
        submittedAt: (
          <MDTypography display="block" variant="inherit" fontWeight="light">
            {new Date(exam.submittedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </MDTypography>
        ),
        score: (
          <MDTypography display="block" variant="h6" fontWeight="regular">
            {exam.score * exam.marks} / {exam.questions.length * exam.marks}
          </MDTypography>
        ),
        report: (
          <MDBox width="8rem" textAlign="left">
            <MDProgress
              value={(exam.score / exam.questions.length) * 100}
              color={
                (exam.score / exam.questions.length) * 100 > 80
                  ? `success`
                  : (exam.score / exam.questions.length) * 100 <= 35
                  ? `error`
                  : `info`
              }
              variant="gradient"
              label={false}
            />
          </MDBox>
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
              onClick={() =>
                navigate(`/exams/${id}/view/${exam.id.toString()}`)
              }
            >
              <Icon>visibility</Icon>&nbsp;view
            </MDButton>
          </MDBox>
        ),
      };
    });

  return (
    <>
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
                  Exam History
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
                  <MDBox mt={6} pb={3}>
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
