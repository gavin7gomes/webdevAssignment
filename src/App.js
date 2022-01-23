import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import AppRouter from "./components/AppRouter/AppRouter";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

export default App;
