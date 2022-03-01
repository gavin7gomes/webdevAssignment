import React, { Component } from "react";
import { validateEmail } from "../../utils/utils";
import style from "./Register.module.css";
import { connect } from "react-redux";
import { registerUser, loginUser } from "../../store/actions/userActions";
import { withRouter } from "react-router-dom";

class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    errorMessage: "",
    errors: {
      email: false,
      password: false,
      password2: false,
      firstName: false,
      lastName: false,
    },
  };

  handleRegisterInputs = (e) => {
    if (e.target.name === "email" && this.state.errors.email) {
      this.setState({
        errors: { ...this.state.errors, email: false },
      });
    }
    if (e.target.name === "password" && this.state.errors.password) {
      this.setState({
        errors: { ...this.state.errors, password: false },
        errorMessage: "",
      });
    }

    if (e.target.name === "password2" && this.state.errors.password2) {
      this.setState({
        errors: { ...this.state.errors, password2: false },
        errorMessage: "",
      });
    }

    if (e.target.name === "firstName" && this.state.errors.firstName) {
      this.setState({
        errors: { ...this.state.errors, firstName: false },
      });
    }

    if (e.target.name === "lastName" && this.state.errors.lastName) {
      this.setState({
        errors: { ...this.state.errors, lastName: false },
      });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = async () => {
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

    if (!this.state.firstName && this.state.firstName === "") {
      errors.firstName = true;
    }

    if (!this.state.lastName && this.state.lastName === "") {
      errors.lastName = true;
    }

    if (
      this.state.password &&
      this.state.password !== "" &&
      this.state.password2 &&
      this.state.password2 !== "" &&
      this.state.password !== this.state.password2
    ) {
      errors.password = true;
      errors.password2 = true;
      this.setState({
        errorMessage: "Passwords dont match",
      });
    }

    this.setState({ errors });
    if (
      !errors.email &&
      !errors.password &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.password2
    ) {
      const registerResponse = await this.props.registerUser(
        this.state.email,
        this.state.password,
        this.state.password2,
        this.state.firstName,
        this.state.lastName
      );

      if (
        registerResponse.status === 201 &&
        registerResponse.statusText === "Created"
      ) {
        await this.props.loginUser(this.state.email, this.state.password);
        this.props.history.push("/dashboard");
      } else {
        this.setState({
          errorMessage:
            "Something went wrong, please try again. You could either be using already existing email or a very common password",
        });
      }
    }
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.innerContainer}>
          <div className={style.containerHeader}>Register</div>
          <div className={style.inputContainer}>
            <input
              name="firstName"
              value={this.state.firstName}
              placeholder="First Name"
              type="text"
              style={{
                border: this.state.errors.firstName ? "2px red solid" : "",
              }}
              onChange={(e) => this.handleRegisterInputs(e)}
            />
          </div>
          <div className={style.inputContainer}>
            <input
              name="lastName"
              value={this.state.lastName}
              placeholder="Last Name"
              type="text"
              style={{
                border: this.state.errors.lastName ? "2px red solid" : "",
              }}
              onChange={(e) => this.handleRegisterInputs(e)}
            />
          </div>
          <div className={style.inputContainer}>
            <input
              name="email"
              value={this.state.email}
              placeholder="Email"
              type="email"
              style={{
                border: this.state.errors.email ? "2px red solid" : "",
              }}
              onChange={(e) => this.handleRegisterInputs(e)}
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
              onChange={(e) => this.handleRegisterInputs(e)}
            />
          </div>
          <div className={style.inputContainer}>
            <input
              name="password2"
              value={this.state.password2}
              placeholder="Confirm Password"
              type="password"
              style={{
                border: this.state.errors.password2 ? "2px red solid" : "",
              }}
              onChange={(e) => this.handleRegisterInputs(e)}
            />
          </div>
          <div className={style.loginButton} onClick={this.handleRegister}>
            <p>Go</p>
          </div>
          <p className={style.registerText}>
            Already have an account?{" "}
            <span className={style.registerCta} onClick={this.props.showLogin}>
              Login
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
  registerUser,
  loginUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
