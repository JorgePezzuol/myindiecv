import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/cv/Dashboard";
import Edit from "./pages/cv/Edit";
import Signup from "./pages/Signup";
import CvPreview from "./pages/cv/CvPreview";
import CvPrint from "./pages/cv/CvPrint";

// CHECK THIS => https://material-ui.com/styles/basics/

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Dashboard} exact path="/" />
        <Route component={Signin} exact path="/login" />
        <PrivateRoute component={Signin} path="/profile" exact />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={Edit} exact path="/cv/edit/:cvId" />
        <Route component={Signup} exact path="/signup" />
        <Route component={CvPreview} exact path="/cv/preview/:userName/:cvId" />
        <Route component={CvPrint} exact path="/cv/print/:cvId" />
      </Switch>
    </Router>
  );
}

export default App;
