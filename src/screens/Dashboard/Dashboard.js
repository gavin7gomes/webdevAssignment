import React, { Component } from "react";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import { connect } from "react-redux";
import style from "./Dashboard.module.css";
import { placeOrder } from "../../store/actions/orderActions";
import { readjustProductInStock } from "../../store/actions/productActions";
import { emptyCart } from "../../store/actions/cartActions";
import { v4 as uuidv4 } from "uuid";

export class Dashboard extends Component {
  handleRefill = (order) => {
    console.log(order);
    const data = {
      ...order,
      createdAt: new Date(),
      orderId: uuidv4(),
    };

    const { success } = this.props.placeOrder(data);
    if (success) {
      this.props.readjustProductInStock(order.orderItems);
      this.props.emptyCart();
    }
  };

  render() {
    console.log(this.props.allOrders);
    return (
      <NavigationLayout>
        <div className={style.container}>
          <div className={style.tableHeader}>
            <div className={style.columnHeader}>
              <p>Address</p>
            </div>
            <div className={style.columnHeader}>
              <p>Order ID</p>
            </div>
            <div className={style.columnHeader}>
              <p>Order Details</p>
            </div>
            <div className={style.columnHeader}>
              <p>Amount</p>
            </div>
            <div className={style.columnHeader}>
              <p>Action</p>
            </div>
          </div>
          <div className={style.tableBody}>
            {Object.values(this.props.allOrders)
              ?.sort((a, b) => b.createdAt - a.createdAt)
              ?.map((order) => {
                return (
                  <div className={style.tableRow}>
                    <div
                      className={style.tableRowItems}
                      style={{
                        justifyContent: "flex-start",
                        paddingLeft: "16px",
                      }}
                    >
                      <p>{order.address}</p>
                    </div>
                    <div className={style.tableRowItems}>
                      <p>{order.orderId}</p>
                    </div>
                    <div className={style.tableRowItems}>
                      <p
                        onClick={() =>
                          this.props.history.push(
                            `/view-order/${order.orderId}`
                          )
                        }
                        style={{ cursor: "pointer", color: "#135ee9" }}
                      >
                        View Order
                      </p>
                    </div>
                    <div className={style.tableRowItems}>
                      <p>{`Rs. ${order.amountPayable}/-`}</p>
                    </div>
                    <div className={style.tableRowItems}>
                      <div
                        className={style.tableButton}
                        onClick={() => this.handleRefill(order)}
                      >
                        <p>Refill</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            {Object.values(this.props.allOrders).length === 0 && (
              <div className={style.emptyCartDiv}>
                <p>No transactions</p>
              </div>
            )}
          </div>
        </div>
      </NavigationLayout>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  allOrders: order.allOrders,
});

const mapDispatchToProps = {
  placeOrder,
  readjustProductInStock,
  emptyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
