import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import style from "../../screens/OrderMeds/OrderMeds.module.css";
import { addToCart } from "../../store/actions/cartActions";

export class ProductCard extends Component {
  handleProductClick = (id) => {
    this.props.history.push(`/products/${id}`);
  };

  addToCart = (currProduct) => {
    this.props.addToCart(currProduct);
  };

  render() {
    const { product, cartItems } = this.props;
    let alreadyAddedToCart = false;
    Object.values(cartItems).forEach((i) => {
      if (i.id === product.id) {
        alreadyAddedToCart = true;
        return;
      }
    });
    return (
      <div className={style.productContainer}>
        <div
          onClick={() => this.handleProductClick(product.id)}
          style={{ cursor: "pointer" }}
        >
          <div className={style.mainImageContainer}>
            <img src={product.image} alt={product.name} />
          </div>
          <p className={style.productName} title={product.name}>
            {product.name}
          </p>
          <p className={style.productBrand}>{product.brand}</p>
          <p className={style.productPrice}>{`MRP Rs.${product.price}/-`}</p>
        </div>
        <div
          className={
            product.in_stock === 0
              ? style.outOfStockButton
              : style.addToCartButton
          }
          onClick={alreadyAddedToCart ? null : () => this.addToCart(product)}
        >
          {product.in_stock === 0 ? (
            <p>Out of Stock</p>
          ) : (
            <div>
              {alreadyAddedToCart ? <p>Already Added</p> : <p>Add to Cart</p>}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cartItems: cart.cartItems,
});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductCard));
