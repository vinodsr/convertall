import CloseIcon from "@mui/icons-material/CloseOutlined";
import CopyIcon from "@mui/icons-material/CopyAllOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { NotificationContext } from "@src/contexts/Notification.Context";
import { ConverterBaseProps } from "@src/Interfaces/ConverterBaseProps";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Scrollbar from "react-scrollbars-custom";
import "./ConverterCard.css";
import MessageDialog from "../Dialog/MessageDialog";

/**
 * Base component for converters
 * @param props Props
 * @returns
 */
export default function ConverterCard(props: ConverterBaseProps) {
  const [openInfoDialog, showInfoDialog] = useState(false);
  //Incase the title is not supplied
  const title = props.title || "";

  //Avatar icon
  const avatarKey = title
    .split(" ")
    .slice(0, 2)
    .map((e) => e.charAt(0))
    .join("")
    .toUpperCase();
  // Color for icon
  const color = props.color || red[500];

  // Notification context
  const { setNotification } = useContext(NotificationContext);

  // state to show or hide settings view
  const [settingsView, showSettingsView] = useState(false);

  // Form handler
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm();

  /**
   * On Click handler for copy button
   */
  const onCopyClick = async () => {
    await navigator.clipboard.writeText(props.text);
    setNotification({
      message: "Copied !",
      variant: "success",
    });
  };

  /**
   * handler for info button click
   *
   */
  const onInfoClick = () => {
    showInfoDialog(true);
  };

  /**
   * On Close handler
   */
  const onClose = () => {
    console.log("Closing ", props.converterId);
    props.onClose(props.converterId);
  };

  /**
   * Submit handler for form
   * @param data form data
   */
  const onSubmit = (data: any) => {
    console.log("form data", data, isSubmitted);
    if (props.onSettingsUpdate) {
      props.onSettingsUpdate(data);
    }
    showSettingsView(false);
  };

  /**
   *  Loads the settings view
   */
  const showSettings = () => {
    console.log("showing settings with prop", props.settings);
    // set the
    for (const settingKey in props.settings) {
      // Set the value in the form
      setValue(settingKey, props.settings[settingKey]);
    }
    showSettingsView(true);
  };

  // reference for settings, incase of null use dummy page
  const SettingsComponent = props.settingsComponent
    ? props.settingsComponent
    : () => <Alert severity="info">No Settings for this converter</Alert>;

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: color,
              color: "white",
              borderColor: "white",
              borderWidth: "2px",
              borderStyle: "solid",
            }}
            aria-label={props.title}
            title={props.title}
            variant="rounded"
          >
            {avatarKey}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="copy" onClick={onCopyClick} title="Copy">
              <CopyIcon />
            </IconButton>
            <IconButton
              aria-label="Settings"
              onClick={showSettings}
              title="Settings"
            >
              <SettingsIcon />
            </IconButton>
            <IconButton aria-label="info" onClick={onInfoClick} title="Info">
              <InfoIcon />
            </IconButton>
            <IconButton aria-label="close" onClick={onClose} title="Close">
              <CloseIcon />
            </IconButton>
          </>
        }
        title={props.title}
      />

      <CardContent
        style={{
          display: settingsView ? "block" : "none",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="CardBox">
            <Grid container>
              <Grid item xs={12} textAlign="left">
                <Typography variant="h6" display="block" gutterBottom>
                  Settings
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                textAlign="left"
                style={{
                  marginBottom: "10px",
                }}
              >
                <Scrollbar style={{ width: "100%", height: "13vh" }}>
                  {/* dummy component for fixing height */}
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <SettingsComponent
                      errors={errors}
                      control={control}
                    ></SettingsComponent>
                  </div>
                </Scrollbar>
              </Grid>
              <Grid item>
                <Button variant="contained" size="small" type="submit">
                  {props.settingsComponent ? "Save" : "Ok"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </CardContent>

      <CardContent
        style={{
          display: settingsView ? "none" : "block",
        }}
      >
        <Box className="CardBox">
          <Scrollbar style={{ width: "100%", height: "20vh" }}>
            {props.text ? (
              <Typography
                variant="h5"
                component="div"
                style={{ wordBreak: "break-all" }}
              >
                {props.text}
              </Typography>
            ) : (
              "Start typing something"
            )}
          </Scrollbar>
        </Box>
        <MessageDialog
          open={openInfoDialog}
          title="About Converter"
          content={props.helpText ? props.helpText : "No help"}
          buttonText="Ok"
          onClose={() => {
            showInfoDialog(false);
          }}
        />
      </CardContent>
    </Card>
  );
}
