import React, { Component } from "react";
import NavStyle from "./Nav.module.css";
import { ReactComponent as Cart } from "../../assets/icons/CartIcon.svg";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
  handleNavigation = (route) => {
    this.props.history.push(route);
  };

  render() {
    return (
      <div className={NavStyle.navbar__container}>
        <div className={NavStyle.logo__container}>
          <p onClick={() => this.handleNavigation("/dashboard")}>EasyPharm</p>
        </div>
        <div className={NavStyle.navigation__container}>
          <div onClick={() => this.handleNavigation("/products")}>
            Order Medicines
          </div>
          <div onClick={() => this.handleNavigation("/doctor")}>
            Book a Doctor
          </div>
          <div onClick={() => this.handleNavigation("/lab")}>Book Lab Test</div>
          <div>
            Cart
            <Cart />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
