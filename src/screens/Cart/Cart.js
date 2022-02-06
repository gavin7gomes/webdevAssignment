import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import style from "./Cart.module.css";
import { ReactComponent as CartIcon } from "../../assets/icons/Cart.svg";
import { ReactComponent as ShipIcon } from "../../assets/icons/Ship.svg";
import { ReactComponent as BackIcon } from "../../assets/icons/Back.svg";
import CartTable from "../../components/Cards/CartTable";
import Shipping from "../../components/Cards/Shipping";
import { v4 as uuidv4 } from "uuid";
import { placeOrder } from "../../store/actions/orderActions";
import { emptyCart, removeFromCart } from "../../store/actions/cartActions";
import { readjustProductInStock } from "../../store/actions/productActions";

const Cart = (props) => {
  const ShippingDetailsRef = useRef();
  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handlePlaceOrder = () => {
    const shippingDetails = ShippingDetailsRef.current.state;
    const orderData = {
      orderId: uuidv4(), //using temporary until backend provides
      firstName: shippingDetails.fname,
      lastName: shippingDetails.lname,
      phone: shippingDetails.phone,
      address: shippingDetails.address,
      city: shippingDetails.city,
      pin: shippingDetails.pin,
      country: shippingDetails.country,
      paymentMethod: shippingDetails.paymentMethod,
      orderItems: cartItems,
      amountPayable: calculateTotal(),
      createdAt: new Date(),
    };
    const { success } = dispatch(placeOrder(orderData));
    if (success) {
      dispatch(readjustProductInStock(cartItems)); //temp
      dispatch(emptyCart());
    }
    props.history.push("/dashboard");
  };

  const calculateTotal = () => {
    let total = 0;
    Object.values(cartItems).forEach((item) => {
      const amount = item.price * item.quantity;
      total = total + amount;
    });
    console.log(total);
    return total;
  };

  const iscartEmpty = Object.values(cartItems).length === 0;

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
              <CartTable
                data={Object.values(cartItems)}
                handleRemove={handleRemove}
              />
            ) : (
              <Shipping
                data={Object.values(cartItems)}
                ref={ShippingDetailsRef}
              />
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
                  className={
                    iscartEmpty
                      ? style.disabledCheckoutButton
                      : style.checkoutButton
                  }
                  onClick={iscartEmpty ? null : () => setActiveTab(2)}
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

export default Cart;
