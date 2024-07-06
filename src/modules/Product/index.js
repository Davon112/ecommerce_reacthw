import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
    const {id} =useParams();
    
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);
    console.log(id, 'id', product)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = (product) => {
        console.log(product)
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const isProductExist = cart.find(item=> item.id === product.id)
        if (isProductExist) {
            const updatedCart = cart.map(item => {
                if(item.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity +1
                    }
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        } else {
            localStorage.setItem('cart', JSON.stringify([...cart, {...product, quantity: 1}]))
        }
    }


 
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="Product" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                        <p className="leading-relaxed">{product.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                            <button
                                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;