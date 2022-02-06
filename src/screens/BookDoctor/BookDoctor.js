import React, { Component } from "react";
import NavigationLayout from "../../components/Nav/NavigationLayout";

export class BookDoctor extends Component {
  render() {
    return (
      <NavigationLayout>
        <div
          style={{
            width: "100%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "34px",
            fontWeight: "bold",
          }}
        >
          <p>Under Construction</p>
        </div>
      </NavigationLayout>
    );
  }
}

export default BookDoctor;
