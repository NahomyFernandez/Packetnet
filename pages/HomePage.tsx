import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import { Category, SubCategory, ProductStatus } from '../types';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { useCart } from '../App';
import Button from '../components/ui/Button';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCart();
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group border border-stone-200">
            <Link to={`/product/${product.id}`}>
                <div className="relative">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-contain" />
                    <div className="absolute top-2 left-2 bg-cyan-100 text-cyan-800 text-xs font-bold px-2 py-1 rounded-full">
                       {product.category}
                    </div>
                     {product.status === ProductStatus.Refurbished && (
                         <div className="absolute top-2 right-2 bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">
                           {product.status}
                         </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-stone-900 truncate group-hover:text-cyan-600">{product.name}</h3>
                    <p className="text-2xl font-bold text-stone-800 mt-2">${product.price.toLocaleString()}</p>
                </div>
            </Link>
            <div className="p-4 pt-0">
                 <Button 
                    onClick={() => addToCart(product, 1)}
                    variant="primary"
                    className="w-full"
                >
                    Añadir al Carrito
                </Button>
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        status: 'All',
        minPrice: '',
        maxPrice: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const { category, status, minPrice, maxPrice } = filters;
            const price = product.price;
            const min = minPrice ? parseFloat(minPrice) : 0;
            const max = maxPrice ? parseFloat(maxPrice) : Infinity;

            return (
                (category === 'All' || product.category === category) &&
                (status === 'All' || product.status === status) &&
                price >= min &&
                price <= max
            );
        });
    }, [filters]);
    
    const categories = ['All', ...Object.values(Category)];
    const statuses = ['All', ...Object.values(ProductStatus)];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/4 lg:w-1/5">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2 border-stone-200">Filtros</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-stone-700">Categoría</label>
                            <select id="category" name="category" value={filters.category} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md bg-stone-50 text-stone-900">
                               {categories.map(cat => <option key={cat}>{cat}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="status" className="block text-sm font-medium text-stone-700">Estado</label>
                            <select id="status" name="status" value={filters.status} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md bg-stone-50 text-stone-900">
                                {statuses.map(stat => <option key={stat}>{stat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-stone-700">Rango de Precio</label>
                            <div className="flex items-center gap-2 mt-1">
                                <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="Min" className="w-full px-2 py-1 border border-stone-300 rounded-md bg-stone-50 text-stone-900" />
                                <span>-</span>
                                <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="Max" className="w-full px-2 py-1 border border-stone-300 rounded-md bg-stone-50 text-stone-900" />
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <section className="w-full md:w-3/4 lg:w-4/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                     <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-stone-200">
                        <h3 className="text-2xl font-semibold">No se encontraron productos</h3>
                        <p className="text-stone-500 mt-2">Intenta ajustar tus filtros.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;