import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

import React, { useState } from "react";
import { Grid, IconButton, Modal } from "@mui/material";
import { CustomLink } from "@src/Components/CustomLink/CustomLink";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingsDialog } from "../Settings/SettingsDialog";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";

/**
 * Header component
 *
 */
export default function Header() {
  // const [tabIndex, setTabIndex] = React.useState(0);

  // State to control settings dialog
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [localHash, setLocalHash] = useState(window.location.hash);
  const handleOpenSettingsDialog = () => setShowSettingsDialog(true);
  const handleCloseSettingsDialog = () => setShowSettingsDialog(false);

  // const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setTabIndex(newValue);
  // };

  const displayDesktop = () => {
    return (
      <Toolbar
        style={{
          height: "12vh",
        }}
      >
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
            {/* <Grid item justify-content="flex-end">
              <Tabs
                sx={{
                  textAlign: "right",
                  alignItems: "flex-end",
                  color: "green",
                }}
                value={tabIndex}
                onChange={handleTabChange}
                aria-label="icon label tabs example"
              >
                <Tab
                  icon={<HomeIcon />}
                  sx={{
                    color: "green",
                    "&.Mui-selected": {
                      color: "#fff",
                    },
                  }}
                  label="Home"
                />
                <Tab icon={<InfoIcon />} label="About" />
              </Tabs>
            </Grid> */}
            <nav
              style={
                {
                  // paddingBottom: "1rem",
                }
              }
            >
              <IconButton
                title="Settings"
                aria-label="Settings"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.primary.contrastText
                      : theme.palette.primary.light,
                }}
                onClick={() => {
                  handleOpenSettingsDialog();
                }}
              >
                <SettingsIcon />
              </IconButton>

              <CustomLink to={"/" + localHash} title="Go to home">
                <HomeIcon />
              </CustomLink>
              <CustomLink
                to="/about"
                title="About ?"
                onClick={() => {
                  // only store hash if the  current page is root
                  if (window.location.pathname === "/") {
                    setLocalHash(window.location.hash);
                  }
                }}
              >
                <InfoIcon />
              </CustomLink>
            </nav>
          </Grid>
        </Grid>
      </Toolbar>
    );
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">{displayDesktop()}</AppBar>
      <Modal
        open={showSettingsDialog}
        onClose={handleCloseSettingsDialog}
        aria-labelledby="modal-title"
      >
        <SettingsDialog
          closeDialog={() => {
            setShowSettingsDialog(false);
          }}
        />
      </Modal>
    </React.Fragment>
  );
}
