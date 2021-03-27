import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "../../components/utils/SnackBar";
import AlertDialogSlide from "../../components/utils/AlertDialogSlide";

import SessionAppBar from "../../components/auth/SessionAppBar";
import nocvs from "../../assets/empty.svg";
import { API_URL } from "../../utils/utils";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AddIcon from "@material-ui/icons/Add";
import CreateIcon from "@material-ui/icons/Create";
import GetAppIcon from "@material-ui/icons/GetApp";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

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
  cardContent: {
    flexGrow: 1,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [cvs, setCvs] = useState([]);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [cvToBeDeleted, setCvToBeDeleted] = useState("");
  const { push } = useHistory();

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

  const handleDelete = async (cvId) => {
    await fetch(`${API_URL}/cv/${cvId}`, {
      method: "DELETE",
      credentials: "include",
    });
    setCvs(cvs.filter((cv) => cv._id !== cvId));
    setHasDeleted(true);
    setCvToBeDeleted("");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <SessionAppBar />
      {hasDeleted && (
        <Snackbar setHasDeleted={setHasDeleted} message="CV has been deleted" />
      )}
      {cvToBeDeleted !== "" && (
        <AlertDialogSlide
          title={"Delete CV"}
          contentText={"Are you sure you want to delete this CV?"}
          handleConfirm={() => handleDelete(cvToBeDeleted)}
          handleClose={() => setCvToBeDeleted("")}
        />
      )}
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
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Create and update your CVs
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={handleCreateNewCv}
                >
                  Create New
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {cvs.length > 0 ? (
            cvs.map((cv, index) => (
              <Grid item key={index} xs={12} sm={6} md={5}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cv.name}
                    </Typography>
                    <small>
                      Updated{" "}
                      {new Date(cv.lastUpdated).toLocaleString([], {
                        timeStyle: "short",
                        dateStyle: "short",
                      })}
                    </small>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<CreateIcon />}
                      size="small"
                      color="primary"
                      onClick={() => push(`/cv/edit/${cv._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<GetAppIcon />}
                      size="small"
                      color="primary"
                      onClick={() => {
                        window.open(`${API_URL}/export/pdf/${cv._id}`);
                      }}
                    >
                      Download
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      size="small"
                      color="primary"
                      onClick={() => setCvToBeDeleted(cv._id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
            >
              <img style={{ width: "50%" }} src={nocvs} alt="No Cv" />
              <small>No CVs created</small>
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
