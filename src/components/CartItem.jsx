const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{item.product.name}</h3>
        <p className="text-gray-600">${item.product.cost}</p>
      </div>
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.product._id, parseInt(e.target.value))}
          className="w-16 p-2 border rounded"
        />
        <button
          onClick={() => onRemove(item.product._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;