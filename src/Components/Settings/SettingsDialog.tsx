import { Grid, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { Box, styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SettingsThemePanel } from "./Panels/SettingsThemePanel";
/**
 * List item component
 */
const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

/**
 * Settings Dialog
 */
export const SettingsDialog = React.forwardRef(
  (props: { closeDialog: Function }, ref) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event: React.SyntheticEvent, tabIndex: number) => {
      setTabIndex(tabIndex);
    };
    function a11yProps(index: number) {
      return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
      };
    }

    interface TabPanelProps {
      children?: React.ReactNode;
      index: number;
      value: number;
    }
    function TabPanel(props: TabPanelProps) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    return (
      <Grid
        container
        item
        spacing={2}
        alignContent="flex-start"
        direction="row"
        alignItems="flex-start"
        sx={{
          backgroundColor: (theme) => {
            return theme.palette.background.default;
          },
        }}
        style={{
          position: "absolute",
          top: "10vh",
          left: "25vw",
          padding: "0px",
          width: "50vw",
          height: "80vh",
          // border: "2px solid #000",
          margin: "0px",
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            padding: "10px",
            margin: "0px",
          }}
          sx={{
            backgroundImage: (theme) => {
              if (theme.palette.mode === "dark") {
                return "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))";
              } //theme.palette.background.default;
              else {
                return "";
              }
            },
            backgroundColor: (theme) => {
              return theme.palette.mode === "light"
                ? theme.palette.primary.main
                : "";
            },
            color: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.primary.contrastText
                : theme.palette.primary.light,
          }}
        >
          <Item
            id="modal-title"
            style={{
              padding: "0px",
              margin: "0px",
              textAlign: "left",
            }}
          >
            Settings
            <IconButton
              aria-label="close"
              style={{
                float: "right",
                padding: "0px",
              }}
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.primary.contrastText
                    : theme.palette.primary.light,
              }}
              onClick={() => {
                props.closeDialog();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="General" {...a11yProps(2)} />
              <Tab label="Appearance" {...a11yProps(0)} />
              <Tab label="Support" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tabIndex} index={1}>
            <SettingsThemePanel></SettingsThemePanel>
          </TabPanel>
          <TabPanel value={tabIndex} index={0}>
            TODO: General Settings
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            TODO: Support
          </TabPanel>
        </Grid>
      </Grid>
    );
  }
);
