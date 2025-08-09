import React from 'react';
import { useCart } from '../App';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { ICONS } from '../constants';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, itemCount } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const taxes = subtotal * 0.08; // Example 8% tax
  const total = subtotal + taxes;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200">
      <h1 className="text-3xl font-bold mb-6 border-b border-stone-200 pb-4">Carrito de Compras</h1>
      {itemCount === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-stone-600">Tu carrito está vacío.</p>
          <Link to="/">
            <Button variant="secondary" className="mt-4">Seguir Comprando</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-xl border-stone-200">
                <img src={item.product.imageUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-grow">
                  <h2 className="font-semibold text-lg">{item.product.name}</h2>
                  <p className="text-stone-500">${item.product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 rounded-full hover:bg-stone-200"><ICONS.Minus className="w-5 h-5"/></button>
                  <span className="font-semibold w-6 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 rounded-full hover:bg-stone-200"><ICONS.Plus className="w-5 h-5"/></button>
                </div>
                <p className="font-semibold w-24 text-right">${(item.product.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700">
                  <ICONS.Trash className="w-6 h-6"/>
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-stone-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impuestos (8%)</span>
                  <span>${taxes.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2 border-stone-300">
                  <span>Total</span>
                  <span>${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <Button className="w-full mt-6">Finalizar Compra</Button>
               <Link to="/" className="w-full block text-center mt-2 text-cyan-600 hover:underline text-sm">
                  Seguir Comprando
               </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;