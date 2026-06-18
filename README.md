# 📚 PageFlip — Immersive Book Reader

> *Transform any PDF into a living, breathing book — with realistic page turns, candlelight aesthetics, and an experience that makes reading feel magical again.*

![PageFlip Banner](https://img.shields.io/badge/Status-In%20Development-d4a853?style=for-the-badge&labelColor=0a0a0f)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&labelColor=0a0a0f)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&labelColor=0a0a0f)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-white?style=for-the-badge&logo=three.js&labelColor=0a0a0f)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&labelColor=0a0a0f)

---

## 🪄 What is PageFlip?

PageFlip is a web application that lets you upload any book as a PDF and read it in the most immersive way possible — as if you're holding a real physical book. Every page turn is animated with physics-accurate curl, paper textures glow under simulated candlelight, and the entire experience is designed to make you forget you're reading on a screen.

No more flat, sterile PDF viewers. No more losing your place. No more staring at harsh white backgrounds. PageFlip brings the soul back to digital reading.

---

## ❌ The Problem

We've had PDFs for decades, and the way we read them hasn't changed much. Every existing solution falls into the same trap:

- **PDF viewers** (Adobe, browser built-in) are tools built for documents, not books. Cold, flat, no sense of immersion.
- **E-readers** (Kindle, Google Play Books) only work with books purchased from their own store. Your personal PDFs are locked out.
- **Online PDF-to-flipbook converters** produce choppy, low-quality animations that look like PowerPoint transitions from 2005.
- **Reading apps** strip away all the warmth of a physical book — the texture, the weight, the feel of turning a page.

The result? People who love reading are stuck either buying the same book twice (once physically, once digitally) or suffering through a reading experience that kills the mood entirely.

---

## ✅ How PageFlip Solves It

PageFlip is built from the ground up around one goal: **make digital reading feel real**.

| Problem | PageFlip's Solution |
|---|---|
| Flat, lifeless PDF rendering | WebGL-powered page mesh with real-time vertex displacement |
| No page-turn feel | Physics-accurate curl shader — drag to turn, spring-physics snap-back |
| Harsh reading environment | Warm candlelight ambient lighting, paper texture overlays, vignette edges |
| PDFs locked to specific stores | Upload any PDF — yours, scanned, downloaded, anything |
| Losing your place | Reading progress auto-saved to cloud, opens exactly where you left off |
| Desktop-only readers | Fully responsive — dual-page spread on desktop, swipe gestures on mobile |

### How the page flip actually works

The core innovation is a **GLSL vertex shader** applied to a Three.js plane geometry. As you drag the corner of a page, a cylindrical-axis deformation displaces the vertices in real time — creating a genuine paper curl, not a flat rotation. Shadow maps update per frame, so the lighting reacts to the page as it bends. On release, spring physics decide whether to complete the flip or snap back, based on drag velocity — exactly like a real page.

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18 + Vite** | UI framework and build tooling |
| **TypeScript** | Type safety across the entire codebase |
| **Three.js / React Three Fiber** | WebGL 3D rendering engine for page flip |
| **GLSL (Vertex Shaders)** | GPU-side page curl math and paper texture |
| **react-spring** | Spring physics for page snap-back animation |
| **CSS3D Transforms** | Book-open cinematic, hover effects, library shelf |
| **PDF.js (Mozilla)** | In-browser PDF parsing and page rendering |
| **Web Audio API** | Optional ambient page-turn sound effects |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express** | REST API server |
| **Multer** | PDF file upload handling |
| **Sharp** | Cover thumbnail generation (WebP) |
| **PDF-lib** | Server-side PDF page extraction |

### Infrastructure
| Technology | Purpose |
|---|---|
| **Supabase** | Auth (email/OAuth), PostgreSQL DB, file storage |
| **AWS S3 / Supabase Storage** | PDF and page image storage with signed URLs |
| **Redis** | Page image caching for fast sequential reads |
| **Vercel** | Frontend deployment and CDN |
| **Railway** | Backend API deployment |
| **CloudFront** | CDN for page image delivery |

### Languages
- **TypeScript** — Frontend and backend logic
- **GLSL** — GPU shader programs for page curl and lighting
- **SQL** — Database schema and Supabase RLS policies
- **CSS** — UI animations and theming

---

## ✨ Current Features (Phase 1)

- Secure email authentication (sign up / sign in / sign out)
- PDF upload with drag-and-drop
- Personal book library per user
- Cloud storage for uploaded PDFs
- Reading progress persistence
- Fully responsive layout

---

## 🗺️ Roadmap

### Phase 2 — Library UI
Animated bookshelf with 3D hover tilt on covers, reading progress rings, search and filter.

### Phase 3 — Page Flip Engine *(Core)*
Full WebGL page curl with drag-to-turn, spring physics, dual-page spread, spine shadow, paper texture, and ambient page sway.

### Phase 4 — Reader Experience
Book-open cinematic, table of contents, bookmarks with fold-corner animation, rapid thumb-through, zoom, full-screen immersive mode.

### Phase 5 — Polish & Performance
Adaptive GPU quality, page prefetch strategy, dark/night reading mode, accessibility audit, service worker for offline reading.

---

## 🔮 Future Vision

These are the integrations we're most excited about building next:

### 🎵 Spotify / Music Integration
Connect your Spotify account and let PageFlip suggest ambient playlists based on the book's genre — classical for literature, lo-fi for textbooks, atmospheric soundscapes for fantasy. Music plays softly in the background as you read, automatically pausing when you close the book.

### 🎧 Audiobook Sync
Upload both the PDF and its audiobook counterpart. PageFlip will synchronize them — as the narration plays, the corresponding page turns automatically. You can read along while listening, or let the audiobook drive the experience entirely. Perfect for language learners and accessibility.

### 🌙 Reading Rooms
Themed reading environments beyond the default library — a rainy café window, a moonlit forest clearing, a spaceship viewport. Each room has its own ambient sounds, lighting temperature, and paper texture variant.

### 📖 AI Reading Companion
An integrated AI that can answer questions about the book you're currently reading, summarize chapters, translate passages, explain complex concepts, or generate discussion questions — all without leaving the reading experience.

### 👥 Social Reading
Share your library, see what friends are reading, leave margin notes that others can discover, and join synchronized reading sessions where a group turns pages together in real time.

### 📊 Reading Analytics
Track your reading speed, time per chapter, reading streaks, and estimated completion dates. Visualize your reading history across all books.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm
- A Supabase account (free tier is enough)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pageflip.git
cd pageflip

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

Create `frontend/.env.local`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Create `backend/.env`:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
```

### Run Locally

```bash
# Start frontend (from /frontend)
npm run dev

# Start backend (from /backend)
npm run dev
```

Frontend runs at `http://localhost:5173`
Backend runs at `http://localhost:3001`

---

## 📁 Project Structure

```
pageflip/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-level page components
│   │   ├── lib/              # Supabase client, utilities
│   │   ├── types/            # TypeScript interfaces
│   │   └── shaders/          # GLSL shader files (Phase 3)
│   └── public/
├── backend/
│   ├── src/
│   │   ├── routes/           # Express route handlers
│   │   ├── middleware/        # Auth, upload, validation
│   │   └── services/         # Supabase, storage, PDF logic
│   └── uploads/              # Temp upload directory
└── README.md
```

---

## 🤝 Contributing

This project is in active development. If you'd like to contribute, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with obsession for people who love books.
  <br/>
  <i>"Not all those who read are lost."</i>
</p>