import AddIcon from "@mui/icons-material/Add";
import { Alert, Button, Grid, Modal, Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { ConvertersSearch } from "@src/Components/ConvertersSearch/ConvertersSearch";
import TransformTextField from "@src/Components/TransformTextField/TransformTextField";
import { NotificationContext } from "@src/Contexts/Notification.Context";
import { FindConverter } from "@src/ConvertersMeta";
import { ConverterProps } from "@src/Interfaces/ConverterProps";
import { DashboardComponent } from "@src/Interfaces/DashboardItem";
import { ParseUrlHash } from "@src/Utils/ParseUrlHash";
import { useSnackbar, VariantType } from "notistack";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      comp: any;
    }
  }
}

/**
 * Component to hold the transform text
 */
const TransformTextItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  letterSpacing: "2",
  textAlign: "center",
}));

/**
 * Component to hold the converter card
 */
const CardItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  letterSpacing: "2",
}));

/**
 * Component to show the converters
 *
 */
function ConverterMain() {
  // State to control add component dialog
  const [showComponentAddDiag, setShowComponentAddDiag] = useState(false);

  // state to hold the input text
  const [text, setText] = useState("");

  //state to hold the selected converters
  const [selectedConverters, setSelectedConverters] = useState(
    {} as Record<string, DashboardComponent>
  );

  // Notification
  const { enqueueSnackbar } = useSnackbar();
  const [notification, setNotification] = useState({
    message: "",
    variant: "default" as VariantType,
  });

  /**
   * Create the state object for selected converter
   *
   * @param {string} componentKey
   * @param {string[]} [componentSettingsArr=[]]
   * @return {*}  {(DashboardComponent | null)}
   */
  const createConverterStateObj = (
    componentKey: string,
    componentSettingsArr: string[] = []
  ): DashboardComponent | null => {
    if (FindConverter(componentKey) == null) {
      console.error(componentKey, " is not a valid component ");
      return null;
    }

    const componentId = uuidv4();
    return {
      converterId: componentId,
      converterKey: componentKey,
      converterSettingsArr: componentSettingsArr,
    };
  };

  /**
   * Add a converter to the dashboard
   *
   * @param {string} componentKey
   */
  const addConverter = (componentKey: string) => {
    const newComponment = createConverterStateObj(componentKey);
    if (newComponment !== null) {
      setSelectedConverters((components) => {
        components[newComponment?.converterId] = newComponment;

        return { ...components };
      });
      updateLocationHash();
    }
  };

  /**
   * For removing converter from dashboard
   *
   * @param {string} componentId
   */
  const removeConverter = (componentId: string) => {
    setSelectedConverters((components) => {
      delete components[componentId];
      return { ...components };
    });
    setNotification({
      message: "Removed Converter",
      variant: "default",
    });
  };

  /**
   * Update the location hash based on the selected component
   *
   */
  const updateLocationHash = () => {
    let hash = "";
    for (const compKey in selectedConverters) {
      const comp = selectedConverters[compKey];
      hash += comp.converterKey + ":" + comp.converterSettingsArr;
      hash += ";";
    }
    // Update the hash
    window.location.hash = hash;
  };

  /**
   * handler for converter selected from search screen
   *
   * @param {string} key
   */
  const onComponentSelectAfterSearch = (key: string) => {
    addConverter(key);
    setShowComponentAddDiag(false);
  };

  const handleOpenConveterSearch = () => setShowComponentAddDiag(true);
  const handleCloseConveterSearch = () => setShowComponentAddDiag(false);

  // effect for handling notification
  useEffect(() => {
    if (notification.message && notification.message.length > 0) {
      enqueueSnackbar(notification.message, {
        variant: notification.variant,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setNotification({
        message: "",
        variant: "default",
      });
    }
  }, [notification, enqueueSnackbar]);

  // load the components from hash on page load
  useEffect(() => {
    function loadComponentsFromHash() {
      // Find the components to load
      const componentsToLoad = ParseUrlHash.parse(window.location.hash);
      console.log("Found components to load from url", componentsToLoad);
      const newComponents: Record<string, any> = {};
      for (const component of componentsToLoad) {
        const newComponment = createConverterStateObj(
          component.converterKey,
          component.settings
        );
        if (newComponment !== null) {
          newComponents[newComponment?.converterId] = newComponment;
        }
      }
      setSelectedConverters(newComponents);
    }

    window.onhashchange = loadComponentsFromHash;
    loadComponentsFromHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // effect to update the location hash when the selected converters change
  useEffect(() => {
    updateLocationHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConverters]);

  return (
    <div style={{ marginTop: 10, minHeight: "80.3vh" }}>
      <NotificationContext.Provider
        value={{
          message: notification.message,
          variant: notification.variant,
          setNotification,
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} alignItems="center" justifyItems="center">
            <TransformTextItem>
              <TransformTextField
                text={text}
                onChange={(text: string) => setText(text)}
              />
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpenConveterSearch}
                style={{
                  margin: "10px",
                }}
              >
                Add Converters
              </Button>

              {/* <Button
                variant="contained"
                onClick={() => {
                  console.log("Clicked", selectedComponents);
                  addConverter("Base64Encoder");
                }}
              >
                Add 1
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  console.log("Clicked", selectedComponents);
                  addConverter("Base64Decoder");
                }}
              >
                Add 2
              </Button> */}
            </TransformTextItem>
          </Grid>
          <Grid
            container
            item
            xs={12}
            alignContent="flex-start"
            justifyContent="center"
            style={{
              minHeight: "68vh",
            }}
          >
            {Object.values(selectedConverters).map((converter, index) => {
              const componentMeta = FindConverter(converter.converterKey);
              const Comp: React.FC<ConverterProps> = componentMeta.component;
              return (
                <Grid item md={4} lg={3} xl={3} key={index}>
                  <CardItem key={index}>
                    <Comp
                      key={index}
                      text={text}
                      helpText={componentMeta.description}
                      converterId={converter.converterId}
                      converterKey={converter.converterKey}
                      color={componentMeta.ascentColor}
                      onClose={(componentId: string) => {
                        console.info("Removing Converter ", componentId);
                        removeConverter(componentId);
                      }}
                      onSettingsUpdate={(newsettings: string[]) => {
                        console.log("setting  updated ", newsettings);
                        // Update the settings in the map
                        setSelectedConverters((components) => {
                          components[
                            converter.converterId
                          ].converterSettingsArr = newsettings;
                          return { ...components };
                        });
                      }}
                      settingArr={converter.converterSettingsArr}
                    />
                  </CardItem>
                </Grid>
              );
            })}

            {Object.keys(selectedConverters).length === 0 && (
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignContent="flex-end"
                  justifyContent="center"
                >
                  <Alert
                    variant="outlined"
                    severity="info"
                    style={{
                      width: "50vw",
                      marginTop: "20vh",
                    }}
                  >
                    <div style={{ marginBottom: "10px" }}>
                      ConvertAll helps you to convert one text input to other
                      formats using a huge collection of converters.
                    </div>
                    Choose some converters
                  </Alert>
                </Stack>
              </Grid>
            )}
          </Grid>
          {/* <Grid item xs={12}>
            <Item>Footer</Item>
          </Grid> */}
        </Grid>
      </NotificationContext.Provider>

      <Modal
        open={showComponentAddDiag}
        onClose={handleCloseConveterSearch}
        aria-labelledby="modal-title"
      >
        <ConvertersSearch
          onSelect={onComponentSelectAfterSearch}
          closeDialog={() => {
            setShowComponentAddDiag(false);
          }}
        />
      </Modal>
    </div>
  );
}

export default function ConverterMainWithSnack() {
  return <ConverterMain />;
}
