import React, { Component, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
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
            backgroundColor: "red",
          }}
        >
          <Suspense fallback={<LoaderWrapper loading={true}></LoaderWrapper>}>
            <Routes>
              {Object.values(screenNames).map((path, index) => (
                <Route
                  exact
                  key={index}
                  path={path}
                  element={routes[path].component}
                />
              ))}
            </Routes>
          </Suspense>
        </div>
      </>
    );
  }
}

export default AppRouterSwitch;
