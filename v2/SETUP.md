# 🌸 PsiCare — Setup Guide

## ✅ Lo que ya está hecho

- Monorepo Turborepo con `apps/app` (Next.js), `apps/marketing`, `apps/desktop` (Tauri), `apps/mobile` (Expo)
- Packages compartidos: `@psicare/db`, `@psicare/types`, `@psicare/ui`, `@psicare/billing`, `@psicare/whatsapp`, `@psicare/calendar`, `@psicare/jobs`
- App de la psicóloga: Login, Signup, Dashboard, Calendario, Pacientes (lista + perfil con tabs), Plan de intervención (drag&drop), Notas de sesión, Estadísticas, Ajustes, Billing
- Landing pública con SEO en `apps/marketing`
- Tu Supabase URL ya configurada en `apps/app/.env.local`
- App corriendo en preview (puerto 3000) — Login y Signup conectados a TU proyecto Supabase

---

## 🔥 PASO CRÍTICO: Ejecutar las migraciones SQL en Supabase

Antes de que el signup funcione completamente, necesitas correr el SQL inicial que crea las tablas, RLS, triggers y schema:

### 1️⃣ Abre tu proyecto Supabase
👉 https://supabase.com/dashboard/project/yglrlpbkikbxuzuvlwjq

### 2️⃣ SQL Editor
- Click en **SQL Editor** en el menú lateral
- Click **New Query**

### 3️⃣ Copia y pega el contenido de:
```
/app/v2/packages/db/migrations/0001_init.sql
```
(es un solo archivo, ~250 líneas)

### 4️⃣ Click **Run** ▶️

Esto crea:
- 🏢 Tabla `organizations` (multi-tenant)
- 👩‍⚕️ Tabla `psicologas` (extiende auth.users)
- 🧑 Tablas `pacientes`, `sesiones`, `tasks`, `recordatorios`, `archivos`
- 💳 Tablas `subscriptions`, `payments`
- 📋 Tabla `audit_log`
- 🔒 **Row Level Security policies** en todas las tablas
- ⚡ **Trigger `handle_new_user`** que crea organization + psicologa + suscripción free automáticamente al registrarse

### 5️⃣ Crear bucket de Storage (manual)
- En el dashboard de Supabase: **Storage → New bucket**
- Name: `expedientes` · Private
- Después puedes agregar policies para que solo los miembros de la org accedan a sus archivos

### 6️⃣ Obtener `SUPABASE_SERVICE_ROLE_KEY`
- En Supabase: **Project Settings → API → Project API keys → service_role**
- Copia el secret (NO lo expongas en cliente)
- Pégalo en `/app/v2/apps/app/.env.local`:
  ```
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
  ```
- Reinicia el frontend: `sudo supervisorctl restart frontend`

### 7️⃣ (Opcional) Desactivar confirmación por email
Para testear más rápido sin esperar emails:
- **Authentication → Providers → Email**
- Desactiva **Confirm email** durante desarrollo

---

## ✅ Una vez hecho el setup SQL

Crea tu cuenta desde `/signup` y deberías llegar al **Dashboard** automáticamente.

---

## 🚀 Integraciones pendientes (estructura lista)

Todas estas tienen **stubs funcionando** que devuelven datos mock en dev. Para activarlas en producción, agrega las env vars en `apps/app/.env.local` y descomenta el código real en los packages correspondientes:

| Integración | Env vars necesarias | Archivo |
|---|---|---|
| **Mercado Pago** | `MP_ACCESS_TOKEN`, `MP_PUBLIC_KEY`, `MP_WEBHOOK_SECRET` | `packages/billing/src/index.ts` |
| **WhatsApp Meta** | `WHATSAPP_PROVIDER=meta`, `META_WA_PHONE_ID`, `META_WA_TOKEN` | `packages/whatsapp/src/index.ts` |
| **WhatsApp Twilio** | `WHATSAPP_PROVIDER=twilio`, `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_FROM` | `packages/whatsapp/src/index.ts` |
| **Google Calendar** | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` | `packages/calendar/src/index.ts` |
| **Trigger.dev** | `TRIGGER_API_KEY` | `packages/jobs/src/index.ts` |

Cada package tiene un comentario JSDoc al inicio con instrucciones detalladas.

---

## 📦 Desktop (Tauri)

Ver `apps/desktop/README.md`. **Requiere compilación local** (Tauri necesita Rust toolchain y bundling nativo, no disponible en este container Linux).

## 📱 Mobile (Expo + RN)

Ver `apps/mobile/README.md`. **Widgets nativos iOS/Android** requieren `expo prebuild` + código Swift/Kotlin, también desde tu máquina local.

---

## 🎨 Vista del marketing

La landing pública está en `apps/marketing`. Solo puedo correr UNA app en :3000 a la vez (la principal `apps/app`). Para ver marketing:
```bash
cd /app/v2/apps/marketing && yarn dev  # corre en :3001
```
O cuando despliegues, marketing va a `psicare.mx` y app a `app.psicare.mx`.
