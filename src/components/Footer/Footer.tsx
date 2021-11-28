import { Grid } from "@mui/material";
import { Config } from "@src/Config";
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
          } //theme.palette.background.default;
          else {
            return "";
          }
        },
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.primary.main : "",
        height: "6vh",
        color: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.primary.contrastText
            : theme.palette.primary.light,
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid xs={6} item>
        vinodsr.com
      </Grid>
      <Grid xs={6} item style={{ textAlign: "right" }}>
        Icons
      </Grid>
      <Grid xs={12} item>
        Version {Config.Version}
      </Grid>
    </Grid>
  );
}
