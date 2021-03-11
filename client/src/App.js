import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Signin from "./pages/Signin";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/cv/Dashboard";
import EditCV from "./pages/cv/EditCV";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route render={() => <p>/</p>} exact path="/" />
        <Route component={Signin} exact path="/login" />
        <PrivateRoute component={Signin} path="/profile" exact />
        <Route component={Dashboard} exact path="/dashboard" />
        <Route component={EditCV} exact path="/cv/edit/:id" />
        <Route component={Signup} exact path="/signup" />
      </Switch>
    </Router>
  );
}

export default App;
