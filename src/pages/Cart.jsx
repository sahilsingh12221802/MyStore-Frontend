import CartItem from "../components/CartItem";

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.cost * item.quantity,
      0
    );
  
    const handleCheckout = async () => {
      try {
        await onCheckout();
        alert("Checkout successful!");
      } catch (error) {
        alert(error.message);
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.product._id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
              />
            ))}
            <div className="text-right">
              <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Cart;