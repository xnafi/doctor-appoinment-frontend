# Doctor Queue — Frontend

Next.js **16.2.4** | React **19** | Tailwind **v4** | Socket.io | Zustand

---

## Pages

| Route | Description |
|---|---|
| `/` | Navigation hub |
| `/display` | 📺 Waiting room display screen — live queue + voice |
| `/book` | 🙋 Patient self-booking (1 per device/day) |
| `/doctor` | 🩺 Doctor dashboard — manage queue & appointments |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.local.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL and NEXT_PUBLIC_DOCTOR_KEY

# 3. Run dev server
npm run dev
```

App runs on http://localhost:3001 (or next available port).

---

## Environment Variables

Create `.env.local`:

```env
# Your backend URL (no trailing slash)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Doctor secret key (same as backend DOCTOR_SECRET_KEY)
NEXT_PUBLIC_DOCTOR_KEY=your-doctor-secret-key-here
```

---

## Features

### 📺 Display Screen (`/display`)
- Real-time queue via Socket.io (polls every 5s as fallback)
- **Voice announcement** using Web Speech API (Bangla + English)
- Shows: current patient, next patient, "get ready" patient
- Stats bar: total, waiting, done, skipped, cancelled
- Auto-reconnects if connection drops

### 🙋 Patient Booking (`/book`)
- Simple form: name, phone, note
- Device fingerprint via `localStorage` UUID
- One booking per device per day enforced
- Shows serial number + position in queue on success

### 🩺 Doctor Dashboard (`/doctor`)
- Secret key login (stored in localStorage via Zustand persist)
- **Queue Controls**: Call Next, Skip, Pause/Resume
- **Appointments Table**: filter by status, edit, cancel
- Add patient modal
- Live stats bar
- Real-time updates via Socket.io

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          Root layout + global CSS
│   ├── page.tsx            Home / navigation hub
│   ├── display/page.tsx    Waiting room display screen
│   ├── book/page.tsx       Patient self-booking
│   └── doctor/page.tsx     Doctor dashboard
├── components/
│   ├── ui/                 Button, Input, Badge, ConnectionStatus
│   ├── queue/              CurrentPatientCard, NextPatientCard, StatsBar, QueueTable
│   └── doctor/             DoctorLogin, QueueControls, AppointmentModal
├── hooks/
│   └── useQueue.ts         Socket.io + polling hook
├── lib/
│   ├── api.ts              Typed API client
│   ├── socket.ts           Socket.io singleton
│   └── voice.ts            Web Speech API helper
├── store/
│   ├── queueStore.ts       Zustand queue state
│   └── doctorStore.ts      Zustand doctor auth (persisted)
└── types/
    └── index.ts            Shared TypeScript types
```

---

## Deploy to Vercel

```bash
npx vercel --prod
# Set env vars in Vercel dashboard
```

Make sure `NEXT_PUBLIC_API_URL` points to your deployed backend (Railway/Render).
