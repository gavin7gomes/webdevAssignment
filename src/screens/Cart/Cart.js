import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import style from "./Cart.module.css";
import { ReactComponent as CartIcon } from "../../assets/icons/Cart.svg";
import { ReactComponent as ShipIcon } from "../../assets/icons/Ship.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/Back.svg";
import CartTable from "../../components/Cards/CartTable";
import Shipping from "../../components/Cards/Shipping";

const Cart = (props) => {
  const [activeTab, setActiveTab] = useState(1);

  const handlePlaceOrder = () => {
    console.log("erfr");
  };

  const calculateTotal = () => {
    let total = 0;
    const { cartItems } = props;
    cartItems.forEach((item) => {
      const amount = item.price * item.quantity;
      total = total + amount;
    });
    console.log(total);
    return total;
  };

  return (
    <LoaderWrapper>
      <NavigationLayout>
        <div className={style.container}>
          <div className={style.header}>
            <div className={style.title}>Shopping Cart</div>
            <div className={style.cartNav}>
              <div
                className={style.cartIcon}
                style={{
                  backgroundColor: activeTab === 1 ? "lightblue" : null,
                }}
              >
                <CartIcon />
              </div>
              <hr />
              <div
                className={style.shippingIcon}
                style={{
                  backgroundColor: activeTab === 2 ? "lightblue" : null,
                }}
              >
                <ShipIcon />
              </div>
            </div>
          </div>

          <div className={style.cartContainer}>
            {activeTab === 1 ? (
              <CartTable data={props.cartItems} />
            ) : (
              <Shipping data={props.cartItems} />
            )}
          </div>
          <div
            className={style.cartFooter}
            style={{
              justifyContent: activeTab === 2 ? "space-between" : "flex-end",
            }}
          >
            {activeTab === 2 && (
              <div className={style.backButton} onClick={() => setActiveTab(1)}>
                <BackIcon />
                <p>Go to Cart</p>
              </div>
            )}
            <div className={style.checkoutContainer}>
              <div className={style.totalPrice}>
                Total Rs. {calculateTotal()}/-
              </div>
              {activeTab === 2 ? (
                <div
                  className={style.checkoutButton}
                  onClick={handlePlaceOrder}
                >
                  <p>Place Order</p>
                </div>
              ) : (
                <div
                  className={style.checkoutButton}
                  onClick={() => setActiveTab(2)}
                >
                  <p>Checkout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </NavigationLayout>
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
