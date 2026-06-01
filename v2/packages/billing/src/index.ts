/**
 * PsiCare Billing Module — Mercado Pago integration (México)
 *
 * STATUS: SCAFFOLD with feature-flag logic working + Mercado Pago stubs.
 * To go live, configure:
 *   MP_ACCESS_TOKEN=APP_USR-... (from https://www.mercadopago.com.mx/developers)
 *   MP_WEBHOOK_SECRET=...
 *   MP_PUBLIC_KEY=APP_USR-...
 *
 * Endpoints (to implement when live):
 *   POST /api/billing/checkout  → crea preapproval (preapproval_plan_id)
 *   POST /api/billing/webhook   → recibe events (payment.created, subscription.authorized)
 *   POST /api/billing/cancel    → cancela suscripción
 *
 * Plans (defined in @psicare/types):
 *   free → 1 paciente max, sin recordatorios, sin Google Calendar sync
 *   pro  → ilimitado, 99 MXN/mes o 999 MXN/año (ahorra 189 MXN/año)
 */

import { PLANS, type Plan, type Subscription } from "@psicare/types";

export { PLANS };
export type { Plan, Subscription };

export function getPlanById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function canAddPaciente(currentCount: number, plan: Plan): { allowed: boolean; reason?: string } {
  if (plan.max_pacientes === null) return { allowed: true };
  if (currentCount >= plan.max_pacientes) {
    return {
      allowed: false,
      reason: `Tu plan ${plan.nombre} permite máximo ${plan.max_pacientes} paciente${plan.max_pacientes === 1 ? "" : "s"}. Actualiza a Pro para pacientes ilimitados.`,
    };
  }
  return { allowed: true };
}

export function hasFeature(plan: Plan, feature: "whatsapp_reminders" | "google_calendar_sync" | "export_pdf" | "soap_templates" | "stats_advanced"): boolean {
  if (plan.id === "pro") return true;
  return false;
}

/* ===== Mercado Pago — Stubs (replace with real SDK when keys are set) ===== */

export interface CheckoutInput {
  organization_id: string;
  plan_id: "pro";
  ciclo: "mensual" | "anual";
  payer_email: string;
}

export interface CheckoutResult {
  init_point: string;
  preapproval_id: string;
}

export async function createCheckout(input: CheckoutInput): Promise<CheckoutResult> {
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    // STUB MODE — devuelve un init_point falso para que la UI funcione end-to-end
    return {
      init_point: `/checkout/mock?plan=${input.plan_id}&ciclo=${input.ciclo}&org=${input.organization_id}`,
      preapproval_id: `mock_${Date.now()}`,
    };
  }
  // TODO: implement real Mercado Pago preapproval creation
  // const res = await fetch("https://api.mercadopago.com/preapproval", { ... });
  throw new Error("Mercado Pago real integration pending — set MP_ACCESS_TOKEN and uncomment implementation");
}

export async function verifyWebhook(payload: unknown, signature: string): Promise<boolean> {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return process.env.NODE_ENV !== "production"; // permitir en dev
  // TODO: validar HMAC con secret
  return true;
}
