
export enum Category {
  Switches = "Switches",
  Routers = "Routers",
  Firewalls = "Firewalls",
  AccessPoints = "Access Points",
  Accessories = "Accessories",
}

export enum SubCategory {
  // Switches
  Catalyst = "Catalyst",
  Meraki = "Meraki",
  Nexus = "Nexus",
  // Routers
  ISR = "ISR",
  ASR = "ASR",
  // Firewalls
  ASA = "ASA",
  Firepower = "Firepower",
  // Accessories
  Modules = "Modules",
  Cables = "Cables",
  PowerSupplies = "Power Supplies",
}

export enum ProductStatus {
    New = "New",
    Refurbished = "Reacondicionado",
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  subCategory?: SubCategory;
  price: number;
  imageUrl: string;
  status: ProductStatus;
  stock: number;
  description: string;
  specs: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'ai';
    text: string;
}
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  // Puedes añadir más campos como dirección, teléfono, etc.
  address?: {
    street: string;
    city: string;
  };

}
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // Usaremos un ID autogenerado por Firestore
  userId: string;
  createdAt: number; // Usaremos un timestamp de Unix
  items: OrderItem[];
  subtotal: number;
  taxes: number;
  total: number;
  status: 'Procesando' | 'Enviado' | 'Entregado' | 'Cancelado';
}