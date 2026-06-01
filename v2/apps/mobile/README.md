# 📱 PsiCare Mobile (Expo + React Native)

App móvil nativa para iOS y Android con **widgets nativos** para acceso rápido.

## Estructura
```
apps/mobile/
├── App.tsx              # Entry point
├── app.json             # Expo config
├── src/
│   ├── screens/         # Pantallas (Login, Dashboard, Calendar, etc)
│   ├── components/      # UI compartida móvil
│   ├── lib/             # Supabase client adaptado a React Native
│   └── widgets/         # Configuración widgets nativos
├── ios/
│   └── PsicareWidget/   # 📌 Widget iOS (Swift) — agregar al hacer prebuild
└── android/
    └── app/src/main/res/xml/
        └── psicare_widget_info.xml  # 📌 Widget Android (XML + Kotlin)
```

## Setup
```bash
cd apps/mobile
yarn install
cp .env.example .env  # configurar SUPABASE_URL + ANON_KEY
yarn start
```

## Reutilización con la web
- ✅ `@psicare/types` — Zod schemas y types
- ✅ `@psicare/db` — Supabase client (browser/RN compatible)
- ✅ Lógica de negocio (recordatorios, plan de intervención, etc) via Supabase

NO reutilizamos UI directamente (RN ≠ HTML), pero **mantenemos los mismos tokens de diseño** (paleta rosa, tipografía Cormorant Garamond + DM Sans) para identidad visual coherente.

## 📌 Widgets nativos — pasos

Los widgets requieren código Swift/Kotlin que **no se puede compilar en este container Linux**. Se hace desde tu máquina local:

### iOS Widget (Swift, WidgetKit)
1. Genera el proyecto nativo: `npx expo prebuild --platform ios`
2. Abre `ios/Psicare.xcworkspace` en Xcode
3. File → New → Target → **Widget Extension** → "PsicareWidget"
4. Configura el widget con SwiftUI mostrando:
   - Próxima sesión (paciente + hora)
   - Sesiones de hoy (count)
5. Comparte datos via **App Groups**: `group.mx.psicare.app`
6. Desde React Native escribe al UserDefaults compartido (`@react-native-async-storage/async-storage` + módulo nativo)

### Android Widget
1. `npx expo prebuild --platform android`
2. Agrega `android/app/src/main/res/xml/psicare_widget_info.xml`:
```xml
<appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android"
  android:minWidth="180dp" android:minHeight="110dp"
  android:initialLayout="@layout/psicare_widget"
  android:resizeMode="horizontal|vertical" android:widgetCategory="home_screen" />
```
3. Crea `PsicareWidgetProvider.kt` extendiendo `AppWidgetProvider`
4. Layout en `res/layout/psicare_widget.xml`
5. Registra en `AndroidManifest.xml`

### Comunicación RN ↔ Widget
- iOS: `AsyncStorage` con suite compartida + módulo nativo `WidgetKit.reloadAllTimelines()`
- Android: `SharedPreferences` con MODE_MULTI_PROCESS + `AppWidgetManager.updateAppWidget()`

## 🔔 Push notifications
Usa `expo-notifications` para recordatorios locales. Para recordatorios server-side (WhatsApp), ya está cubierto por el módulo `@psicare/jobs`.

## Build
```bash
eas build -p ios   # requiere cuenta Apple Developer
eas build -p android
```
