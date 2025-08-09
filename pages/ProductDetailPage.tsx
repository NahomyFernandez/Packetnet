import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../App';
import Button from '../components/ui/Button';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div className="text-center py-10 text-xl">Producto no encontrado.</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`${quantity} x ${product.name} añadido al carrito!`);
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-md object-cover aspect-square" />
                    {/* Add gallery thumbnails here if needed */}
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-stone-900 mb-2">{product.name}</h1>
                    <p className="text-lg text-stone-500 mb-4">{product.category} {product.subCategory && `> ${product.subCategory}`}</p>
                    <p className="text-4xl font-light text-cyan-600 mb-6">${product.price.toLocaleString()}</p>
                    
                    <div className="mb-6">
                        <p className="text-stone-700 leading-relaxed">{product.description}</p>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <p className="font-semibold">Disponibilidad:</p>
                        <p className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                            {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                        </p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <label htmlFor="quantity" className="font-semibold">Cantidad:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            min="1"
                            max={product.stock}
                            className="w-20 px-3 py-2 border border-stone-300 rounded-md bg-stone-50"
                        />
                        <Button onClick={handleAddToCart} disabled={product.stock === 0}>
                            Añadir al Carrito
                        </Button>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold border-b border-stone-200 pb-2 mb-4">Especificaciones Técnicas</h2>
                        <ul className="space-y-2">
                            {Object.entries(product.specs).map(([key, value]) => (
                                <li key={key} className="flex justify-between py-1 border-b border-stone-100">
                                    <span className="font-medium text-stone-600">{key}:</span>
                                    <span className="text-stone-800 text-right">{value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;