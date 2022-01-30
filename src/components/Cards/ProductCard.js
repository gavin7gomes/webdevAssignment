import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { products } from "../../data";
import style from "../../screens/OrderMeds/OrderMeds.module.css";
import { addToCart } from "../../store/actions/cartActions";

export class ProductCard extends Component {
  handleProductClick = (id) => {
    this.props.history.push(`/products/${id}`);
  };

  addToCart = (id) => {
    const currProduct = products.find((product) => product.id === id);
    this.props.addToCart(currProduct);
  };

  render() {
    const { product } = this.props;
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
          onClick={() => this.addToCart(product.id)}
        >
          {product.in_stock === 0 ? <p>Out of Stock</p> : <p>Add to Cart</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({}) => ({});

const mapDispatchToProps = {
  addToCart,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductCard));
