
import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './modules/Home';
import Products from './components/Products';
import Product from './modules/Product';
import {Routes, Route } from 'react-router-dom'
import Cart from './modules/Cart';
import Signup from './components/Signup';
import LoginForm from './components/Login';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/products/:id' element={<Product/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<LoginForm/>} />
    </Routes>
    
    
    </>
  );
}

export default App;
