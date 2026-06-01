PsiCare 🌸 — Monorepo SaaS
> Software de gestión clínica para psicólogas mexicanas.
> Web (Next.js) + Escritorio (Tauri) + Móvil (Expo) — código compartido vía Turborepo.
🏗️ Arquitectura
```
psicare/
├── apps/
│   ├── app/              # 🌸 Next.js 14 App Router — app de la psicóloga
│   ├── marketing/        # 📣 Next.js — landing público con SEO (psicare.mx)
│   ├── desktop/          # 🖥️ Tauri (scaffold) — macOS/Win/Linux
│   └── mobile/           # 📱 Expo + React Native (scaffold) — iOS/Android + widgets
└── packages/
    ├── db/               # Supabase clients + schema SQL + types
    ├── types/            # Zod schemas + tipos compartidos
    ├── ui/               # Tailwind preset + utils (cn, format, dates)
    ├── billing/          # Mercado Pago + plan limits (free/pro)
    ├── whatsapp/         # WhatsApp messaging (Meta/Twilio switchable)
    ├── calendar/         # Google Calendar OAuth + sync
    └── jobs/             # Trigger.dev event-driven jobs
```
🚀 Quickstart
```bash
# 1. Instalar dependencias
yarn install

# 2. Configurar Supabase
cp apps/app/.env.local.example apps/app/.env.local
# Edita y agrega:
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#   SUPABASE_SERVICE_ROLE_KEY=...

# 3. Ejecutar el SQL en Supabase
# Abre packages/db/migrations/0001_init.sql y ejecútalo en SQL Editor de Supabase

# 4. Iniciar la app principal
yarn dev:app           # http://localhost:3000

# 5. (opcional) Iniciar marketing en paralelo
yarn dev:marketing     # http://localhost:3001
```
🌸 Stack
Layer	Tech
Frontend	Next.js 14 (App Router, RSC, Server Actions), Tailwind, shadcn/ui
State	TanStack Query, React Hook Form, Zod
Backend	Supabase (Postgres + Auth + RLS + Storage + Realtime)
Billing	Mercado Pago (suscripciones recurrentes MXN)
Jobs	Trigger.dev (recordatorios, webhooks, retries)
Messaging	Meta WhatsApp Business / Twilio
Calendar	Google Calendar API (OAuth2)
Desktop	Tauri (Rust + WebView)
Mobile	Expo + React Native + Widgets nativos
Deploy	Vercel (frontend), Supabase (DB), Trigger.dev (jobs), Expo EAS (mobile)
🔐 Seguridad clínica
Multi-tenant por `organization_id` (Row Level Security en todas las tablas)
Soft deletes con `deleted_at` (datos nunca se eliminan físicamente)
Audit log (`audit_log` tabla con `actor_id`, `action`, `diff`)
Cumplimiento NOM-024-SSA3-2012 (México) y LFPDPPP listos
Cifrado en reposo y tránsito (Supabase nativo)
💳 Modelo SaaS Freemium
Plan	Precio MXN	Pacientes	Features Pro
Free	$0	1	Plan + calendario básico
Pro	$99/mes ó $999/año	∞	+ WhatsApp + Google Calendar + PDF + SOAP + stats
El control de límites vive en `packages/billing` y se aplica tanto en backend (Server Actions) como UI.
🗓️ Eventos (Event-Driven)
Evento	Acciones
`SESSION_CREATED`	crear evento Google Calendar, programar recordatorios WhatsApp (24h/2h antes)
`SESSION_CANCELLED`	cancelar recordatorios, eliminar GCal event, enviar cancelación WA
`PAYMENT_RECEIVED`	actualizar `subscriptions.estado = 'activa'`
`PAYMENT_FAILED`	notificar a psicóloga, marcar `pago_pendiente`
📦 Despliegue
Componente	Plataforma
`apps/app`, `apps/marketing`	Vercel (auto-deploy en push a main)
Database + Auth + Storage	Supabase Cloud
Background jobs	Trigger.dev
Mobile builds	Expo EAS
Desktop builds	GitHub Actions → Releases (.dmg, .msi, .AppImage)
⚠️ Sobre el preview de Emergent
Este monorepo corre `apps/app` en el puerto 3000 (preview). La app `apps/marketing` puede correrse localmente en :3001 con `yarn dev:marketing`. El preview solo muestra una a la vez (la principal).
La conexión real a Supabase solo se valida cuando ejecutas las migraciones y configuras tu `.env.local`. El preview verifica que la app compile y arranque correctamente, no la conexión.
📖 Documentación adicional
`apps/desktop/README.md` — Setup Tauri
`apps/mobile/README.md` — Widgets nativos iOS/Android
`packages/billing/src/index.ts` — Cómo activar Mercado Pago en producción
`packages/whatsapp/src/index.ts` — Configuración Meta/Twilio
`packages/calendar/src/index.ts` — OAuth Google Calendar
`packages/jobs/src/index.ts` — Integración Trigger.dev
