import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouterSwitch from "./AppRouterSwitch";

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppRouterSwitch />
      </BrowserRouter>
    );
  }
}

export default AppRouter;
