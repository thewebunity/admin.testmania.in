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
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React context
import { useMaterialUIController } from "context";

// store
import { deleteQuestion } from "store/exams-slice";

function Question({
  questionId,
  question,
  description,
  imageUrl,
  answer,
  options,
  noGutter,
}) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteQuestion(id, questionId));
  };
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
            mb={1}
          >
            <MDTypography
              variant="body2"
              fontWeight="regular"
              textTransform="none"
              mb={1}
            >
              {`${question}`}
            </MDTypography>
            <MDTypography
              variant="caption"
              fontWeight="light"
              textTransform="none"
              color="secondary"
            >
              {`${description ? `(${description})` : ""}`}
            </MDTypography>
            {imageUrl && (
              <MDTypography
                variant="caption"
                fontWeight="light"
                textTransform="none"
                color="info"
              >
                <a
                  href={`${imageUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Image
                </a>
              </MDTypography>
            )}
          </MDBox>

          <MDBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={handleDelete}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            <MDButton
              variant="text"
              color={darkMode ? "white" : "dark"}
              onClick={() =>
                navigate(`/exams/${id}/edit-question/${questionId}`)
              }
            >
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
        </MDBox>

        <MDBox mb={1} lineHeight={0} display="flex" flexDirection="column">
          {options.map((val, index) => (
            <MDBox alignItems="center" key={index}>
              <MDTypography
                variant="subtitle2"
                fontWeight={
                  val.trim().toLowerCase() === answer.trim().toLowerCase()
                    ? `bold`
                    : `light`
                }
              >
                <MDTypography
                  variant="caption"
                  color="text"
                  display="inline-block"
                >
                  {index + 1}.&nbsp;&nbsp;&nbsp;&nbsp;
                </MDTypography>
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
