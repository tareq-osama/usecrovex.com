# Supabase Waitlist Setup

The waitlist form is now connected to Supabase! Here's what was set up:

## ✅ Completed

1. **Supabase Client Installed** - `@supabase/supabase-js` package added
2. **Database Table Created** - `waitlist` table with the following structure:
   - `id` (UUID, Primary Key)
   - `email` (TEXT, Unique, Not Null)
   - `created_at` (Timestamp)
   - `updated_at` (Timestamp)
3. **API Route Created** - `/api/waitlist` endpoint handles form submissions
4. **Form Updated** - Waitlist form now calls the API

## 🔧 Environment Variables Required

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://sphfxwsajmkgpxjryxdu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNwaGZ4d3Nham1rZ3B4anJ5eGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzU0OTYsImV4cCI6MjA2MzYxMTQ5Nn0.5wGjRTSteUHha4eKY5TNNcClarQlusZcv62pozNrsjo

# Service role key for server-side API routes (KEEP THIS SECRET - NOT FOR CLIENT-SIDE)
# Get this from: https://supabase.com/dashboard/project/sphfxwsajmkgpxjryxdu/settings/api
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ Important:** The `SUPABASE_SERVICE_ROLE_KEY` is secret and should:
- NEVER be exposed to the client
- NEVER be committed to version control
- Only be used in server-side code (API routes)

## 📋 How It Works

1. User enters email on `/waitlist` page
2. Form submits to `/api/waitlist` endpoint
3. API validates email and inserts into Supabase `waitlist` table
4. Success/error message shown to user

## 🔒 Security Features

### ✅ Implemented:
- **Service Role Key** - Only used server-side (never exposed to client)
- **Email Validation** - Format check on both client and server
- **Duplicate Prevention** - Database unique constraint prevents duplicates
- **Rate Limiting** - 5 requests per minute per IP address
- **Honeypot Field** - Hidden field that catches bots automatically
- **Row Level Security (RLS)** - Enabled as defense-in-depth
- **Input Sanitization** - Email is trimmed and lowercased

### 🔐 Security Best Practices:
- Service role key stored in environment variables (not in code)
- API route validates all inputs server-side
- Rate limiting prevents spam/abuse
- Honeypot silently rejects bot submissions
- No sensitive data exposed in client-side code

## 📊 Viewing Submissions

You can view waitlist submissions in your Supabase dashboard:
1. Go to https://supabase.com/dashboard/project/sphfxwsajmkgpxjryxdu
2. Navigate to Table Editor
3. Select `waitlist` table

## 🚀 Next Steps (Optional)

- Add email notifications when new signups occur
- Create admin dashboard to view all signups
- Export functionality for CSV downloads
- Add additional fields (name, source, etc.)

