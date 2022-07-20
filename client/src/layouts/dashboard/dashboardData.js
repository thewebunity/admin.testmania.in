// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// complex statistics card
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

export default function DashboardData(props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={3}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="dark"
            icon="people"
            title="Students"
            count={props.students}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            icon="book"
            title="Exams"
            count={props.exams}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}
