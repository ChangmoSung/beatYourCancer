import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import PrivateRoute from "./components/routing/PrivateRoute/index.js";
import NavBar from "./components/layout/NavBar/index.js";
import SignInPage from "./components/layout/SignInPage/index.js";
import SignUpPage from "./components/layout/SignUpPage/index.js";
import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/auth";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <PrivateRoute component={NavBar} />
        <div className="container">
          <Route exact path="/" component={SignInPage} />
          <Switch>
            <Route exact path="/signUpPage" component={SignUpPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
