import React, { Component } from 'react';
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let products = [];
    storeProducts.map((item) => {
      const singleitem = { ...item };
      return (products = [...products, singleitem]);
    });
    this.setState(() => {
      return { products }; //ecmascript6 syntax to assign for same names
    });
  };
  handleDetail = () => {
    console.log('Hello from Detail');
  };
  addToCart = () => {
    console.log('Hello from add to cart');
  };
  render() {
    return (
      <ProductContext.Provider
        value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
