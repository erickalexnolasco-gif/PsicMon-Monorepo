/**
 * PsiCare Background Jobs — Event-driven architecture
 *
 * STATUS: SCAFFOLD. Use Trigger.dev OR Inngest in production.
 *
 * EVENTS:
 *   SESSION_CREATED    → schedule recordatorio (24h y 2h antes) + create Google Calendar event
 *   SESSION_UPDATED    → re-schedule recordatorios + update GCal event
 *   SESSION_CANCELLED  → cancel recordatorios + delete GCal event + send cancelacion WA
 *   PAYMENT_RECEIVED   → update subscription estado → 'activa'
 *   PAYMENT_FAILED     → notify org → set estado 'pago_pendiente'
 *
 * TRIGGER.DEV setup:
 *   TRIGGER_API_KEY=tr_...
 *   yarn add @trigger.dev/sdk @trigger.dev/nextjs
 *   See trigger.config.ts and tasks/ folder when live.
 */

export type Event =
  | { type: "SESSION_CREATED"; payload: { sesion_id: string; organization_id: string } }
  | { type: "SESSION_UPDATED"; payload: { sesion_id: string } }
  | { type: "SESSION_CANCELLED"; payload: { sesion_id: string } }
  | { type: "PAYMENT_RECEIVED"; payload: { payment_id: string; subscription_id: string } }
  | { type: "PAYMENT_FAILED"; payload: { payment_id: string } };

export async function emit(event: Event): Promise<void> {
  if (!process.env.TRIGGER_API_KEY) {
    console.log("[Jobs STUB] event emitted:", event.type, event.payload);
    return;
  }
  // TODO: real Trigger.dev emit
  // await tasks.trigger(event.type, event.payload);
}
