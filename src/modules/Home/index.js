import React, { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import Products from '../../components/Products'

const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async ()  => {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    console.log(data)
    setProducts(data)
  }
  fetchProducts()
}, [])

  return (
    <>
    <Hero/>
    {
      products.length > 0 ?
      <Products products={products} />
      :
      <div>Loading.....</div>
    }
    <Products/>

    </>
  )
}

export default Home
