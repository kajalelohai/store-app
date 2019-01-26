import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from './components/Product';
import NavBar from './components/Navbar';
import Details from './components/Details';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Default from './components/Default';
import {Switch,Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Details></Details>
        <ProductList></ProductList>
        <Product></Product>
        <Cart></Cart>
        <Default></Default>
      </React.Fragment>
    );
  }
}

export default App;
