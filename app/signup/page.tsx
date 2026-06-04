

import { SignupForm } from "./SignupForm"; // Ensure the path is correct

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-cyan-500 to-teal-500 items-center justify-center">
      <SignupForm/>
    </main>
  );
}