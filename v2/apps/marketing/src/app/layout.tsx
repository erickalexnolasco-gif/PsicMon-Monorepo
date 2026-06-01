import type { Metadata } from "next";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.psicare.mx";

export const metadata: Metadata = {
  title: "PsiCare — Software para psicólogas mexicanas | Gestión clínica simple",
  description: "PsiCare es la herramienta de gestión clínica diseñada para psicólogas en México. Pacientes, calendario, plan de intervención y notas SOAP. Estética macOS, calidez profesional. Desde $99 MXN/mes.",
  keywords: ["psicólogas", "software clínico", "gestión pacientes", "calendario citas", "expediente clínico", "México", "psicoterapia", "SaaS salud mental"],
  openGraph: {
    title: "PsiCare — Tu consulta en calma",
    description: "Software de gestión clínica para psicólogas. Pacientes, sesiones, plan de intervención y recordatorios WhatsApp.",
    type: "website",
    locale: "es_MX",
    url: "https://psicare.mx",
  },
  twitter: { card: "summary_large_image", title: "PsiCare", description: "Software para psicólogas en México" },
  alternates: { canonical: "https://psicare.mx" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="es-MX"><body>{children}</body></html>;
}
