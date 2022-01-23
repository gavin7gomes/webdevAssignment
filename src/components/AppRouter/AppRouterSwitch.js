import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import LoaderWrapper from "../LoaderWrapper/LoaderWrapper";
import { routes, screenNames } from "./routes";

class AppRouterSwitch extends Component {
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

export default AppRouterSwitch;
