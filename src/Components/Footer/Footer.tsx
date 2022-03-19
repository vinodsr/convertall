import { Grid, Link } from "@mui/material";
import { Config } from "@src/Config";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box } from "@mui/system";
/**
 * Footer component
 *
 */

export default function Footer() {
  return (
    <Grid
      container
      sx={{
        backgroundImage: (theme) => {
          if (theme.palette.mode === "dark") {
            return "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))";
          } else {
            return "";
          }
        },
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.primary.main : "",
        height: "7vh",
        color: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.contrastText
            : theme.palette.primary.light,
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid xs={6} item container direction="column">
        <Grid>
          about://
          <Link
            href="https://vinodsr.dev"
            title="Visit vinodsr.dev"
            target="_blank"
            sx={{
              color: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.primary.contrastText
                  : theme.palette.primary.light,
            }}
          >
            vinodsr.dev
          </Link>
        </Grid>
        <Grid>version:{Config.Version}</Grid>
      </Grid>
      <Grid xs={6} item style={{ textAlign: "right" }}>
        <Box paddingTop="10px">
          <Link
            href="https://www.github.com/vinodsr/convertall"
            title="View in github"
            target="_blank"
          >
            <GitHubIcon color="action" />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}
