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

const PreviewButton = ({ cvId, userName }) => {
  const classes = useStyles();

  return (
    <Fab
      style={{ textTransform: "none" }}
      variant="extended"
      size="large"
      color="primary"
      aria-label="add"
      className={classes.fab}
      onClick={() => {
        window.open(`/cv/preview/${userName}/${cvId}`, "_blank");
      }}
    >
      <strong>Preview & Download</strong>
      <Box ml={1}>
        <DescriptionIcon />
      </Box>
    </Fab>
  );
};

export default PreviewButton;
