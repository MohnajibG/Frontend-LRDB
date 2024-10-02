const Cart = ({ cart }) => {
  return (
    <div className="cart">
      <h2>Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        cart.map((item) => (
          <div key={item.name} className="cart-item">
            <p>
              {item.name} - {item.quantity} x {item.price.toFixed(2)} €
            </p>
            <div className="cart-controls">
              <button onClick={() => handleDecrease(item)}>-</button>
              <button onClick={() => handleIncrease(item)}>+</button>
              <button onClick={() => handleRemove(item)}>x</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cart;
