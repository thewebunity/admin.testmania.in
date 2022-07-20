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
import { useSelector, useDispatch } from "react-redux";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { getDashboard } from "../../store/dashboard-slice";
import DashboardData from "./dashboardData";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const dashboard = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      console.log("getData");
      try {
        await dispatch(getDashboard());

        setIsLoading(false);
      } catch (err) {
        console.log("error", err);
      }
    };

    getData();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <DashboardData
            students={dashboard.students}
            exams={dashboard.exams}
          />
        )}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
