// login/page.tsx

import { LoginForm } from "./LoginForm"; // Ensure the path is correct

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-r from-cyan-500 to-teal-500 items-center justify-center">
      <LoginForm />
    </main>
  );
}