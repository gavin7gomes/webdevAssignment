import React from "react";
import { ReactComponent as Loader } from "../../assets/icons/loader.svg";

const LoaderWrapper = ({ loading, ...props }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "fixed",
          display: loading ? "flex" : "none",
          zIndex: 100,
        }}
      >
        <Loader />
      </div>
      {props.children}
    </div>
  );
};

export default LoaderWrapper;
