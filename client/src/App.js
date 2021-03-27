import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/cv/Dashboard";
import Edit from "./pages/cv/Edit";
import Signup from "./pages/Signup";
import CvPreview from "./pages/cv/CvPreview";
import CvPrint from "./pages/cv/CvPrint";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Signin} exact path="/login" />
        <Route component={Signup} exact path="/signup" />
        <PrivateRoute component={Dashboard} exact path="/dashboard" />
        <PrivateRoute component={Edit} exact path="/cv/edit/:cvId" />
        <PrivateRoute
          component={CvPreview}
          exact
          path="/cv/preview/:userName/:cvId"
        />
        <Route component={CvPrint} exact path="/cv/print/:cvId" />
      </Switch>
    </Router>
  );
};

export default App;
