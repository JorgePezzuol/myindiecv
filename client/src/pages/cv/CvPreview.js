import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
// import "./print.css";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 50,
    float: "left",
    // pageBreakAfter: "always",
    // breakInside: "avoid",
  },
  verticalHr: {
    border: "none",
    borderLeft: "1px solid hsla(200, 10%, 50%,100)",
    height: "75vh",
    width: "1px",
    position: "relative",
    top: "-40px",
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
            <h1>
              JORGE
              <br />
              PEZZUOL
            </h1>
            <Typography>Fullstack Developer</Typography>
            <br />
            <Divider />
          </Box>
        </Grid>
        <Grid item sm={3}>
          <Box mb={2}>
            <Typography>DETAILS</Typography>
          </Box>
          <Box mb={1}>
            <Typography>PHONE</Typography>
            <Typography>+35199999999</Typography>
          </Box>
          <Box mb={4}>
            <Typography>EMAIL</Typography>
            <Typography>jorge_pezzuol@hotmail.com</Typography>
          </Box>
          <Box mb={2}>
            <Typography>LINKS</Typography>
          </Box>
          <Box mb={4}>
            <a href="https://www.google.com">Github</a>
            <br />
            <a href="https://www.google.com">Linkedin</a>
          </Box>
          <Box mb={2}>
            <Typography>SKILLS</Typography>
          </Box>
          <Box mb={4}>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
            <Typography>PHP - Laravel, Symfony, Yii, Wordpress</Typography>
          </Box>
          <Box mb={2}>
            <Typography>LANGUAGES</Typography>
          </Box>
          <Box mb={4}>
            <Typography>Portuguese</Typography>
            <Typography>English</Typography>
            <Typography>Italian</Typography>
          </Box>
        </Grid>
        <Grid item sm={1}>
          <Divider
            style={{ position: "relative", top: "-30px" }}
            orientation="vertical"
          />
        </Grid>
        <Grid item sm={8}>
          <Box mb={2}>
            <Typography>PROFILE</Typography>
          </Box>
          <Box mb={4}>
            <Typography>
              Fullstack devloper and ex university Professor with ayears of
              experience in software engineering - into LAMP and MERN Stacks
            </Typography>
          </Box>
          <Box mb={4}>
            <Divider />
          </Box>
          <Box mb={2}>
            <Typography>EMPLOYMENT HISTORY</Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
            <Grid item sm={10}>
              <Typography>Senior Developer, Findmore Consulting</Typography>
              <Typography>Jun 2020 - Present</Typography>
              <Box mt={2}>
                <Typography>
                  Project related to a large legacy e-commerce platform from a
                  German company.
                  <br />
                  <i>PHP - Symfony 4, Vue, MYSQL, Codeception, XDebug</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={2}>
              <Typography>Lisbon</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default CvPreview;
