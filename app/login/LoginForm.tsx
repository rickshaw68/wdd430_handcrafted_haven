"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <form 
      action={loginAction} 
      className="w-full max-w-sm p-8 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col gap-5"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-sm text-slate-500">Please enter your details.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Email Field */}
        <div>
          <label className="text-xs font-semibold text-slate-700 uppercase" htmlFor="email">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email"
            placeholder="you@example.com" 
            className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          {state?.errors?.email && <p className="text-xs text-red-500 mt-1">{state.errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="text-xs font-semibold text-slate-700 uppercase" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
          {state?.errors?.password && <p className="text-xs text-red-500 mt-1">{state.errors.password}</p>}
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      disabled={pending} 
      type="submit"
      className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
    >
      {pending ? "Authenticating..." : "Login"}
    </button>
  );
}
