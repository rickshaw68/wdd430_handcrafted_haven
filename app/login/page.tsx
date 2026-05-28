// login/page.tsx

import { LoginForm } from "./LoginForm"; // Ensure the path is correct

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>Login</h1>
      <LoginForm />
    </main>
  );
}