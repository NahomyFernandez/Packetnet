import React from 'react';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
    // Mock data
    const user = {
        name: 'Alex Doe',
        email: 'alex.doe@example.com',
    };
    const orders = [
        { id: 'ORD-12345', date: '2024-05-20', total: 4200, status: 'Enviado', tracking: '1Z9999W99999999999' },
        { id: 'ORD-12344', date: '2024-05-15', total: 2800, status: 'Entregado', tracking: null },
    ];
    const addresses = [
        { type: 'Envío', street: '123 Tech Lane', city: 'Silicon Valley, CA 94043' },
        { type: 'Facturación', street: '456 Data Drive', city: 'Cyber City, TX 75001' },
    ];

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>

            {/* Dashboard Summary */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Información de Contacto</h3>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                    </div>
                     <div>
                        <h3 className="font-semibold">Último Pedido</h3>
                        <p>ID: {orders[0].id} - ${orders[0].total.toLocaleString()}</p>
                        <p>Estado: <span className="font-medium text-cyan-600">{orders[0].status}</span></p>
                    </div>
                </div>
            </div>

            {/* My Orders */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h2 className="text-xl font-bold mb-4">Mis Pedidos</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-stone-200">
                                <th className="py-2">ID Pedido</th>
                                <th className="py-2">Fecha</th>
                                <th className="py-2">Total</th>
                                <th className="py-2">Estado</th>
                                <th className="py-2">Seguimiento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-b border-stone-200/50">
                                    <td className="py-3">{order.id}</td>
                                    <td className="py-3">{order.date}</td>
                                    <td className="py-3">${order.total.toLocaleString()}</td>
                                    <td className="py-3"><span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'Enviado' ? 'bg-cyan-100 text-cyan-800' : 'bg-emerald-100 text-emerald-800'}`}>{order.status}</span></td>
                                    <td className="py-3">{order.tracking ? <a href="#" className="text-cyan-500 hover:underline">{order.tracking}</a> : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* My Info & Addresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h2 className="text-xl font-bold mb-4">Mi Información</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Nombre</label>
                            <input type="text" defaultValue={user.name} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Correo Electrónico</label>
                            <input type="email" defaultValue={user.email} className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50"/>
                        </div>
                         <Button type="submit" variant="secondary">Guardar Cambios</Button>
                    </form>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                    <h2 className="text-xl font-bold mb-4">Direcciones</h2>
                    <div className="space-y-4">
                        {addresses.map(addr => (
                            <div key={addr.type}>
                                <h3 className="font-semibold">{addr.type}</h3>
                                <p className="text-stone-600">{addr.street}</p>
                                <p className="text-stone-600">{addr.city}</p>
                            </div>
                        ))}
                    </div>
                     <Button variant="secondary" className="mt-4">Añadir Dirección</Button>
                </div>
            </div>

        </div>
    );
};

export default ProfilePage;