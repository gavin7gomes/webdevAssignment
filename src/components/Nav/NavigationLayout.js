import React, { Component } from "react";
import NavStyle from "./Nav.module.css";
import Navbar from "./Navbar";

class NavigationLayout extends Component {
  render() {
    return (
      <div className={NavStyle.navigation__layout__container}>
        <div className={NavStyle.navigation__layout__content}>
          <div
            className={NavStyle.navigation__layout__top__navigation__container}
          >
            <Navbar />
          </div>
          <div
            className={
              NavStyle.student__navigation__layout__children__container
            }
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationLayout;
