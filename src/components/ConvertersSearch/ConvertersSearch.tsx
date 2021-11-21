import { Avatar, Grid, TextField } from "@mui/material";
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
  (props: { onSelect: Function }, ref) => {
    const [searchText, setSearchText] = useState("");
    const [foundConverters, setFoundComponents] = useState(
      [] as ConverterMeta[]
    );
    useEffect(() => {
      setFoundComponents(Object.values(ConverterMap));
      if (searchText.trim().length > 0) {
        const foundList = [];
        const searchTextLC = searchText.toLowerCase();
        for (const value of Object.values(ConverterMap)) {
          if (value.name.toLowerCase().includes(searchTextLC)) {
            foundList.push(value);
          }
        }
        setFoundComponents(foundList);
      }
    }, [searchText]);

    return (
      <Grid
        container
        item
        spacing={2}
        justifyContent="right"
        direction="row"
        alignItems="flex-start"
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80vw",
          height: "90vh",
          backgroundColor: "white",
          border: "2px solid #000",
        }}
      >
        <Grid
          container
          xs={12}
          justifyContent="center"
          direction="row"
          alignItems="flex-start"
          spacing={5}
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
                sx={{ width: 1 / 2 }}
              />
            </Item>
          </Grid>
          {foundConverters.map((converter) => {
            const avatarKey = converter.name
              .split(" ")
              .slice(0, 2)
              .map((e) => e.charAt(0))
              .join("")
              .toUpperCase();
            return (
              <Grid item xs={3} direction="row">
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar
                        sx={{ bgcolor: converter.color }}
                        aria-label="recipe"
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
                      aria-label="add to favorites"
                      title="add to favorites"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
          {Object.keys(foundConverters).length === 0 && (
            <Grid item xs={12}>
              No components found !
            </Grid>
          )}
        </Grid>
      </Grid>
    );
  }
);
