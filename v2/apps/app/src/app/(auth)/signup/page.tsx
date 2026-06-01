import { SignupForm } from "./form";
import { Sparkles } from "lucide-react";

export const metadata = { title: "Crea tu cuenta · PsiCare" };

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8" data-testid="signup-page">
      <div className="w-full max-w-md fade-up">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E8A0BF, #D88AAB)" }}>
            <Sparkles className="text-white" size={22} />
          </div>
          <div>
            <h1 className="font-display text-3xl leading-none">PsiCare</h1>
            <p className="text-xs uppercase tracking-widest mt-1" style={{ color: "var(--psi-soft)" }}>únete</p>
          </div>
        </div>
        <h2 className="font-display text-5xl mb-3">Crea tu cuenta 🌸</h2>
        <p className="mb-8" style={{ color: "var(--psi-soft)" }}>Gratis para 1 paciente. Sin tarjeta. Cancela cuando quieras.</p>
        <SignupForm />
      </div>
    </div>
  );
}
