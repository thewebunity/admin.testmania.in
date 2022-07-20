// React Router
import { Link as RouterLink } from "react-router-dom";

// Material Dashboard 2 React components
import { Box, Button, Typography, Stack, Container } from "@mui/material";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

export default function Page404() {
  return (
    <BasicLayout image={bgImage}>
      <Container>
        <Stack>
          <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
            <Typography sx={{ color: "text.secondary" }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </Typography>

            <Box
              component="img"
              src="/static/illustrations/illustration_404.svg"
              sx={{ height: 260, mx: "auto", my: { xs: 5, sm: 10 } }}
            />

            <Button
              to="/"
              size="large"
              variant="contained"
              component={RouterLink}
            >
              Go to Home
            </Button>
          </Box>
        </Stack>
      </Container>
    </BasicLayout>
  );
}
