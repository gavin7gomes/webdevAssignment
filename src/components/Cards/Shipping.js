import React, { Component } from "react";
import style from "./CartTable.module.css";

class Shipping extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    address: "",
    city: "",
    pin: "",
    country: "",
    paymentMethod: "cod",
    errors: {
      fname: false,
      lname: false,
      phone: false,
      address: false,
      city: false,
      pin: false,
      country: false,
    },
  };

  handleInputs = (e) => {
    if (e.target.name === "fname" && this.state.errors.fname) {
      this.setState({
        errors: { ...this.state.errors, fname: false },
      });
    }
    if (e.target.name === "lname" && this.state.errors.lname) {
      this.setState({
        errors: { ...this.state.errors, lname: false },
      });
    }
    if (e.target.name === "phone" && this.state.errors.phone) {
      this.setState({
        errors: { ...this.state.errors, phone: false },
      });
    }
    if (e.target.name === "address" && this.state.errors.address) {
      this.setState({
        errors: { ...this.state.errors, address: false },
      });
    }
    if (e.target.name === "city" && this.state.errors.city) {
      this.setState({
        errors: { ...this.state.errors, city: false },
      });
    }
    if (e.target.name === "pin" && this.state.errors.pin) {
      this.setState({
        errors: { ...this.state.errors, pin: false },
      });
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRadio = (method) => {
    this.setState({
      paymentMethod: method,
    });
  };

  render() {
    const { data } = this.props;
    return (
      <div className={style.shippingContainer}>
        <div className={style.leftShippingContainer}>
          <div className={style.shippingInfo}>
            <p>Shipping Information</p>
            <div className={style.shippingFormGroup}>
              <div className={style.inputComponent}>
                <input
                  name="fname"
                  value={this.state.fname}
                  placeholder="First Name"
                  type="text"
                  style={{
                    border: this.state.errors.fname ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
              <div className={style.inputComponent}>
                <input
                  name="lname"
                  value={this.state.lname}
                  placeholder="Last Name"
                  type="text"
                  style={{
                    border: this.state.errors.lname ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
              <div className={style.inputComponent}>
                <input
                  name="phone"
                  value={this.state.phone}
                  placeholder="Phone Number"
                  type="tel"
                  style={{
                    border: this.state.errors.phone ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
              <div className={style.inputComponent}>
                <input
                  name="address"
                  value={this.state.address}
                  placeholder="Address"
                  type="text"
                  style={{
                    border: this.state.errors.address ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
              <div className={style.inputComponent}>
                <input
                  name="city"
                  value={this.state.city}
                  placeholder="City"
                  type="text"
                  style={{
                    border: this.state.errors.city ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
              <div className={style.inputComponent}>
                <input
                  name="pin"
                  value={this.state.pin}
                  placeholder="Pincode"
                  type="number"
                  style={{
                    border: this.state.errors.pin ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
              <div className={style.inputComponent}>
                <input
                  name="country"
                  value={this.state.country}
                  placeholder="Country"
                  type="text"
                  style={{
                    border: this.state.errors.country ? "2px red solid" : "",
                  }}
                  onChange={(e) => this.handleInputs(e)}
                />
              </div>
            </div>
          </div>
          <div className={style.PaymentInfo}>
            <p>Payment Information</p>
            <div className={style.deliveryRow}>
              <div
                className={style.radio}
                onClick={() => this.handleRadio("cod")}
                style={{
                  backgroundColor:
                    this.state.paymentMethod === "" ? "white" : "green",
                }}
              ></div>
              <div className={style.text}>Cash on delivery</div>
            </div>
          </div>
        </div>
        <div className={style.rightShippingContainer}>
          <p>Your Cart</p>
          {data.map((product) => (
            <div className={style.cartPreviewRow}>
              <div className={style.cartPreviewRowItemName}>{product.name}</div>
              <div className={style.cartPreviewRowItem}>
                Rs. {product.quantity * product.price}/-
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Shipping;
