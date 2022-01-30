import React, { Component } from "react";
import NavStyle from "./Nav.module.css";
import { ReactComponent as Cart } from "../../assets/icons/CartIcon.svg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/userActions";

class Navbar extends Component {
  handleNavigation = (route) => {
    this.props.history.push(route);
  };

  render() {
    const { sessionId, cartItems } = this.props;
    const isUserLoggedIn = sessionId ? true : false;
    const onLogoClickRoute = sessionId ? "/dashboard" : "/";

    return (
      <div className={NavStyle.navbar__container}>
        <div className={NavStyle.logo__container}>
          <p onClick={() => this.handleNavigation(onLogoClickRoute)}>
            EasyPharm
          </p>
        </div>
        <div className={NavStyle.navigation__container}>
          {isUserLoggedIn && (
            <>
              {" "}
              <div onClick={() => this.handleNavigation("/products")}>
                Order Medicines
              </div>
              <div onClick={() => this.handleNavigation("/doctor")}>
                Book a Doctor
              </div>
              <div onClick={() => this.handleNavigation("/lab")}>
                Book Lab Test
              </div>
              <div onClick={() => this.handleNavigation("/cart")}>
                Cart
                <span className={NavStyle.cartNumber}>
                  {cartItems.length > 0 ? cartItems.length : null}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({
  sessionId: user.sessionId,
  cartItems: cart.cartItems,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));