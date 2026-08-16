import type { Metadata } from "next";
import Logo from "@/components/brand/Logo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Connexion — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-paper flex flex-col items-center justify-center px-6 py-24">
      <Logo className="h-6 w-auto text-ink mb-14" />
      <LoginForm />
    </div>
  );
}
