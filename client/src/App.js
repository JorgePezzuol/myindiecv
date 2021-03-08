import { useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

function App() {
  useEffect(() => {
    const getAllUsers = async () => {
      fetchToken();
      setTimeout(() => {
        fetchAllUsers();
      }, 300);
    };
    getAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const response = await fetch("/users", {
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const fetchToken = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: "jorge2@test.com", password: "testpass" }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <p>home</p>} />
        <Route path="/login" component={Signin} />
        <Route path="/profile" render={() => <p>profile</p>}></Route>
        {/* <PrivateRoute authed={isLoggedIn} path="/profile" component={Signin} /> */}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default App;
