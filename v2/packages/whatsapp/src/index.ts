/**
 * PsiCare WhatsApp Module
 *
 * STATUS: SCAFFOLD. Provider switchable via WHATSAPP_PROVIDER env (meta | twilio).
 *
 * META WHATSAPP BUSINESS:
 *   WHATSAPP_PROVIDER=meta
 *   META_WA_PHONE_ID=...
 *   META_WA_TOKEN=...
 *   Templates approved by Meta required (recordatorio_sesion, confirmacion, cancelacion).
 *
 * TWILIO:
 *   WHATSAPP_PROVIDER=twilio
 *   TWILIO_ACCOUNT_SID=...
 *   TWILIO_AUTH_TOKEN=...
 *   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
 */

export type WhatsAppTemplate = "recordatorio_sesion" | "confirmacion" | "cancelacion" | "bienvenida";

export interface SendMessageInput {
  to: string; // E.164: +52 555 1234567 → +525551234567
  template: WhatsAppTemplate;
  variables: Record<string, string>;
}

export interface SendResult {
  ok: boolean;
  message_id?: string;
  error?: string;
}

export const TEMPLATES: Record<WhatsAppTemplate, string> = {
  recordatorio_sesion: "Hola {{nombre}} 🌸, te recuerdo tu sesión con {{psicologa}} el {{fecha}} a las {{hora}}. Responde 1 para confirmar o 2 para reagendar.",
  confirmacion: "✅ Tu sesión con {{psicologa}} está confirmada para el {{fecha}} a las {{hora}}.",
  cancelacion: "Tu sesión del {{fecha}} ha sido cancelada. {{psicologa}} se pondrá en contacto para reagendar.",
  bienvenida: "Hola {{nombre}}, gracias por agendar con {{psicologa}}. Tu primera sesión es el {{fecha}}.",
};

export async function sendMessage(input: SendMessageInput): Promise<SendResult> {
  const provider = process.env.WHATSAPP_PROVIDER;
  if (!provider) {
    // STUB MODE — log and pretend OK
    console.log("[WhatsApp STUB]", input);
    return { ok: true, message_id: `stub_${Date.now()}` };
  }
  if (provider === "twilio") {
    // TODO: implementar Twilio
    return { ok: false, error: "Twilio integration pending" };
  }
  if (provider === "meta") {
    // TODO: implementar Meta WhatsApp Business API
    return { ok: false, error: "Meta WA integration pending" };
  }
  return { ok: false, error: "Unknown provider" };
}

export function renderTemplate(template: WhatsAppTemplate, vars: Record<string, string>): string {
  let body = TEMPLATES[template];
  for (const [k, v] of Object.entries(vars)) {
    body = body.replaceAll(`{{${k}}}`, v);
  }
  return body;
}
