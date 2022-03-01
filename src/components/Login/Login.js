import React, { Component } from "react";
import { validateEmail } from "../../utils/utils";
import style from "./Login.module.css";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/userActions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    errors: {
      email: false,
      password: false,
    },
  };

  handleLoginInputs = (e) => {
    if (e.target.name === "email" && this.state.errors.email) {
      this.setState({
        errors: { ...this.state.errors, email: false },
      });
    }
    if (e.target.name === "password" && this.state.errors.password) {
      this.setState({
        errors: { ...this.state.errors, password: false },
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = async () => {
    let errors = this.state.errors;
    if (
      !this.state.email ||
      this.state.email === "" ||
      !validateEmail(this.state.email)
    ) {
      errors.email = true;
    }
    if (!this.state.password && this.state.password === "") {
      errors.password = true;
    }
    this.setState({ errors });
    if (!errors.email && !errors.password) {
      const { success } = await this.props.loginUser(
        this.state.email,
        this.state.password
      );
      if (!success) {
        this.setState({
          errorMessage: "Unable to login, please check your credentials",
        });
        return;
      }
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.innerContainer}>
          <div className={style.containerHeader}>Log In</div>
          <div className={style.inputContainer}>
            <input
              name="email"
              value={this.state.email}
              placeholder="Email"
              type="email"
              style={{
                border: this.state.errors.email ? "2px red solid" : "",
              }}
              onChange={(e) => this.handleLoginInputs(e)}
            />
          </div>
          <div className={style.inputContainer}>
            <input
              name="password"
              value={this.state.password}
              placeholder="Password"
              type="password"
              style={{
                border: this.state.errors.password ? "2px red solid" : "",
              }}
              onChange={(e) => this.handleLoginInputs(e)}
            />
          </div>
          <div className={style.loginButton} onClick={this.handleLogin}>
            <p>Go</p>
          </div>
          <p className={style.registerText}>
            Don't have an account,{" "}
            <span
              className={style.registerCta}
              onClick={this.props.showRegister}
            >
              Register
            </span>
          </p>
          {this.state.errorMessage && (
            <p className={style.errorText}>{this.state.errorMessage}</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
