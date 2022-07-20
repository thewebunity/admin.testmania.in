import { useEffect, useState } from "react";

// @mui material components
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

export default function RowRadioButtonsGroup(props) {
  const [option1, setOption1] = useState(false);
  const handleOption1Change = (e) => {
    setOption1(true);
    setOption2(false);
    setOption3(false);
    setOption4(false);
    props.onChange(1);
  };

  const [option2, setOption2] = useState(false);
  const handleOption2Change = (e) => {
    setOption2(true);
    setOption1(false);
    setOption3(false);
    setOption4(false);
    props.onChange(2);
  };

  const [option3, setOption3] = useState(false);
  const handleOption3Change = (e) => {
    setOption3(true);
    setOption1(false);
    setOption2(false);
    setOption4(false);
    props.onChange(3);
  };

  const [option4, setOption4] = useState(false);
  const handleOption4Change = (e) => {
    setOption4(true);
    setOption1(false);
    setOption2(false);
    setOption3(false);
    props.onChange(4);
  };

  useEffect(() => {
    if (props.answer === 0) {
      setOption1(true);
      setOption2(false);
      setOption3(false);
      setOption4(false);
    } else if (props.answer === 1) {
      setOption2(true);
      setOption1(false);
      setOption3(false);
      setOption4(false);
    } else if (props.answer === 2) {
      setOption3(true);

      setOption1(false);
      setOption2(false);
      setOption4(false);
    } else if (props.answer === 3) {
      setOption4(true);
      setOption1(false);
      setOption2(false);
      setOption3(false);
    }
  }, []);

  return (
    <MDBox display="flex" justifyContent="flex-start" alignItems="center">
      <MDTypography variant="body2" color="text" fontWeight="regular">
        Correct Answer:&nbsp;&nbsp;
      </MDTypography>
      <MDTypography variant="h5" fontWeight="bold">
        {option1 ? "1" : option2 ? "2" : option3 ? "3" : option4 ? "4" : ""}
      </MDTypography>
      &nbsp;&nbsp;
      <MDBox display="flex" alignItems="center" mb={0.5} ml={1.5}>
        <MDBox mt={0.5}>
          <Switch checked={option1} onChange={handleOption1Change} />
        </MDBox>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Option 1
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={1.5}>
        <MDBox mt={0.5}>
          <Switch checked={option2} onChange={handleOption2Change} />
        </MDBox>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Option 2
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={1.5}>
        <MDBox mt={0.5}>
          <Switch checked={option3} onChange={handleOption3Change} />
        </MDBox>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Option 3
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex" alignItems="center" mb={0.5} ml={1.5}>
        <MDBox mt={0.5}>
          <Switch checked={option4} onChange={handleOption4Change} />
        </MDBox>
        <MDBox width="80%" ml={0.5}>
          <MDTypography variant="button" fontWeight="regular" color="text">
            Option 4
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}
