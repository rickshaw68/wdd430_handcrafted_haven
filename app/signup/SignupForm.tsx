"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
//import { signup } from "./actions"; // You will need to create this action
import Link from "next/link";

export function SignupForm() {
  //const [state, signupAction] = useActionState(signup, undefined);

  return (
    <form className="w-full max-w-sm p-8 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-slate-900">Create an account</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" className="p-2 border rounded-lg text-black" required />
        <input name="lastName" placeholder="Last Name" className="p-2 border rounded-lg text-black" required />
      </div>
      
      <input name="email" type="email" placeholder="Email" className="w-full p-2 border rounded-lg text-black" required />
      <input name="phone" type="tel" placeholder="Phone Number" className="w-full p-2 border rounded-lg text-black" />
      <input name="password" type="password" placeholder="Password" className="w-full p-2 border rounded-lg text-black" required />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full p-2 border rounded-lg text-black" required />

      <button type="submit" className="w-full py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700">
        Sign Up
      </button>

      <p className="text-center text-sm text-slate-600">
        Already have an account? <Link href="/login" className="text-blue-600 font-semibold">Login</Link>
      </p>
    </form>
  );
}