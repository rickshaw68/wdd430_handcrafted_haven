
import { decrypt } from '@/app/lib/session';
import { cookies } from 'next/headers';
import SellerDashboard from './SellerDashboard'
import postgres from 'postgres';
import { getSellerProfile } from '@/app/lib/actions';
import SellerProductList from '@/components/SellerProductList';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function Page() {

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
 if (!session?.userId) {
    
    return <div>Unauthorized</div>; 
  }
  const sellerData =  await getSellerProfile(session.userId);
  if(!sellerData){
    return<div>Profile not found.</div>;
  }
  return (<SellerDashboard user={sellerData} userId={session.userId}>
      <SellerProductList userId={session.userId} />
    </SellerDashboard>
  );
}


// 'use client';

// import { useState } from 'react';
// import { updateProfile } from '@/app/lib/actions'; // Your Server Action
// import { useRouter } from 'next/navigation';

// export default function UserDashboard({ user, userId }: { user: any, userId: string }) {
//   const [activeTab, setActiveTab] = useState<'account' | 'orders'>('account');
//   const [isEditing, setIsEditing] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const [orders, setOrders] = useState([
//     { id: 101, productName: 'Handcrafted Vase', status: 'Pending', date: '2026-06-09' },
//     { id: 102, productName: 'Woven Basket', status: 'Pending', date: '2026-06-10' },
//     { id: 103, productName: 'Ceramic Mug', status: 'Confirmed', date: '2026-06-10' },
//     { id: 104, productName: 'Wool Scarf', status: 'Pending', date: '2026-06-11' },
//     { id: 105, productName: 'Wooden Tray', status: 'Cancelled', date: '2026-06-11' },
//   ]);

// const handleAction = (id: number, action: 'Confirmed' | 'Cancelled') => {
//     setOrders(prev => prev.map(o => o.id === id ? { ...o, status: action } : o));
//   };

//   // Handle Profile Update
//   async function handleProfileSubmit(formData: FormData) {
//     const fn = formData.get('firstName') as string;
//     const ln = formData.get('lastName') as string;
//     const result = await updateProfile(userId, formData);

//     if (!fn.trim() || !ln.trim()) {
//       setError("Name fields cannot be empty!");
//       return;
//     } 


//     if (result.error) {
//       setError(result.error);
//     } else if (result.needsRelogin) {
//       // Force navigation to login if password was changed
//       router.push('/login');
//     }else{
//       setError(null);
//       setIsEditing(false);
//       window.location.reload(); 
//     }
//   }
//   return (
//   <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
//     <h1 className="text-2xl font-bold mb-6 text-black">My Dashboard</h1>

//     {/* ADD THIS SECTION BACK IN */}
//     <div className="flex gap-4 border-b mb-6 text-black">
//       <button 
//         onClick={() => setActiveTab('account')} 
//         className={`pb-2 ${activeTab === 'account' ? 'border-b-2 border-cyan-500 font-bold' : ''}`}
//       >
//         Account Details
//       </button>
//       <button 
//         onClick={() => setActiveTab('orders')} 
//         className={`pb-2 ${activeTab === 'orders' ? 'border-b-2 border-cyan-500 font-bold' : ''}`}
//       >
//         My Orders
//       </button>
//     </div>

//     {/* Now the logic for the tabs will work */}
//     {activeTab === 'account' ? (
//       !isEditing ? (
//         <div className="space-y-4 text-black">
//           <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <button onClick={() => setIsEditing(true)} className="text-sm text-cyan-600 underline">Edit Profile</button>
//         </div>
//       ) : (
//         <form action={handleProfileSubmit} className="space-y-4 text-black">
//           {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
//           <input name="firstName" defaultValue={user.firstname} className="border p-2 w-full rounded" placeholder="First Name" />
//           <input name="lastName" defaultValue={user.lastname} className="border p-2 w-full rounded" placeholder="Last Name" />
//           <input name="password" type="password" placeholder="New Password (optional)" className="border p-2 w-full rounded" />
//           <div className="flex gap-2">
//             <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded">Save Changes</button>
//             <button type="button" onClick={() => setIsEditing(false)} className="text-gray-500 px-4 py-2">Cancel</button>
//           </div>
//         </form>
//       )
//     ) : (
//       <table className="w-full text-left text-black">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2">Product</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => (
//             <tr key={order.id} className="border-b">
//               <td className="py-2">{order.productName}</td>
//               <td>{order.status}</td>
//               <td className="flex gap-2">
//                 {order.status === 'Pending' && (
//                   <>
//                     <button onClick={() => handleAction(order.id, 'Confirmed')} className="bg-green-500 text-white px-2 py-1 rounded text-xs">Accept</button>
//                     <button onClick={() => handleAction(order.id, 'Cancelled')} className="bg-red-500 text-white px-2 py-1 rounded text-xs">Cancel</button>
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     )}
//   </div>
// );

// }
























// "use client";

// import { KpiCard } from "@/components/KpiCard";
// import { dashboardKpiData } from "@/data/dashboard";
// import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react";


// const getIcon = (id: number) => {
//   switch (id) {
//     case 1: return <DollarSign size={20} />;
//     case 2: return <ShoppingBag size={20} />;
//     case 3: return <Users size={20} />;
//     case 4: return <TrendingUp size={20} />;
//     default: return null;
//   }
// };

// export default function Dashboard() {
  
//   return (
//     <main className="p-8 max-w-5xl mx-auto bg-stone-50">
//       <h1 className="text-2xl font-bold text-stone-900">Welcome back, Admin</h1>
//       <p className="text-stone-600 mb-8">Here's what's happening with your marketplace today</p>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {dashboardKpiData.map((kpi) => (
//           <KpiCard 
//             key={kpi.id}
//             title={kpi.title}
//             value={kpi.value}
//             trend={kpi.trend}
//             icon={getIcon(kpi.id)}
//           />
//         ))}
//       </div>
//     </main>
//   );
// }