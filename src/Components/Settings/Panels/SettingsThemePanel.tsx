import {
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "@src/Contexts/Theme.Context";

/**
 * Themes panel
 *
 * @export
 * @return {*}
 */
export function SettingsThemePanel() {
  const themeContext = useContext(ThemeContext);

  const handleThemeChange = (event: SelectChangeEvent) => {
    themeContext.updateTheme(event.target.value);
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      direction="row"
      alignItems="center"
      spacing={5}
      style={{
        padding: "20px",
        margin: "0xpx",
      }}
    >
      <Grid item xs={6}>
        Theme
      </Grid>
      <Grid item xs={6}>
        <Select
          id="demo-simple-select"
          value={themeContext.theme}
          label="Age"
          onChange={handleThemeChange}
        >
          <MenuItem value="Default">Default</MenuItem>
          <MenuItem value="Modern">Modern</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={6}>
        Dark Mode
      </Grid>
      <Grid item xs={6}>
        <Switch
          checked={themeContext.darkTheme}
          onChange={(event) => {
            themeContext.setDarkTheme(event.target.checked);
          }}
        />
      </Grid>
    </Grid>
  );
}
