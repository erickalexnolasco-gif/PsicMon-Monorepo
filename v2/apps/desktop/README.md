# 🖥️ PsiCare Desktop (Tauri)

App de escritorio nativa para macOS, Windows y Linux, reutilizando UI y lógica de la app web (Next.js).

## Estrategia de reutilización

**Opción A — Embed via WebView (recomendado para v1)**
Tauri embebe la URL de `apps/app` (Next.js) en producción. Cero duplicación de código.
- Pros: Mínimo trabajo, reutilización 100%, hot updates
- Cons: Requiere conexión inicial (o build estático Next.js export)

**Opción B — Tauri + React puro**
Frontend React/Vite que comparte `@psicare/ui`, `@psicare/db`, `@psicare/types`.
- Pros: Performance nativa, offline-first
- Cons: Duplicación de páginas

## Setup (cuando estés listo para compilar)

```bash
# 1) Instalar Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2) Instalar Tauri CLI
cargo install create-tauri-app --locked

# 3) Inicializar en este folder
cd apps/desktop && yarn create tauri-app
# Cuando te pregunte el framework, elige React + TypeScript + Vite

# 4) Conectar con packages del monorepo
# Edita src-tauri/tauri.conf.json → "build.devUrl": "http://localhost:3000"
# (apunta a apps/app)
```

## Compartir con web
- `@psicare/db` clients de Supabase (browser client funciona en Tauri)
- `@psicare/types` schemas Zod y tipos
- `@psicare/ui` componentes y tailwind preset
- `@psicare/billing`, `@psicare/calendar`, `@psicare/whatsapp` (server-side stays in API routes)

## Build
```bash
yarn workspace @psicare/desktop tauri build
# Genera .dmg (macOS), .msi (Win), .AppImage (Linux)
```

## Notas
- **Deep linking**: configura `tauri.conf.json > plugins > deep-link` para login social
- **Auto-update**: usa Tauri Updater + GitHub Releases
- **No se puede compilar en este entorno Linux container** — se hace desde tu máquina local
