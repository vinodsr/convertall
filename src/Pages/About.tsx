import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import MergeOutlinedIcon from "@mui/icons-material/MergeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
/**
 * About Page Component
 * @returns
 */
export const AboutPage = () => {
  return (
    <Grid
      style={{ marginTop: "12vh", minHeight: "82vh", padding: "3em" }}
      container
      spacing={3}
    >
      <Grid item md={4} sm={6} xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Box padding={3}>
                <Typography variant="h3" component="div" gutterBottom>
                  <LightbulbOutlinedIcon
                    color="info"
                    sx={{ fontSize: ".9em" }}
                  ></LightbulbOutlinedIcon>
                  Idea
                </Typography>
                <Typography variant="body1" gutterBottom>
                  The idea of convertall is to create a tool which will help
                  developers to run commonly used convertion all at once in a
                  single page.
                  <br />
                  <br />
                  The usage of this tool is not only limited to help developers
                  to find the decode combination for a particular string using
                  different algoritms.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={4}>
              <Box padding={3}>
                <Typography variant="h3" component="div" gutterBottom>
                  <MergeOutlinedIcon
                    color="secondary"
                    sx={{ fontSize: ".9em" }}
                  ></MergeOutlinedIcon>
                  Contrib:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  You can contribute to this project by submitting pull request
                  at{" "}
                  <Link
                    href="https://www.github.com/vinodsr/convertall"
                    title="github account"
                    target="_blank"
                  >
                    github.com/vinodsr/convertall.
                  </Link>{" "}
                  Contributions can be new feature / bug fixes or even new
                  converters.
                  <br />
                  <br />
                  You can read more about the contribution guidelines at{" "}
                  <Link
                    href="https://www.github.com/vinodsr/convertall"
                    title="github account"
                    target="_blank"
                  >
                    github.com/vinodsr/convertall.
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} md={5} sm={6} xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper elevation={6}>
              <Box padding={3}>
                <Typography variant="h3" component="div" gutterBottom>
                  <InfoOutlinedIcon
                    color="success"
                    sx={{ fontSize: ".9em" }}
                  ></InfoOutlinedIcon>
                  About Me
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Vinod S R / Vinod
                </Typography>
                <Box paddingTop={2}>
                  <Link
                    href="https://www.github.com/vinodsr"
                    title="github account"
                    target="_blank"
                  >
                    <GitHubIcon color="action" fontSize="large" />
                  </Link>
                  <Link
                    href="https://dev.to/vinodsr"
                    title="dev.to account"
                    target="_blank"
                  >
                    <LogoDevIcon color="action" fontSize="large" />
                  </Link>
                  <Link
                    href="https://vinodsr.dev"
                    title="home page"
                    target="_blank"
                  >
                    <AccountBoxOutlinedIcon color="action" fontSize="large" />
                  </Link>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={6}>
              <Box padding={3}>
                <Typography variant="h3" component="div" gutterBottom>
                  <ConstructionOutlinedIcon
                    color="warning"
                    sx={{ fontSize: ".9em" }}
                  ></ConstructionOutlinedIcon>
                  Ecosystem
                </Typography>
                <Typography variant="h6" gutterBottom>
                  ReactJS / Github / AWS
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
