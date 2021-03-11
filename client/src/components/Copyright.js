import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/jorge-pezzuol/">
        Jorge Pezzuol
      </Link>
    </Typography>
  );
};

export default Copyright;
