import React, { Component } from "react";
import NavStyle from "./Nav.module.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/userActions";

class Navbar extends Component {
  state = {
    showProfile: false,
  };

  handleNavigation = (route) => {
    this.props.history.push(route);
  };

  getUserInitials = (userInfo) => {
    if (!userInfo) return;
    const fname = userInfo.first_name.charAt(0);
    const lname = userInfo.last_name.charAt(0);
    return `${fname}${lname}`;
  };

  handleAvatarClick = () => {
    this.setState({
      showProfile: !this.state.showProfile,
    });
  };

  handleLogout = async () => {
    await this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    const { showProfile } = this.state;
    const { sessionId, cartItems, userInfo } = this.props;
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
                {cartItems.length > 0 && (
                  <span className={NavStyle.cartNumber}>
                    {cartItems.length}
                  </span>
                )}
              </div>
              {userInfo.first_name && userInfo.last_name && (
                <div
                  className={NavStyle.userAvatar}
                  onClick={this.handleAvatarClick}
                >
                  <p>
                    {userInfo.first_name.charAt(0)}
                    {userInfo.last_name.charAt(0)}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
        {showProfile && (
          <div className={NavStyle.profileSidebar}>
            <p>Name: {`${userInfo?.first_name} ${userInfo?.last_name}`}</p>
            <p>Email: {`${userInfo?.email}`}</p>
            <div className={NavStyle.logoutButton} onClick={this.handleLogout}>
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({
  userInfo: user.userInfo,
  sessionId: user.sessionId,
  cartItems: Object.values(cart.cartItems),
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
