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

import { useState, useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// react-redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Material Dashboard 2 React themes
import theme from "assets/theme";

// Material Dashboard 2 React Dark Mode themes
import themeDark from "assets/theme-dark";

// Material Dashboard 2 React routes
import routes from "routes";

// Material Dashboard 2 React contexts
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import brandWhite from "assets/images/logo.png";
import brandDark from "assets/images/logo.png";

// Store
import { authActions } from "./store/auth-slice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Page404 from "layouts/Page404";
import LoadingPage from "layouts/LoadingPage";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import EditStudent from "layouts/students/editStudent";
import EditSubject from "layouts/subjects/editSubject";
import EditExam from "layouts/exams/editExam";
import AddQuestion from "layouts/exams/addQuestion";
import EditQuestion from "layouts/exams/editQuestion";
import Cover from "layouts/authentication/reset-password/cover";
import Exams from "layouts/results/exams";
import ViewExam from "layouts/results/exams/viewExam";
import Reports from "layouts/results/exams/components/Reports";
import Pages from "layouts/pages"
import EditPage from "layouts/pages/edit";
import EditFooter from "layouts/footer";
import ImageUpload from "layouts/logo-upload"

const auth = getAuth();

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const [url, seturl] = useState(
    {
  
        url: '',
    }
  );
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const dispatchActions = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(`User is authenticated!`);

        await dispatchActions(
          authActions.setCurrentUser({
            name: user.displayName,
            email: user.email,
            id: user.uid,
            idToken: user.accessToken,
            refreshToken: user.refreshToken,
          })
        );
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, [dispatchActions]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/pages/logo`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
       
          seturl({...url, link: `${process.env.REACT_APP_BASE_URL}/public/uploads/${result.logo.src}`});
        
        },
     
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const authStatus = useSelector((state) => state.auth);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {isLoading && <LoadingPage />}
      {!isLoading && (
        <Routes>
          {!authStatus.currentUser && (
            <>
              <Route path="/" exact element={<Navigate to="/sign-in" />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<Cover />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </>
          )}
          {authStatus.currentUser && (
            <>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/sign-in" element={<Navigate to="/dashboard" />} />
              <Route path="/students/edit/:id" element={<EditStudent />} />
              <Route path="/students/exams/:id" element={<Exams />} />
              <Route path="/Footer/edit" element={<EditFooter />} />
              <Route path="/page/editlogo" element={< ImageUpload />} />

             

              <Route path="/subjects/edit/:id" element={<EditSubject />} />
              <Route path="/pages/edit/:id" element={<EditPage />} />

              <Route path="/exams/edit/:id" element={<EditExam />} />
              <Route path="/exams/:id/view/:examId" element={<ViewExam />} />

              <Route path="/exams/add-question/:id" element={<AddQuestion />} />

              <Route
                path="/students/:id/reports/:examId"
                element={<Reports />}
              />
               <Route
                path="/pages"
                element={<Pages />}
              />

              <Route
                path="/exams/:id/edit-question/:questionId"
                element={<EditQuestion />}
              />
              {getRoutes(routes)}
            </>
          )}
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
      {!isLoading && layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              url.link
            }
            brandName=""
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
    </ThemeProvider>
  );
}
