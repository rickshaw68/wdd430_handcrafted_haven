'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { registerSeller } from '../lib/actions'; // Import your server action

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal');

  // 2. Initialize useFormState
  // The second argument is the initial state of the form
  const [state, formAction] = useActionState(registerSeller, { 
    success: false, 
    message: "" 
  });

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm bg-white">
      <h1 className="text-3xl font-bold mb-6 text-black">Create an account</h1>

      {/* Tab Switcher */}
      <div className="flex bg-gray-100 p-1 rounded-full mb-6">
        <button
          type="button" // Important: Prevents form submission
          onClick={() => setAccountType('personal')}
          className={`flex-1 py-2 rounded-full ${accountType === 'personal' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'text-gray-600'}`}
        >
          Personal
        </button>
        <button
          type="button"
          onClick={() => setAccountType('business')}
          className={`flex-1 py-2 rounded-full ${accountType === 'business' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'text-gray-600'}`}
        >
          Business
        </button>
      </div>

      {/* Add the action here */}
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="accountType" value={accountType} />
        {accountType === 'personal' ? (
          <>
            <div className="flex gap-2">
              <input name="firstName" type="text" placeholder="First name" className="w-1/2 border p-2 rounded text-black" required />
              <input name="lastName" type="text" placeholder="Last name" className="w-1/2 border p-2 rounded text-black" required />
            </div>
            <input name="email" type="email" placeholder="Email" className="border p-2 rounded text-black" required />
            <input name="password" type="password" placeholder="Password" className="border p-2 rounded text-black" required />
            <button type="submit" className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full mt-4 hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md cursor-pointer">
              Create personal account
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-700">Continue to register as a <strong>Seller</strong>.</p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input name="firstName" type="text" placeholder="First name" className="w-1/2 border p-2 rounded text-black" required />
                <input name="lastName" type="text" placeholder="Last name" className="w-1/2 border p-2 rounded text-black" required />
              </div>
              <input name="shopName" type="text" placeholder="Business name" className="border p-2 rounded text-black" required />
              <input name="email" type="email" placeholder="Business email" className="border p-2 rounded text-black" required />
              <input name="password" type="password" placeholder="Password" className="border p-2 rounded text-black" required />
              <textarea name="bio" placeholder="Short Bio" className="border p-2 rounded text-black h-20" maxLength={200} />
              <textarea name="story" placeholder="Your Crafting Story" className="border p-2 rounded text-black h-32" />
            </div>
            <button type="submit" className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full mt-4 hover:from-cyan-600 hover:to-teal-600 transition-all shadow-md cursor-pointer">
              Create business account
            </button>
          </>
        )}
      </form>
    </div>
  );
}