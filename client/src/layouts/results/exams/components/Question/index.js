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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react redux
import { useDispatch } from "react-redux";

// react router
import { useNavigate, useParams } from "react-router-dom";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// store

function Question({
  questionId,
  index,
  question,
  description,
  answer,
  imageUrl,
  selectedAnswer,
  options,
  noGutter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={2}
      mb={noGutter ? 0 : 1}
      mt={1}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-start" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={1}
        >
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
          >
            <MDTypography
              variant="body1"
              fontWeight="regular"
              textTransform="none"
              mb={1}
            >
              {`${index + 1}.  ${question}`}
            </MDTypography>
            {description && (
              <MDTypography
                variant="caption"
                fontWeight="light"
                textTransform="none"
                color="dark"
                mb={1}
              >
                {description}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>

        {imageUrl && (
          <img src={imageUrl} alt={question} style={{ maxWidth: "90%" }} />
        )}

        <MDBox my={2} lineHeight={0} display="flex" flexDirection="column">
          {options.map((val, index) => (
            <MDBox alignItems="center" key={index}>
              <MDTypography
                variant="body1"
                color={
                  val.trim().toString() === selectedAnswer.trim().toString()
                    ? selectedAnswer.trim().toString() ===
                      answer.trim().toString()
                      ? "success"
                      : "error"
                    : val.trim().toString() === answer.trim().toString()
                    ? selectedAnswer
                      ? "success"
                      : "info"
                    : "dark"
                }
                fontWeight={
                  val.trim().toLowerCase() === answer.trim().toLowerCase()
                    ? `bold`
                    : `light`
                }
              >
                {index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;
                {val}
              </MDTypography>
            </MDBox>
          ))}
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Question
Question.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Question
Question.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  options: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Question;
