import * as React from "react";

import {
  Typography,
  AppBar,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  Button,
} from "@mui/material";

import { PhotoCamera } from "@mui/icons-material";

const classes = {
  MyThemeComponent: {
    backgroundColor: "red",
  },
  Buttons: {
    marginTop: "40px",
  },
  cardGrid: {
    padding: "20px 0",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
};

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function MuiTest() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PhotoCamera />
          <Typography variant="h6">Photo Album</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Container fixed>
            <Typography variant="h2" align="center" color="textPrimary">
              Photo Album
            </Typography>
            <Typography
              varient="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat
              culpa atque, vitae quia cumque doloremque deleniti minima
              repellat! Assumenda et provident fugit sed corrupti dolores a
              cumque! Tempore, quis quaerat?
            </Typography>

            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained">See My Photos</Button>
                </Grid>

                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary Action
                  </Button>
                </Grid>
              </Grid>
            </div>

            <Container maxWidth="lg" style={classes.cardGrid}>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card style={classes.card}>
                      <CardMedia
                        style={classes.cardMedia}
                        image={"https://source.unsplash.com/random/" + card}
                        title="Image title"
                      />
                      <CardContent style={classes.cardContent}>
                        <Typography variant="h5">Heading {card}</Typography>

                        <Typography varient="h6">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          {" "}
                          View
                        </Button>
                        <Button size="small" color="primary">
                          {" "}
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Container>
        </div>
      </main>
    </>
  );
}

export default MuiTest;
