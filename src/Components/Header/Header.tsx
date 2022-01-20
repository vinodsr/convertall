import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import React, { useContext } from "react";
import { Grid, Switch } from "@mui/material";
import { CustomLink } from "@src/Components/CustomLink/CustomLink";
import { ThemeContext } from "@src/Contexts/Theme.Context";

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
            <img
              src="images/ConvertAll_Logo-1.png"
              height="70"
              alt="ConvertAll.dev"
              title="ConverAll.dev"
              style={{
                paddingTop: "10px",
              }}
            />
          </Grid>
          <Grid xs={12} style={{ textAlign: "right" }} item>
            <nav
              style={
                {
                  // paddingBottom: "1rem",
                }
              }
            >
              Dark Mode{" "}
              <Switch
                checked={theme.darkTheme}
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
