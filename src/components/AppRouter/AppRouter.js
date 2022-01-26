import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouterSwitch from "./AppRouterSwitch";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <AppRouterSwitch />
      </Router>
    );
  }
}

export default AppRouter;
