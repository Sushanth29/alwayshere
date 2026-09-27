# 💕 Always Here

A secret little corner of the internet where she can come to talk to you—even when you're not around. No forms. No dashboard. Just intimacy and personality.

## 🌙 The Experience

Three layers:
1. **Her space** — Multiple ways to communicate (tell you something, yell, confess, save memories, write letters, late-night thoughts)
2. **Your relationship** — Timeline, inside jokes, little things about each other
3. **Your response** — Messages delivered by email, no database

## 🚀 Quick Start

### Prerequisites
- Node.js (for frontend)
- Go 1.23+ (for backend)

### Local Development

**Terminal 1 — Frontend:**
```bash
cd frontend
npm install
npm run dev
```
This starts Vite on `http://localhost:5173` with proxying to the backend.

**Terminal 2 — Backend:**
```bash
cd backend
go run main.go
```
This starts the Go server on `http://localhost:8080`.

Open `http://localhost:5173` in your browser.

### Email Configuration (Optional for Local)

For local testing, messages are just logged to the terminal. To send real emails:

1. **Copy env template:**
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Free Email Service Options:**

   **Option A: SendGrid (100 emails/day free)**
   - Sign up at https://sendgrid.com
   - Get API key
   - Use this config:
     ```
     SMTP_HOST=smtp.sendgrid.net
     SMTP_PORT=587
     SENDER_EMAIL=apikey  # literal "apikey"
     SENDER_PASSWORD=SG.your_api_key_here
     RECIPIENT_EMAIL=your-email@example.com
     ```

   **Option B: Gmail (free)**
   - Use an [App Password](https://support.google.com/accounts/answer/185833)
   - Config:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SENDER_EMAIL=your@gmail.com
     SENDER_PASSWORD=your_app_password
     RECIPIENT_EMAIL=your@gmail.com
     ```

   **Option C: Mailgun (free tier)**
   - Sign up at https://mailgun.com
   - Get SMTP credentials
   - Config:
     ```
     SMTP_HOST=smtp.mailgun.org
     SMTP_PORT=587
     SENDER_EMAIL=postmaster@your-domain
     SENDER_PASSWORD=your_api_key
     RECIPIENT_EMAIL=your-email@example.com
     ```

3. **Set environment variables** (Unix/Mac):
   ```bash
   export SMTP_HOST=smtp.sendgrid.net
   export SMTP_PORT=587
   export SENDER_EMAIL=apikey
   export SENDER_PASSWORD=SG.your_key
   export RECIPIENT_EMAIL=you@example.com
   ```

   Or (Windows PowerShell):
   ```powershell
   $env:SMTP_HOST = "smtp.sendgrid.net"
   # ... etc
   ```

4. Restart backend: `go run main.go`

## 📦 Deployment

### Single service on Render

The root `Dockerfile` builds the React app and Go API together. The Go server serves both from one origin, so the existing `/api/messages` request works in production without a separate API URL.

1. Push this project to a GitHub repository. Do not upload `backend/.env`; it is excluded by `.gitignore`.
2. In Render, choose **New > Blueprint** and connect the repository. Render will read `render.yaml` and build the web service.
3. Enter the prompted environment values in Render:
  - `SMTP_HOST` (for Gmail: `smtp.gmail.com`)
  - `SMTP_PORT` (for Gmail: `587`)
  - `SENDER_EMAIL`
  - `SENDER_PASSWORD` (use a Gmail App Password, never your normal account password)
  - `RECIPIENT_EMAIL`
4. Deploy, then open the `onrender.com` URL shown for the service.

The Blueprint uses Render's free web plan. Free services may sleep after inactivity, so the first visit after a quiet period can take a little longer to load. Wishlist entries remain in the visitor's browser and are not synchronized between devices.

For production email, use Brevo's HTTPS transactional email API because Render blocks outbound SMTP ports. Create a free Brevo account, verify the sender email address, create an API key, and add it to Render as `BREVO_API_KEY`. Keep `SENDER_EMAIL` and `RECIPIENT_EMAIL` set as well. The app continues to use SMTP locally when no Brevo API key is configured.

## 🏗️ Architecture

**Frontend** (React + Vite)
- Entrance screen with atmospheric welcome
- Portal with all communication channels
- Message rooms (each with unique personality and prompts)
- Relationship archive (timeline, shared memories, little things)
- Mobile-first responsive design
- Zero database — everything sent to backend as email

**Backend** (Go + Gin)
- `/health` — health check
- `POST /api/messages` — receive submissions, send email
- CORS enabled for front-end requests
- Environment-based configuration
- For local testing, just logs to console

## 💬 The Sections

### Communication (What she sends you)
- **Tell me something** — Completely unrestricted, no rules
- **Something I should know** — Thoughtful prompts for reflection
- **Things I can't say out loud** — Safe space for difficult feelings
- **Yell at me** — Playful, judgment-free anger channel
- **Tell me what you need** — Specific request options (listen, reassure, talk, give space)
- **Save a memory** — Archive shared moments
- **Write me a letter** — Intimate, formal communication
- **Late night corner** — For 3am thoughts that feel different

### Archive (Things you build together)
- **Our story** — Timeline of relationship milestones
- **Our little things** — Inside jokes, songs, places, the unique stuff only you understand

## 🎨 Customization

### Colors & Design
Edit `frontend/src/styles.css` to customize the aesthetic. Current palette:
- Background: `#fbf7f2` (soft cream)
- Accent: `#c78f86` (warm rose)
- Text: `#302b2b` (soft black)

### Add More Communication Sections
In `frontend/src/main.jsx`, add to the section arrays:
```javascript
const communicationSections = [
  { icon: '🎤', title: 'Your section', text: 'Description', key: 'unique_key', color: 'color_name' },
  // ...
];
```

### Populate the Archive
Fill in real data in `OurStory()` and `OurThings()` components:
- Real timeline dates from your relationship
- Actual inside jokes and memories
- Real songs you listen to together
- Places that matter to you

## 🌟 Making it Truly Yours

1. **Pick a meaningful name** — Something that's an inside joke, or reference only you two get
2. **Fill the archive with real moments** — Timeline dates, actual memories, real songs
3. **Customize the color palette** — Maybe her favorite color?
4. **Add personal touches** — Easter eggs, hidden messages, memories
5. **Make the emails personal** — Edit the email template in `main.go` to feel like you wrote it

## 📚 Stack

- **Frontend:** React + Vite
- **Backend:** Go + Gin
- **Database:** None (messages sent via email)
- **Email:** SendGrid, Gmail SMTP, or Mailgun (free tier)
- **Hosting:** Vercel (frontend) + Railway/Render (backend)

## ✋ No Cost Required

All services used have free tiers:
- Vercel: Free
- Railway/Render: Free tier available
- SendGrid: 100 emails/day free
- Gmail: Free (with app password)
- Mailgun: Free tier for development

## 📝 License

Made with an unreasonable amount of love ♡

---

**Ready to build?**
1. Customize the colors and design to match your vision
2. Fill in the relationship archive with your real moments  
3. Choose your email service
4. Deploy and give her the link

That's it. She'll find your little corner, and she'll know exactly what it means.

