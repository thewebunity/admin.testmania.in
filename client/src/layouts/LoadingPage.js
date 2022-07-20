// Material Dashboard 2 React components
import { CircularProgress, Stack, Container } from "@mui/material";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

export default function LoadingPage() {
  return (
    <CoverLayout image={bgImage}>
      <Container>
        <Stack
          direction="row"
          alignItems={`center`}
          justifyContent={`center`}
          m={20}
        >
          <center>
            <CircularProgress />
          </center>
        </Stack>
      </Container>
    </CoverLayout>
  );
}
