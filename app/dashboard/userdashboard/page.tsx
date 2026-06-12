'use client';

import { useState } from 'react';

// Mock Data structure
type Order = {
  id: number;
  productName: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  date: string;
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState<'account' | 'orders'>('account');
  const [orders, setOrders] = useState<Order[]>([
    { id: 101, productName: 'Handcrafted Vase', status: 'Pending', date: '2026-06-09' },
  ]);

  const handleAction = (id: number, action: 'Confirmed' | 'Cancelled') => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: action } : o));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-black">My Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        <button onClick={() => setActiveTab('account')} className={`pb-2 ${activeTab === 'account' ? 'border-b-2 border-cyan-500 font-bold' : ''}`}>Account Details</button>
        <button onClick={() => setActiveTab('orders')} className={`pb-2 ${activeTab === 'orders' ? 'border-b-2 border-cyan-500 font-bold' : ''}`}>My Orders</button>
      </div>

      {activeTab === 'account' ? (
        <div className="space-y-4 text-black">
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john@example.com</p>
          <button className="text-sm text-cyan-600 underline">Edit Profile</button>
        </div>
      ) : (
        <table className="w-full text-left text-black">
          <thead>
            <tr className="border-b">
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-2">{order.productName}</td>
                <td>{order.status}</td>
                <td className="flex gap-2">
                  {order.status === 'Pending' && (
                    <>
                      <button onClick={() => handleAction(order.id, 'Confirmed')} className="bg-green-500 text-white px-2 py-1 rounded text-xs">Accept</button>
                      <button onClick={() => handleAction(order.id, 'Cancelled')} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}