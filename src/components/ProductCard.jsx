const ProductCard = ({ product, onAddToCart }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">${product.cost}</p> {/* Display the price */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductCard;