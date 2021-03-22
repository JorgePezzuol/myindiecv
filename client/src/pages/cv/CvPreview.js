import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import "./print.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 40,
    float: "left",
    // pageBreakAfter: "always",
    // breakInside: "avoid",
  },
  bold: {
    fontWeight: 600,
  },
  sectionTitle: {
    fontWeight: 600,
    letterSpacing: "2px",
  },
  subTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  normalText: {
    fontSize: "0.8rem",
    fontWeight: "lighter",
  },
  employment: {
    fontSize: "0.8rem",
    fontWeight: 600,
  },
  nameSurname: {
    fontSize: "2rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "2px",
  },
}));

function escapeHtml(text) {
  var map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
}

const CvPreview = () => {
  const classes = useStyles();
  return (
    <div id="wrapper" className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box mb={2}>
            <Typography className={classes.nameSurname}>Jorge</Typography>
            <Typography className={classes.nameSurname}>Pezzuol</Typography>
            <Typography className={classes.normalText}>
              Fullstack Developer
            </Typography>
            <br />
            <Divider />
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>DE</u>TAILS
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography className={classes.subTitle}>PHONE</Typography>
            <Typography className={classes.normalText}>+35199999999</Typography>
          </Box>
          <Box mb={4}>
            <Typography className={classes.subTitle}>EMAIL</Typography>
            <Typography className={classes.normalText}>
              jorge_pezzuol@hotmail.com
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>LI</u>NKS
            </Typography>
          </Box>
          <Box mb={4}>
            <a target="_blank" href="https://www.google.com">
              <Typography className={classes.normalText}>Linkedin</Typography>
            </a>
            <br />
            <a target="_blank" href="https://www.google.com">
              <Typography className={classes.normalText}>Github</Typography>
            </a>
          </Box>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>SK</u>ILLS
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography className={classes.normalText}>
              PHP - Laravel, Symfony, Yii, Wordpress
            </Typography>
          </Box>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>LA</u>NGUAGES
            </Typography>
          </Box>
          <Box mb={3}>
            <Grid direction="column">
              <Grid item>
                <Typography className={classes.normalText}>English</Typography>
                <progress value="16" max="96"></progress>
              </Grid>
              <Grid item>
                <Typography className={classes.normalText}>Italian</Typography>
                <progress value="32" max="96"></progress>
              </Grid>
              <Grid item>
                <Typography className={classes.normalText}>
                  Portuguese
                </Typography>
                <progress value="80" max="96"></progress>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={1} style={{ maxWidth: "3.33%" }}>
          <Divider
            style={{ position: "relative", top: "-32px" }}
            orientation="vertical"
          />
        </Grid>
        <Grid item sm={8}>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>PR</u>OFILE
            </Typography>
          </Box>
          <Box mb={4}>
            <Typography className={classes.normalText}>
              Fullstack devloper and ex university Professor with ayears of
              experience in software engineering - into LAMP and MERN Stacks
            </Typography>
          </Box>
          <Box mb={4}>
            <Divider />
          </Box>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>EM</u>PLOYMENT HISTORY
            </Typography>
          </Box>
          <Box mb={4}>
            <Grid container spacing={4}>
              <Grid item sm={10}>
                <Typography className={classes.employment}>
                  Senior Developer, Findmore Consulting
                </Typography>
                <Typography className={classes.normalText}>
                  Jun 2020 - Present
                </Typography>
                <Box mt={2}>
                  <Typography className={classes.normalText}>
                    Project related to a large legacy e-commerce platform from a
                    German company.
                    <br />
                    <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                  </Typography>
                </Box>
              </Grid>
              <Grid item sm={2}>
                <Typography className={classes.normalText}>Lisbon</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box mb={4}>
            <Divider />
          </Box>
          <Box mb={3}>
            <Typography className={classes.sectionTitle}>
              <u>ED</u>UCATION
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item sm={10}>
              <Typography className={classes.employment}>
                Degree in Analysis and Systems Development
              </Typography>
              <Typography className={classes.normalText}>
                Jun 2020 - Present
              </Typography>
              <Box mt={2}>
                <Typography className={classes.normalText}>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography className={classes.normalText}>Sao Paulo</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item sm={10}>
              <Typography className={classes.employment}>
                Degree in Analysis and Systems Development
              </Typography>
              <Typography className={classes.normalText}>
                Jun 2020 - Present
              </Typography>
              <Box mt={2}>
                <Typography className={classes.normalText}>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography className={classes.normalText}>Sao Paulo</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CvPreview;
