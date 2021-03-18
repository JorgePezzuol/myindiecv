import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Link from "@material-ui/core/Link";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as LinkRouter, useHistory } from "react-router-dom";
import SessionAppBar from "../../components/auth/SessionAppBar";
import Footer from "../../components/Footer";
import { API_URL } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [cvs, setCvs] = useState([]);
  const { push } = useHistory();

  /* Put some image showing that there are no CVs (in case theres 0)*/
  useEffect(() => {
    const fetchCvs = async () => {
      const response = await fetch(`${API_URL}/cv/user`, {
        credentials: "include",
      });
      const data = await response.json();
      setCvs(data);
    };
    fetchCvs();
  }, []);

  const handleCreateNewCv = async () => {
    const response = await fetch(`${API_URL}/cv/create`, {
      method: "POST",
      credentials: "include",
    });
    const cv = await response.json();
    push({
      pathname: `cv/edit/${cv._id}`,
      state: {
        cvId: cv._id,
      },
    });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <SessionAppBar />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
            align="center"
            color="textPrimary"
          >
            Dashboard
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Lorem ipsum asdasd asdfgdgj asdijas
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCreateNewCv}
                >
                  Create New
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Play main CV
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cvs.map((cv) => (
            <Grid item key={cv} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => push(`/cv/edit/${cv._id}`)}
                  >
                    Edit
                  </Button>
                  <Button size="small" color="primary">
                    PDF
                  </Button>
                  <Button size="small" color="primary">
                    Play
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Dashboard;
