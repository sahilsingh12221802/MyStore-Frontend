import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SigninSignup from "./pages/SigninSignup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import authApi from "./api/auth";
import cartApi from "./api/cart";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsSignedIn(true);
      fetchCart();
    }
  }, []);

  const fetchCart = async () => {
    try {
      const cart = await cartApi.getCart();
      setCartItems(cart.cartItems);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    fetchCart();
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      authApi.logout(); // Clear the token
      setIsSignedIn(false); // Set signed-in state to false
      setCartItems([]); // Clear the cart
      setShowCart(false); // Hide the cart page
      toast.success("Logged out successfully!");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await cartApi.addProductToCart(productId, 1); // Add product to cart with quantity 1
      fetchCart(); // Refresh the cart
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await cartApi.updateProductInCart(productId, quantity);
      fetchCart();
      toast.success("Cart updated!");
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update cart.");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartApi.updateProductInCart(productId, 0); // Set quantity to 0 to remove the item
      fetchCart();
      toast.success("Product removed from cart!");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove product from cart.");
    }
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await cartApi.checkout();
      setCartItems([]); // Clear the cart
      toast.success("Checkout successful!");
    } catch (error) {
      console.error("Failed to checkout:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isSignedIn ? (
        <>
          <nav className="bg-blue-500 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">My Store</h1>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Cart ({cartItems.length})
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
          {showCart ? (
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
            />
          ) : (
            <Products onAddToCart={handleAddToCart} />
          )}
        </>
      ) : (
        <SigninSignup onSignIn={handleSignIn} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;