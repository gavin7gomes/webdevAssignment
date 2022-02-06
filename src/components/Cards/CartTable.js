import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  changeCartItemQuantity,
  removeFromCart,
} from "../../store/actions/cartActions";
import style from "./CartTable.module.css";

export class CartTable extends Component {
  onSelect = (e, id) => {
    const value = parseInt(e.target.value);

    this.props.changeCartItemQuantity(id, value);
  };

  render() {
    const { data } = this.props;
    return (
      <div className={style.container}>
        <div className={style.tableHeader}>
          <div className={style.columnHeader}>
            <p>Product</p>
          </div>
          <div className={style.columnHeader}>
            <p>Quantity</p>
          </div>
          <div className={style.columnHeader}>
            <p>Price</p>
          </div>
          <div className={style.columnHeader}>
            <p>Amount</p>
          </div>
        </div>
        <div className={style.tableBody}>
          {data.length > 0 ? (
            data.map((product) => {
              const amount = product.quantity * product.price;
              return (
                <div className={style.tableRow} key={product.id}>
                  <div
                    className={style.tableRowItems}
                    style={{
                      justifyContent: "flex-start",
                      paddingLeft: "16px",
                    }}
                  >
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(`/products/${product.id}`)
                      }
                    >
                      {product.name}
                    </p>
                  </div>
                  <div className={style.tableRowItems}>
                    <select
                      name="quantity"
                      id="quantity"
                      onChange={(e) => this.onSelect(e, product.id)}
                    >
                      {Array.from(
                        { length: product.in_stock },
                        (_, i) => i + 1
                      ).map((q) => (
                        <option
                          key={q}
                          value={q}
                          selected={q === product.quantity ? true : false}
                        >
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={style.tableRowItems}>
                    <p>{`Rs. ${product.price}/-`}</p>
                  </div>
                  <div className={style.tableRowItems}>
                    <p>
                      {`Rs. ${amount}/-`}{" "}
                      <img
                        className={style.deleteIcon}
                        src="https://img.icons8.com/material-rounded/24/000000/filled-trash.png"
                        alt="delete"
                        onClick={() => this.props.handleRemove(product.id)}
                      />
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className={style.emptyCartDiv}>
              <p>
                Your cart is empty,{" "}
                <span
                  onClick={() => this.props.history.push("/products")}
                  className={style.cta}
                >
                  {" "}
                  Go Shoppee
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  changeCartItemQuantity,
  removeFromCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CartTable));
