import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import React, { useContext } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid, Switch } from "@mui/material";
import { CustomLink } from "@src/components/CustomLink/CustomLink";
import { ThemeContext } from "@src/contexts/Theme.Context";

/**
 * Header component
 *
 */
export default function Header() {
  const theme = useContext(ThemeContext);

  const displayDesktop = () => {
    return (
      <Toolbar>
        <Grid container>
          <Grid xs={12} item>
            <SettingsIcon />
            &nbsp; Convert All.dev
          </Grid>
          <Grid xs={12} style={{ textAlign: "right" }} item spacing={5}>
            <nav
              style={{
                paddingBottom: "1rem",
              }}
            >
              Dark Mode{" "}
              <Switch
                defaultChecked={theme.darkTheme}
                onChange={(event) => {
                  theme.setDarkTheme(event.target.checked);
                }}
              />
              <CustomLink to="/">Home</CustomLink>
              &nbsp;&nbsp;&nbsp;
              <CustomLink to="/about">About</CustomLink>
            </nav>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">{displayDesktop()}</AppBar>
      {/* Dummy toolbar to adjust hieight */}
      <Toolbar />
      <Toolbar />
    </React.Fragment>
  );
}
