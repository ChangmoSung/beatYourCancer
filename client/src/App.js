import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./components/styles/styles.scss";
import PrivateRoute from "./components/routing/PrivateRoute/index.js";
import Alerts from "./components/layout/Alerts/index.js";
import NavBar from "./components/layout/NavBar/index.js";
import MainPage from "./components/layout/MainPage/index.js";
import SignInPage from "./components/layout/SignInPage/index.js";
import SignUpPage from "./components/layout/SignUpPage/index.js";
import Foods from "./components/layout/Foods/index.js";
import SideEffects from "./components/layout/SideEffects/index.js";
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
        <div className="wrapper">
          <Alerts />
          <Route exact path="/" component={SignInPage} />
          <Switch>
            <Route exact path="/signUpPage" component={SignUpPage} />
            <PrivateRoute exact path="/mainPage" component={MainPage} />
            <PrivateRoute exact path="/foods" component={Foods} />
            <PrivateRoute exact path="/sideEffects" component={SideEffects} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
