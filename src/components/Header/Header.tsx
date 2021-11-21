import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { Grid } from "@mui/material";
import { CustomLink } from "../CustomLink/CustomLink";

/**
 * Header component
 *
 */
export default function Header() {
  const displayDesktop = () => {
    return (
      <Toolbar>
        <Grid container>
          <Grid xs={6} item>
            <SettingsIcon />
            &nbsp; Convert All.dev
          </Grid>
          <Grid xs={6} style={{ textAlign: "right" }} item>
            <nav
              style={{
                paddingBottom: "1rem",
              }}
            >
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
      <Toolbar />
    </React.Fragment>
  );
}
