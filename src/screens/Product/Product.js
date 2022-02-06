import React, { Component } from "react";
import { connect } from "react-redux";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import {
  changeCartItemQuantity,
  addToCart,
} from "../../store/actions/cartActions";
import { fetchProductById } from "../../store/actions/productActions";
import style from "./Product.module.css";

export class Product extends Component {
  state = {
    loading: false,
  };

  setLoading = (loading) => {
    this.setState({ loading });
  };
  componentDidMount() {
    const urlIdParam = parseInt(this.props.match.params.id);
    if (urlIdParam) {
      this.setLoading(true);
      this.props.fetchProductById(urlIdParam);
      this.setLoading(false);
    }
  }

  onSelect = (e) => {
    const value = parseInt(e.target.value);
    this.props.changeCartItemQuantity(this.props.currentProduct.id, value);
  };

  render() {
    const { loading } = this.state;
    const { currentProduct, cartItems } = this.props;
    let alreadyAddedToCart = false;
    Object.values(cartItems).forEach((i) => {
      if (i.id === currentProduct.id) {
        alreadyAddedToCart = true;
        return;
      }
    });
    return (
      <LoaderWrapper loading={loading}>
        <NavigationLayout>
          <div className={style.container}>
            <div className={style.leftContainer}>
              <div className={style.imageContainer}>
                <img src={currentProduct.image} alt={currentProduct.name} />
              </div>
              <div className={style.detailsContainer}>
                <p className={style.productName}>{currentProduct.name}</p>
                <p className={style.productBrand}>{currentProduct.brand}</p>
                <p className={style.productSupplier}>
                  {`By ${currentProduct.supplier}`}
                </p>
                <p className={style.productPrice}>
                  {`MRP Rs. ${currentProduct.price}/-`}
                </p>
                <div className={style.ratingsContainer}>
                  <p className={style.productdescription}>
                    {`Ratings: ${currentProduct.ratings}`}
                  </p>
                  {currentProduct.in_stock > 0 && (
                    <div className={style.quantityContainer}>
                      <p>Choose Quantity: </p>
                      <select
                        name="quantity"
                        id="quantity"
                        onChange={this.onSelect}
                      >
                        {Array.from(
                          { length: currentProduct.in_stock },
                          (_, i) => i + 1
                        ).map((q) => (
                          <option key={q} value={q}>
                            {q}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                {currentProduct.in_stock === 0 ? (
                  <div style={{ color: "red" }}>
                    <strong>Out of Stock</strong>
                  </div>
                ) : (
                  <div
                    className={style.addToCartButton}
                    onClick={
                      alreadyAddedToCart
                        ? null
                        : () => this.props.addToCart(currentProduct)
                    }
                  >
                    {alreadyAddedToCart ? (
                      <p>Already Added</p>
                    ) : (
                      <p>Add to Cart</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={style.secondComponent}>
            <p className={style.productdescription}>
              {currentProduct.description}
            </p>
            <p style={{ color: "red" }}>
              {currentProduct.needsPrescription &&
                "This product needs a doctor prescription. Please upload your prescription"}
            </p>
            <input type="file" />
          </div>
          <div className={style.rightContainer}>
            <div
              className={style.cartCTA}
              onClick={() => this.props.history.push("/cart")}
            >
              <p>View Cart</p>
            </div>
          </div>
        </NavigationLayout>
      </LoaderWrapper>
    );
  }
}

const mapStateToProps = ({ product, cart }) => ({
  currentProduct: product.currentProduct,
  cartItems: cart.cartItems,
});

const mapDispatchToProps = {
  fetchProductById,
  changeCartItemQuantity,
  addToCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
