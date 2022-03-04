import React, { Component } from "react";
import { connect } from "react-redux";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import style from "./Dashboard.module.css";
import dayjs from "dayjs";
import {
  getOrderDetailsById,
  getOrderItemsByOrderId,
} from "../../store/actions/orderActions";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";

export class ViewOrderPage extends Component {
  state = {
    currentOrder: {},
    loading: false,
  };

  setLoading = (loading) => {
    this.setState({
      loading,
    });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    this.setLoading(true);
    const { success = false, data } = await this.props.getOrderDetailsById(id);
    if (success) {
      const { success = false, dataa } =
        await this.props.getOrderItemsByOrderId(id);
      if (success) {
        const newData = dataa.reduce((acc, obj) => {
          const product = this.props.allProducts[obj.product];
          return Object.assign(acc, {
            [obj.product]: { ...product, quantity: obj.quantity },
          });
        }, {});
        console.log({ newData });
        this.setState({
          currentOrder: { ...data, orderItems: newData },
        });
      }
    } else {
      alert("Could not fetch order details, please try again later");
      this.props.history.push("/dashboard");
    }
    this.setLoading(false);
  }
  render() {
    const { currentOrder, loading } = this.state;
    return (
      <LoaderWrapper loading={loading}>
        <NavigationLayout>
          <div className={style.viewOrderContainer}>
            <h1>View Order Page</h1>
            <h3>Order Details: {currentOrder?.orderId}</h3>
            <p>
              Name: {`${currentOrder?.firstName} ${currentOrder?.lastName}`}
            </p>
            <p>
              Adress:{" "}
              {`${currentOrder?.address} ${currentOrder?.pin} ${currentOrder?.city} ${currentOrder?.country}`}
            </p>
            <p>
              Date of order:{" "}
              {dayjs(currentOrder?.createdAt).format(
                "dddd, MMMM D, YYYY h:mm A"
              )}
            </p>
            <p>Payment Method: {currentOrder?.paymentMethod}</p>
            <p>Phone Number: {currentOrder?.phone}</p>
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
                Total Amount Payable: Rs. {currentOrder?.amountPayable}/-
              </strong>
            </div>
          </div>
        </NavigationLayout>
      </LoaderWrapper>
    );
  }
}

const mapStateToProps = ({ order, product }) => ({
  allOrders: order.allOrders,
  allProducts: product.allProducts,
});

const mapDispatchToProps = {
  getOrderDetailsById,
  getOrderItemsByOrderId,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrderPage);
