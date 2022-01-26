import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import { logoutUser } from "../../store/actions/userActions";
import LoaderWrapper from "../LoaderWrapper/LoaderWrapper";
import { routes, screenNames } from "./routes";

class AppRouterSwitch extends Component {
  componentDidMount() {
    //this.props.sessionId is added temporarily since we dont have backend inorder to fetch user data from sessionId. So that we can avoid the app routing to dashboard when sessionId is present in localStorage but not in redux
    //I know this does not make proper use of localStorage until we have backend ready
    if (localStorage.getItem("sessionId") && this.props.sessionId) {
      if (this.props.location?.pathname === screenNames.landingPage) {
        this.props.history.push(screenNames.dashboard);
      }
    } else {
      this.props.history.push(screenNames.landingPage);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.sessionId !== this.props.sessionId &&
      this.props.sessionId === ""
    ) {
      this.props.logoutUser();
    }
  }

  render() {
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Suspense fallback={<LoaderWrapper loading={true}></LoaderWrapper>}>
            <Switch>
              {Object.values(screenNames).map((path, index) => (
                <Route
                  exact
                  key={index}
                  path={path}
                  component={routes[path].component}
                />
              ))}
            </Switch>
          </Suspense>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  sessionId: user.sessionId,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppRouterSwitch));
