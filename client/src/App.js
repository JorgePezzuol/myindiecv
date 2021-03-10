import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Signin from "./components/Signin";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <Route render={() => <p>/</p>} exact path="/" />
        <Route render={() => <p>/home</p>} exact path="/home" />
        <Route component={Signin} exact path="/login" />
        <PrivateRoute component={Signin} path="/profile" exact />
      </Switch>
    </Router>
  );
}

export default App;
