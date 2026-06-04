'use client' // Required for onClick

import { logout } from "../login/actions"

export default function Dashboard() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    // 'flex-col' stacks the items vertically
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      
      <button 
        onClick={handleLogout}
        className="w-fit py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95 disabled:opacity-50"
      >
        Logout
      </button>
    </div>
  )
}