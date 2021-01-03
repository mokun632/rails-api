import React, { FC } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Foods } from "./containers/Foods";
import { Orders } from "./containers/Orders";
import { Restaurants } from "./containers/Restaurants";

export const Main: FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/restaurants'>
          <Restaurants />
        </Route>
        <Route exact path='/restaurants/:restaurantsId/foods'>
          <Foods />
        </Route>
        <Route exact path='/orders'>
          <Orders />
        </Route>
      </Switch>
      {/* <Redirect to="/restaurants" path="*" /> */}
    </Router>
  );
};

ReactDOM.render(
  <Main />, document.getElementById("root")
);
