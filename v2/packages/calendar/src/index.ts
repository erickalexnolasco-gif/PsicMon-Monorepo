/**
 * PsiCare Google Calendar Module
 *
 * STATUS: SCAFFOLD.
 *
 * SETUP:
 *   1. Google Cloud Console → Create OAuth Client → Authorized redirect: <APP_URL>/api/google/callback
 *   2. Enable Google Calendar API
 *   3. Scopes: openid email profile https://www.googleapis.com/auth/calendar.events
 *   4. Set env:
 *      GOOGLE_CLIENT_ID=...
 *      GOOGLE_CLIENT_SECRET=...
 *      GOOGLE_REDIRECT_URI=...
 *
 * Flow:
 *   /api/google/connect → redirige a Google OAuth consent
 *   /api/google/callback → guarda refresh_token en psicologas.google_refresh_token
 *   On SESSION_CREATED job → crea evento en calendar primario de la psicóloga + agrega paciente como attendee
 *   On SESSION_CANCELLED → borra el evento
 */

export interface CalendarEvent {
  id?: string;
  summary: string;
  description?: string;
  start: string; // ISO
  end: string;   // ISO
  attendees?: string[];
}

export interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export function getAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "STUB",
    redirect_uri: process.env.GOOGLE_REDIRECT_URI ?? "/api/google/callback",
    response_type: "code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar.events",
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

export async function exchangeCode(code: string): Promise<GoogleTokens> {
  if (!process.env.GOOGLE_CLIENT_ID) {
    // STUB
    return { access_token: "stub", refresh_token: "stub", expires_at: Date.now() + 3600_000 };
  }
  // TODO: real implementation
  throw new Error("Implement real Google OAuth exchange");
}

export async function createEvent(refresh_token: string, event: CalendarEvent): Promise<string> {
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.log("[GCal STUB] createEvent", event);
    return `stub_event_${Date.now()}`;
  }
  // TODO: real implementation using googleapis
  throw new Error("Implement real Google Calendar createEvent");
}

export async function deleteEvent(refresh_token: string, event_id: string): Promise<void> {
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.log("[GCal STUB] deleteEvent", event_id);
    return;
  }
  // TODO
}
