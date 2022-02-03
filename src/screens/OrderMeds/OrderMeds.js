import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "../../components/Cards/ProductCard";
import LoaderWrapper from "../../components/LoaderWrapper/LoaderWrapper";
import NavigationLayout from "../../components/Nav/NavigationLayout";
import style from "./OrderMeds.module.css";

class OrderMeds extends Component {
  state = {
    loading: false,
  };

  setLoading = (loading) => {
    this.setState({
      loading,
    });
  };

  componentDidMount() {}

  render() {
    const { allProducts } = this.props;
    const { loading } = this.state;
    return (
      <LoaderWrapper loading={loading}>
        <NavigationLayout>
          <div className={style.mainContainer}>
            <div className={style.headerContainer}>
              <p>Order Medicines online</p>
            </div>
            <div className={style.productsContainer}>
              {Object.values(allProducts).map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        </NavigationLayout>
      </LoaderWrapper>
    );
  }
}

const mapStateToProps = ({ product }) => ({
  allProducts: product.allProducts,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderMeds);
