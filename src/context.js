import React, { Component } from 'react';
import { detailProduct, storeProducts } from './data';

const ProductContext = React.createContext();
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modelOpen: false,
    modelProduct: detailProduct,
    cartSubTotal: 0,
    cartTotal: 0,
    cartTax: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  getItem = (id) => {
    const product = this.state.products.find((item) => item.id === id);
    return product;
  };
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
  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = (id) => {
    const tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  openModel = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modelProduct: product, modelOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modelOpen: false };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          modelOpen: this.openModel,
          closeModal: this.closeModal
        }}>
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
