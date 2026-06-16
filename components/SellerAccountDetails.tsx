'use client';
import { useState } from 'react';

export default function AccountDetails({ user, onUpdate }: { user: any, onUpdate: (formData: FormData) => void }) {
  const [isEditing, setIsEditing] = useState(false);

  return !isEditing ? (
    <div className="space-y-4 text-black">
      <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button 
        onClick={() => setIsEditing(true)} 
        className="font-bold text-blue-600 underline cursor-pointer"
      >
        Edit Profile
      </button>
    </div>
  ) : (
    <form action={onUpdate} className="space-y-4 text-black">
      <div className="flex gap-4">
  
  <div className="flex flex-col flex-1 gap-1">
    <label className="font-bold text-sm">First Name</label>
    <input name="firstName" defaultValue={user.firstname} className="border p-2 rounded w-full"/>
  </div>
  <div className="flex flex-col flex-1 gap-1"> 
     <label className="font-bold text-sm">Last Name</label>
    <input name="lastName" defaultValue={user.lastname} className="border p-2 rounded w-full"/>
  </div>
</div>
      
      <label><strong>Password:</strong> </label>
      <input name="password" type="password" placeholder="New Password (optional)" className="border p-2 w-full rounded" />
      <label><strong>Business Name:</strong> </label>
      <input name="shopName" defaultValue={user.shop_name} className="border p-2 w-full rounded" />
      
      <label><strong>Bio:</strong> </label>
      <textarea name="bio" defaultValue={user.bio} className="border p-2 w-full rounded" />
      <label><strong>Story:</strong> </label>
      <textarea name="story" defaultValue={user.story} className="border p-2 w-full rounded" />
      
      <div className="flex gap-2">
        <button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-200">
          Save Changes
        </button>
        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer transition-colors duration-200">
         Cancel
        </button>  
      </div>
    </form>
  );
}