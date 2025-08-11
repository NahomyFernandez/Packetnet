// pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import { useAuth } from '../App';
// Importamos también createUserProfile
import { getUserProfile, updateUserProfile, createUserProfile } from '../services/firestoreService'; 
import type { UserProfile } from '../types';

const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const loadProfile = async () => {
            if (!user) return;

            setIsLoading(true);
            try {
                let userProfile = await getUserProfile(user.uid);
                
                // --- ¡AQUÍ ESTÁ LA MAGIA! ---
                // Si el perfil no existe en Firestore, lo creamos ahora mismo.
                if (!userProfile) {
                    console.log("Perfil no encontrado, creando uno nuevo...");
                    await createUserProfile(user); // Creamos el perfil
                    userProfile = await getUserProfile(user.uid); // Y lo volvemos a cargar
                }
                
                setProfile(userProfile);

            } catch (error) {
                console.error("Error al obtener o crear el perfil:", error);
                setProfile(null); // Aseguramos que el perfil sea nulo en caso de error
            } finally {
                setIsLoading(false);
            }
        };

        loadProfile();
    }, [user]); // La dependencia sigue siendo el usuario

    // ... (el resto del componente se mantiene exactamente igual)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!profile) return;
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    
    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !profile) return;
        
        try {
            await updateUserProfile(user.uid, { name: profile.name, email: profile.email });
            alert("Perfil actualizado con éxito");
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            alert("Hubo un error al guardar los cambios.");
        }
    };
    
    if (isLoading) {
        return <div className="text-center p-8">Cargando perfil...</div>;
    }
    
    if (!profile) {
        return <div className="text-center p-8">No se pudo cargar el perfil del usuario. Por favor, intenta recargar la página.</div>;
    }

    const orders = [
        { id: 'ORD-12345', date: '2024-05-20', total: 4200, status: 'Enviado', tracking: '1Z9999W99999999999' },
        { id: 'ORD-12344', date: '2024-05-15', total: 2800, status: 'Entregado', tracking: null },
    ];
    
    return (
      <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Mi Perfil</h1>
                <Button onClick={() => setIsEditing(!isEditing)} variant="secondary">
                    {isEditing ? 'Cancelar' : 'Editar Perfil'}
                </Button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
                <h2 className="text-xl font-bold mb-4">Mi Información</h2>
                <form className="space-y-4" onSubmit={handleSaveChanges}>
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input 
                            type="text" 
                            name="name"
                            value={profile.name} 
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-50 disabled:bg-stone-200 disabled:text-stone-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Correo Electrónico</label>
                        <input 
                            type="email" 
                            name="email"
                            value={profile.email} 
                            onChange={handleInputChange}
                            disabled
                            className="mt-1 block w-full rounded-md border-stone-300 shadow-sm bg-stone-200 text-stone-500"
                        />
                    </div>
                    {isEditing && (
                        <Button type="submit" variant="primary">Guardar Cambios</Button>
                    )}
                </form>
            </div>
            
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
        </div>
    );
};
export default ProfilePage;