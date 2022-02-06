import { Alert, Avatar, Chip, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ConverterMap } from "@src/ConvertersMeta";
import { Box, styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AddCircleOutline } from "@mui/icons-material";
import { ConverterMeta } from "@src/Interfaces/ConverterMeta";
import CloseIcon from "@mui/icons-material/Close";
import { Categories } from "@src/data/CategoryMaster";
import { Category } from "@src/Interfaces/Category";
/**
 * List item component
 */
const Item = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
}));

/**
 * Conveter Search
 */
export const ConvertersSearch = React.forwardRef(
  (props: { onSelect: Function; closeDialog: Function }, ref) => {
    const [searchText, setSearchText] = useState("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [favs, setFavs] = useState("");
    const [searchMode, setSearchMode] = useState("NORMAL");

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
      null
    );

    const [foundConverters, setFoundComponents] = useState(
      [] as ConverterMeta[]
    );

    /**
     * Triggers on clicking the category chip
     *
     * @param {string} selectedCategory
     */
    const handleCategoryClick = (
      selectedCategory: Category | null | String
    ) => {
      console.log("Selected " + selectedCategory);
      if (selectedCategory === "FAV") {
        setSearchMode("FAV");
      } else {
        setSearchMode("NORMAL");
        setSelectedCategory(selectedCategory as Category);
      }
    };

    /**
     * Toggle favs of a converter
     *
     * @param {ConverterMeta} converter
     */
    const toggleFavourite = (converter: ConverterMeta) => {
      if (converter) {
        // add to local storage
        const favsStored = localStorage.getItem("favs");
        let favsObj = null;
        if (favsStored !== null) {
          try {
            favsObj = JSON.parse(favsStored);
          } catch (e) {}
        }
        const favs: Record<string, ConverterMeta> = favsObj || {};
        // Check if the favs is there then remove it.
        if (typeof favs[converter.converterKey] !== "undefined") {
          delete favs[converter.converterKey];
        } else {
          favs[converter.converterKey] = converter;
        }
        const favStr = JSON.stringify(favs);
        localStorage.setItem("favs", favStr);
        setFavs(favStr);
      }
    };

    /**
     * Check if a covnerter is marked as favourite
     *
     * @param {string} converterKey
     * @return {*}
     */
    const isFavourite = (converterKey: string) => {
      const favsStored = localStorage.getItem("favs");
      let favsObj = null;
      if (favsStored !== null) {
        try {
          favsObj = JSON.parse(favsStored);
        } catch (e) {}
      }
      if (favsObj !== null) {
        return typeof favsObj[converterKey] !== "undefined" ? true : false;
      } else {
        return false;
      }
    };

    /**
     * Render a card for converter
     *
     * @param {ConverterMeta} converter
     * @return {*}
     */
    const renderConverterCard = (converter: ConverterMeta) => {
      const avatarKey = converter.name
        .split(" ")
        .slice(0, 2)
        .map((e) => e.charAt(0))
        .join("")
        .toUpperCase();
      return (
        <Grid
          item
          container
          xs={12}
          md={4}
          lg={3}
          xl={2}
          key={converter.converterKey}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          style={{
            paddingBottom: "20px",
          }}
        >
          <Card sx={{ maxWidth: 340 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: converter.ascentColor,
                    color: "white",
                    borderColor: "white",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  }}
                  aria-label={converter.name}
                  title={converter.name}
                  variant="rounded"
                >
                  {avatarKey}
                </Avatar>
              }
              action={
                <IconButton
                  aria-label="add to dashboard"
                  title="add to dashboard"
                  onClick={() => {
                    props.onSelect(converter.converterKey);
                  }}
                >
                  <AddCircleOutline />
                </IconButton>
              }
              title={converter.name}
              subheader=""
            />
            <CardMedia
              component="img"
              height="194"
              image="/logo512.png"
              alt="Logo"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {converter.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label={
                  isFavourite(converter.converterKey)
                    ? "remove from favourites"
                    : "add to favourites"
                }
                title={
                  isFavourite(converter.converterKey)
                    ? "remove from favourites"
                    : "add to favourites"
                }
                onClick={() => {
                  toggleFavourite(converter);
                }}
              >
                <FavoriteIcon
                  sx={{
                    color: (theme) =>
                      isFavourite(converter.converterKey)
                        ? theme.palette.secondary.main
                        : "auto",
                  }}
                />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      );
    };

    useEffect(() => {
      setFoundComponents(Object.values(ConverterMap));
      if (searchText.trim().length > 0) {
        const foundList = [];
        const searchTextLC = searchText.toLowerCase();
        for (const value of Object.values(ConverterMap)) {
          // Check for the category
          if (searchMode === "NORMAL" && selectedCategory !== null) {
            if (selectedCategory.category !== value.category) {
              continue;
            }
          }
          if (value.name.toLowerCase().includes(searchTextLC)) {
            foundList.push(value);
          }
        }
        setFoundComponents(foundList);
      }
    }, [searchText, selectedCategory, searchMode]);

    return (
      <Grid
        container
        item
        spacing={2}
        justifyContent="right"
        direction="row"
        alignItems="flex-start"
        sx={{
          backgroundColor: (theme) => {
            return theme.palette.background.default;
          },
        }}
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          padding: "0px",
          width: "80vw",
          height: "87vh",
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
            Add Converters
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
        <Grid
          container
          justifyContent="center"
          direction="row"
          alignItems="flex-start"
          spacing={5}
          style={{
            padding: "20px",
            paddingTop: "0px",
            margin: "0xpx",
          }}
        >
          <Grid item xs={12}>
            <Item>
              <TextField
                id="text"
                label="Search !"
                variant="outlined"
                autoFocus
                value={searchText}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchText(event.currentTarget.value);
                }}
                sx={{ width: 3 / 4 }}
                style={{
                  paddingTop: "0px",
                  margin: "0px",
                }}
              />
            </Item>
          </Grid>
          {/* Render the categories */}
          <Grid container item xs={12} spacing={1} justifyContent="center">
            <Grid item>
              <Chip
                label="All"
                color={
                  searchMode === "NORMAL" && selectedCategory === null
                    ? "primary"
                    : "default"
                }
                variant={
                  searchMode === "NORMAL" && selectedCategory === null
                    ? "filled"
                    : "outlined"
                }
                onClick={() => handleCategoryClick(null)}
              />
            </Grid>
            <Grid item>
              <Chip
                label="Favourites"
                color={searchMode === "FAV" ? "primary" : "default"}
                variant={searchMode === "FAV" ? "filled" : "outlined"}
                onClick={() => handleCategoryClick("FAV")}
              />
            </Grid>
            {Categories.map((category) => (
              <Grid item>
                <Chip
                  label={category.label}
                  color={
                    searchMode === "NORMAL" &&
                    selectedCategory?.category === category.category
                      ? "primary"
                      : "default"
                  }
                  variant={
                    searchMode === "NORMAL" &&
                    selectedCategory?.category === category.category
                      ? "filled"
                      : "outlined"
                  }
                  onClick={() => handleCategoryClick(category)}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            item
            container
            spacing={2}
            style={{
              height: "60vh",
              overflow: "auto",
            }}
          >
            {/* <Grid
              item
              xs={12}
              style={{
                margin: 0,
              }}
            >
              <Item>
                <Typography variant="h5">
                  Showing{" "}
                  {searchMode === "FAV"
                    ? "Favourite"
                    : selectedCategory
                    ? selectedCategory?.label
                    : "All"}{" "}
                  converters
                </Typography>
              </Item>
            </Grid> */}

            {foundConverters.map((converter) => {
              // for ALL category no need to run the filter

              if (
                searchMode === "FAV" &&
                !isFavourite(converter.converterKey)
              ) {
                return null;
              } else if (searchMode === "NORMAL" && selectedCategory !== null) {
                // do the filter
                if (converter.category !== selectedCategory.category) {
                  return null;
                }
              }
              return renderConverterCard(converter);
            })}

            {Object.keys(foundConverters).length === 0 && (
              <Grid item container spacing={2} xs={12}>
                <Grid item xs={12}>
                  <Alert severity="error"> No Converters found ! </Alert>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
);
