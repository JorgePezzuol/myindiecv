import Fab from "@material-ui/core/Fab";
import DescriptionIcon from "@material-ui/icons/Description";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const PreviewButton = () => {
  const classes = useStyles();
  return (
    <Fab
      style={{ textTransform: "none" }}
      variant="extended"
      size="large"
      color="primary"
      aria-label="add"
      className={classes.fab}
    >
      <strong>Preview & Download</strong>
      <Box ml={1}>
        <DescriptionIcon />
      </Box>
    </Fab>
  );
};

export default PreviewButton;
