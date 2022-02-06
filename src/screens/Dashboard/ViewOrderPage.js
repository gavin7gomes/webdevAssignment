import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import style from "./Dashboard.module.css";
import dayjs from "dayjs";

export class ViewOrderPage extends Component {
  state = {
    currentOrder: {},
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    const order = this.props.allOrders[id];
    this.setState({
      currentOrder: order,
    });
  }
  render() {
    const { currentOrder } = this.state;
    return (
      <NavigationLayout>
        <div className={style.viewOrderContainer}>
          <h1>View Order Page</h1>
          <h3>Order Details: {currentOrder.orderId}</h3>
          <p>Name: {`${currentOrder.firstName} ${currentOrder.lastName}`}</p>
          <p>
            Adress:{" "}
            {`${currentOrder.address} ${currentOrder.pin} ${currentOrder.city} ${currentOrder.country}`}
          </p>
          <p>
            Date of order:{" "}
            {dayjs(currentOrder.createdAt).format("dddd, MMMM D, YYYY h:mm A")}
          </p>
          <p>Payment Method: {currentOrder.paymentMethod}</p>
          <p>Phone Number: {currentOrder.phone}</p>
          {currentOrder?.orderItems !== undefined &&
            Object.values(currentOrder.orderItems)?.map((item) => {
              return (
                <div key={item.id} className={style.orderItemContainer}>
                  <div>
                    <img
                      src={item.image}
                      alt=""
                      className={style.orderImageContainer}
                    />
                  </div>
                  <div>
                    <p>Name: {item.name}</p>
                    <p>Brand: {item.brand}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>MRP Rs: {item.price}/-</p>
                    <p>Total: {item.price * item.quantity}/-</p>
                  </div>
                </div>
              );
            })}
          <div style={{ fontSize: "30px" }}>
            <strong>
              Total Amount Payable: Rs. {currentOrder.amountPayable}/-
            </strong>
          </div>
        </div>
      </NavigationLayout>
    );
  }
}

const mapStateToProps = ({ order }) => ({
  allOrders: order.allOrders,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderPage);
