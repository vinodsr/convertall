import { Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Config } from "@src/Config";

/**
 * Footer component
 *
 */
export default function Footer() {
  return (
    <Grid
      container
      style={{
        backgroundColor: blue[600],
        height: "6vh",
        color: "white",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid xs={6}>vinodsr.com</Grid>
      <Grid xs={6} style={{ textAlign: "right" }}>
        Icons
      </Grid>
      <Grid xs={12}>Version {Config.Version}</Grid>
    </Grid>
  );
}
