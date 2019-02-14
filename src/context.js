import React, { Component } from "react";
import { detailProduct, storeProducts } from "./data";

const ProductContext = React.createContext();
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: storeProducts,
    modalOpen: false,
    modelProduct: detailProduct,
    cartSubTotal: 0,
    cartTotal: 0,
    cartTax: 0
  };
  componentDidMount() {
    this.setProducts();
  }
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };
  setProducts = () => {
    let products = [];
    storeProducts.map(item => {
      const singleitem = { ...item };
      return (products = [...products, singleitem]);
    });
    this.setState(() => {
      return { products }; //ecmascript6 syntax to assign for same names
    });
  };
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
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

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modelProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    console.log("this is increment");
  };

  decrement = id => {
    console.log("this is decrement");
  };

  removeItem = id => {
    console.log("this is remove item");
  };

  clearCart = id => {
    console.log("this is clear Cart");
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
