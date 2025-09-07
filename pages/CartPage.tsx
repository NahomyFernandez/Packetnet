import React from 'react';
import { useCart } from '../App';
import Button from '../components/ui/Button';
import { ICONS } from '../constants';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, itemCount, clearCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const taxes = subtotal * 0.12; // Example tax rate
  const total = subtotal + taxes;

  if (itemCount === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-stone-200">
        <h1 className="text-3xl font-bold mb-4">Tu Carrito está Vacío</h1>
        <p className="text-stone-500 mb-8">Parece que no has añadido nada a tu carrito todavía.</p>
        <Link to="/">
          <Button variant="primary">Explorar Productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-stone-200">
        <div className="flex justify-between items-center border-b border-stone-200 pb-4 mb-4">
          <h1 className="text-3xl font-bold">Tu Carrito ({itemCount} {itemCount > 1 ? 'items' : 'item'})</h1>
          <Button onClick={clearCart} variant="danger">
            Vaciar Carrito
          </Button>
        </div>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="flex items-center gap-4 border-b border-stone-100 pb-4">
              <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-contain rounded-md border border-stone-200" />
              <div className="flex-grow">
                <Link to={`/product/${item.product.id}`}>
                  <h2 className="font-semibold text-lg hover:text-cyan-600">{item.product.name}</h2>
                </Link>
                <p className="text-stone-500 text-sm">{item.product.category}</p>
                <p className="text-lg font-bold text-cyan-600 mt-1">${item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} variant="secondary">
                  <ICONS.Minus className="w-4 h-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} variant="secondary">
                  <ICONS.Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-right w-24">
                <p className="font-semibold text-lg">${(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
              <div>
                <Button onClick={() => removeFromCart(item.product.id)} variant="danger">
                  <ICONS.Trash className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 sticky top-24">
          <h2 className="text-2xl font-bold border-b border-stone-200 pb-4 mb-4">Resumen de la Orden</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-stone-600">Subtotal:</span>
              <span className="font-semibold">${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-600">Impuestos (12%):</span>
              <span className="font-semibold">${taxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-xl font-bold border-t border-stone-200 pt-4 mt-4">
              <span>Total:</span>
              <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
          <Button variant="primary" className="w-full mt-6 !py-3">
            Proceder al Pago
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;