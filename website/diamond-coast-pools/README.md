# Diamond Coast Pools Website

A professional lead-generating website for Diamond Coast Pools, a pool service business serving Danbury, TX and the greater Houston/Galveston County area.

## Features

- **5 Complete Pages**: Homepage, About, Services, Contact, Service Area
- **Lead Capture System**: Form submissions saved to database with email notifications
- **Admin Dashboard**: Password-protected lead management (CRUD operations)
- **Mobile-First Design**: Fully responsive across all devices
- **SEO Optimized**: Meta tags, semantic HTML, local keywords
- **Professional Design**: Blue/teal color scheme optimized for pool industry

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM (SQLite/PostgreSQL)
- Nodemailer (email notifications)

## Quick Start

### 1. Clone and Install

```bash
cd /website/diamond-coast-pools
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - Database connection (SQLite for local, PostgreSQL for production)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` - Email configuration
- `SMTP_FROM` - From address for lead notifications
- `SMTP_TO` - Where to send lead notifications (Mike's email)
- `ADMIN_PASSWORD` - Password for admin dashboard
- `NEXT_PUBLIC_URL` - Your domain

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 5. Access Admin Dashboard

Visit `http://localhost:3000/admin` and enter your admin password.

## Deployment to Railway

### Option 1: Using Railway CLI

1. Install Railway CLI: `npm install -g @railway/cli`
2. Login: `railway login`
3. Create project: `railway init`
4. Add PostgreSQL: `railway add --database postgres`
5. Deploy: `railway up`

### Option 2: Using Railway Dashboard

1. Push code to GitHub
2. Create new project in Railway dashboard
3. Add PostgreSQL database service
4. Connect GitHub repo
5. Set environment variables in Railway dashboard
6. Deploy

### Environment Variables for Railway

In Railway dashboard, set these environment variables:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
SMTP_FROM=leads@diamondcoastpools.com
SMTP_TO=mike@diamondcoastpools.com
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_URL=https://your-domain.com
```

### Custom Domain Setup

1. In Railway dashboard, go to your service Settings
2. Click "Custom Domain"
3. Add your domain (e.g., `diamondcoastpools.com`)
4. Copy the CNAME record provided
5. Add CNAME record in your DNS provider pointing to Railway
6. Wait for SSL certificate to be issued

## Email Configuration

### Using SendGrid (Recommended)

1. Create SendGrid account at sendgrid.com
2. Create an API key with "Mail Send" permissions
3. Verify your sender email or domain
4. Use `apikey` as SMTP_USER and your API key as SMTP_PASS

### Using Gmail

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
```

Note: Use an App Password, not your regular Gmail password.

## Project Structure

```
app/
├── api/leads/          # API routes for lead submission and admin
├── admin/              # Admin dashboard page
├── about/              # About page
├── contact/            # Contact page
├── services/           # Services page
├── service-area/       # Service area page
├── layout.tsx          # Root layout
├── page.tsx            # Homepage
└── globals.css         # Global styles
components/             # React components
├── Navbar.tsx
├── Footer.tsx
├── Hero.tsx
├── TrustBar.tsx
├── ProblemSolution.tsx
├── ServicesGrid.tsx
├── ServiceArea.tsx
└── LeadForm.tsx
lib/
├── db.ts               # Prisma client
├── email.ts            # Email sending utility
└── utils.ts            # Utility functions
prisma/
└── schema.prisma       # Database schema
public/                 # Static assets
```

## Lead Management

### Admin Dashboard

- View all leads with contact info, service needs, and status
- Update lead status: new → contacted → scheduled → completed
- Password protected
- Mobile-friendly interface

### Lead Notifications

Every form submission triggers:
1. Database entry creation
2. Email notification to Mike
3. Admin dashboard availability

## Customization

### Update Phone Number

Edit these files:
- `components/Navbar.tsx`
- `components/Hero.tsx`
- `app/contact/page.tsx`
- `app/about/page.tsx`
- `components/Footer.tsx`

### Update Email

Edit `components/Footer.tsx` and `lib/email.ts`

### Add Photos

Replace placeholder divs in:
- `components/Hero.tsx` - Hero image
- `app/about/page.tsx` - Mike's photo
- `app/services/page.tsx` - Service photos
- `app/contact/page.tsx` - Map

Use Next.js Image component for optimal loading:
```tsx
import Image from 'next/image'
<Image src="/photo.jpg" alt="Description" width={800} height={600} />
```

## SEO Checklist

- [ ] Update `NEXT_PUBLIC_URL` in production
- [ ] Add Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Update phone number across all pages
- [ ] Add real photos when available
- [ ] Verify email notifications work
- [ ] Test all forms

## Support

For issues or questions:
1. Check Railway logs: `railway logs`
2. Verify environment variables are set
3. Check database connection
4. Test email configuration

## License

Built for Diamond Coast Pools. All rights reserved.