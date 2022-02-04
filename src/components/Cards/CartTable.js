import React, { Component } from "react";
import style from "./CartTable.module.css";

export class CartTable extends Component {
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
          {data.map((product) => {
            const amount = product.quantity * product.price;
            return (
              <div className={style.tableRow}>
                <div
                  className={style.tableRowItems}
                  style={{ justifyContent: "flex-start", paddingLeft: "16px" }}
                >
                  <p>{product.name}</p>
                </div>
                <div className={style.tableRowItems}>
                  <p>{product.quantity}</p>
                </div>
                <div className={style.tableRowItems}>
                  <p>{`Rs. ${product.price}/-`}</p>
                </div>
                <div className={style.tableRowItems}>
                  <p>{`Rs. ${amount}/-`}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CartTable;
