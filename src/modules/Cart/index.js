import React, { useState, useEffect } from 'react';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false); 

  useEffect(() => {
    fetch('https://fakestoreapi.com/carts/1') 
      .then(res => res.json())
      .then(cartData => {
        setCart(cartData.products);
        return cartData.products.map(product => product.productId);
      })
      .then(productIds => {
        const fetchProductDetails = productIds.map(id =>
          fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
        );
        return Promise.all(fetchProductDetails);
      })
      .then(productDetails => {
        const productsMap = productDetails.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        setProducts(productsMap);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching cart data:', error);
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart(cart.map(product =>
      product.productId === productId ? { ...product, quantity: newQuantity } : product
    ));
  };

  const handleRemoveProduct = productId => {
    setCart(cart.filter(product => product.productId !== productId));
  };


  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center justify-center py-8">
        <button onClick={() => setShow(!show)} className="py-2 px-10 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
          View Cart
        </button>
      </div>
      {show && (
        <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
          <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => setShow(!show)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </div>

                {cart.map(product => {
                  const productDetails = products[product.productId];
                  return (
                    <div key={product.productId} className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                      <div className="w-1/4">
                        <img src={productDetails.image} alt={productDetails.title} className="w-full h-full object-center object-cover" />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">{productDetails.category}</p>
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">{productDetails.title}</p>
                          <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none" value={product.quantity} onChange={e => handleQuantityChange(product.productId, parseInt(e.target.value))}>
                            {[...Array(10).keys()].map(num => (
                              <option key={num + 1}>{num + 1}</option>
                            ))}
                          </select>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">Price: ${productDetails.price}</p>
                        <p className="text-xs leading-3 text-gray-600 py-4">Total: ${(product.quantity * productDetails.price).toFixed(2)}</p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex items-center">
                            <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                            <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" onClick={() => handleRemoveProduct(product.productId)}>Remove</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">Subtotal</p>
                      <p className="text-base leading-none text-gray-800">${cart.reduce((acc, product) => acc + product.quantity * products[product.productId].price, 0).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">Shipping</p>
                      <p className="text-base leading-none text-gray-800">$0</p>
                    </div>
                    <div className="flex items-center justify-between pt-5">
                      <p className="text-base leading-none text-gray-800">Tax</p>
                      <p className="text-base leading-none text-gray-800">$0</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">Total</p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">${(cart.reduce((acc, product) => acc + product.quantity * products[product.productId].price, 0)).toFixed(2)}</p>
                    </div>
                    <button onClick={() => setShow(!show)} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
