
'use client';
import { useState } from 'react';
import SellerAccountDetails from '@/components/SellerAccountDetails'
import UserOrderTable from '@/components/UserOrderTable';
import { updateSellerProfile } from '@/app/lib/actions';
import AddCraftForm from '@/components/AddCraftForm';
import SalesMovement from '@/components/SalesMovement';

interface Product { id: number; name: string; price: number; category: string; rating: number;
  image: string;
  description: string;
}
interface Order { id: number; productName: string; quantity:string; status: 'Pending' | 'Confirmed' | 'Cancelled'; total:string; date: string; }

export default function UserDashboard({ user, userId, children }: { user: any, userId: string, children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<'account' | 'orders' | 'newcraft' | 'movements'>('account');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    { id: 101, productName: 'Handcrafted Vase', quantity:'2', status: 'Pending', total:'$156', date: '2026-06-09' },
    { id: 102, productName: 'Woven Basket', quantity:'5', status: 'Cancelled',  total:'$726', date: '2026-06-10' },
    { id: 103, productName: 'Ceramic Mug', quantity:'6',status: 'Confirmed', total:'$876',date: '2026-06-10' },
    { id: 104, productName: 'Wool Scarf', quantity:'10',status: 'Pending',  total:'$856', date: '2026-06-11' },
    { id: 105, productName: 'Wooden Tray', quantity:'8',status: 'Pending',  total:'$526', date: '2026-06-11' },
  ]);

  const handleAction = (id: number, action: 'Confirmed' | 'Cancelled') => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: action } : o));
  };

 const handleProfileSubmit = async (formData: FormData) => {
  // Bind the userId to the server action
  await updateSellerProfile(userId, formData);
  window.location.reload(); // Optional: Refresh to show new data
};
 const handleNewProduct = (newProd: Product) => {
    setProducts(prev => [...prev, newProd]);
    setActiveTab('orders'); 
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-black">My Dashboard</h1>

      <div className="flex gap-4 border-b mb-6 text-black">
        <button onClick={() => setActiveTab('movements')} className={`pb-2 ${activeTab === 'movements' ? 'border-b-4 border-cyan-500 font-bold' : ''}`}>Summary</button>
        <button onClick={() => setActiveTab('orders')} className={`pb-2 ${activeTab === 'orders' ? 'border-b-4 border-cyan-500 font-bold' : ''}`}>History</button>
        <button onClick={() => setActiveTab('newcraft')} className={`pb-2 ${activeTab === 'newcraft' ? 'border-b-4 border-cyan-500 font-bold' : ''}`}>Add Product</button>
        <button onClick={() => setActiveTab('account')} className={`pb-2 ${activeTab === 'account' ? 'border-b-4 border-cyan-500 font-bold' : ''}`}>Account Details</button>
        
        
        
      </div>
        {activeTab === 'account' && <SellerAccountDetails user={user} onUpdate={handleProfileSubmit} />}
        {activeTab === 'orders' && <UserOrderTable orders={orders} onAction={handleAction} />}
        {activeTab === 'newcraft' && (<AddCraftForm userId={userId}>{children}
  </AddCraftForm>
)}
        {activeTab === 'movements' && <SalesMovement/>}   
    </div>
  );
}
