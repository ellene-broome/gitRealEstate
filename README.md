# Git Real Estate

A full-stack real estate website built one commit at a time.

Git Real Estate is a React, Express, Supabase, and Render project for a professional real estate web presence. The site includes branding, local area search links, contact lead capture, an admin leads dashboard, and a backend API. The live site is connected to a custom domain: **https://erbmoves.com**.

## Live Site

```txt
https://erbmoves.com

## Project Goals

This project is being built to support a professional real estate business with:

* Real estate branding
* Local home search guidance
* Realtor.com search links for Greater Baton Rouge area searches
* Contact form lead capture
* Backend API
* Supabase database storage
* Admin lead management
* Mobile responsive design
* Future IDX or approved search integration if available through an IDX provider

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* CSS

### Backend

* Node.js
* Express
* CORS
* dotenv
* Resend


### Database

* Supabase
* PostgreSQL

### Tools

* Git
* GitHub
* VS Code

## Current Features

* Responsive React homepage
* Real estate branding with ERB overlay
* Service area cards
* Home search cards linking to Realtor.com searches
* Property detail page structure
* Contact form with controlled React state
* Client-side form validation
* Loading, success, and error form feedback
* Express backend API
* Supabase database connection
* Contact leads saved to Supabase
* Email notification support through Resend
* Protected admin leads page
* Lead status updates
* Lead notes
* Archive/restore functionality
* Delete archived leads
* Environment variable setup for frontend and backend
* Production deployment with Netlify and Render
* Custom domain connected through Cloudflare

## Project Structure

```txt
gitRealEstate/
├── server/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   └── node_modules/
├── public/
│   ├── _redirects
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

## Environment Variables

This project uses environment variables for local development.

### Frontend `.env`

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000
```
For production in Netlify, use Render backend URL:
```
VITE_API_URL=https://git-real-estate-backend.onrender.com
```

### Backend `server/.env`

Create a `.env` file inside the `server` folder:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
CLIENT_URL=http://localhost:5173
LEAD_NOTIFICATION_EMAIL=your_notification_email
LEADS_DASHBOARD_URL=http://localhost:5173/leads
ADMIN_PASSWORD=your_admin_password
PORT=5000
```
For production in Render:
```
CLIENT_URL=https://erbmoves.com
LEADS_DASHBOARD_URL=https://erbmoves.com/leads
```

Do not commit real `.env` files to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/ellene-broome/gitRealEstate.git
```

Move into the project folder:

```bash
cd gitRealEstate
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

## Running the Project Locally

This project uses two development servers.

### Start the backend

From the `server` folder:

```bash
npm run dev
```

The backend runs on:

```txt
http://localhost:5000
```

### Start the frontend

From the project root:

```bash
npm run dev
```

The frontend runs on:

```txt
http://localhost:5173
```

## API Routes

### Test Route

```txt
GET /
```

Returns a simple message confirming the backend is running.

### Contact Form Route

```txt
POST /api/contact
```

Receives contact form submissions, validates the input, saves leads to Supabase, and sends an email notification.

### View Contact Leads

```txt
GET /api/contact
```

Returns saved contact form submissions from Supabase. Requires admin password header. 

### View Admin Leads
```
GET /api/leads
```
Returns saved contact leads for the admin dashboard. Requires admin password header.

### Update Lead
```
PATCH /api/leads/:id
```
Updates a lead status, notes, or archived state. Requires admin password header.
### Delete Leads
```
DELETE /api/leads/:id
```
Deletes an archived lead permanently. Requires admin password header.

### Database
The project uses a Supabase table named:
```
contact_leads
```
This table stores:

* Name
* Email
* Phone
* Interest
* Message
* Created date
* Status
* Notes
* Archived state

## IDX / Listing Search Status

The site currently uses external Realtor.com search links for home searches in the Greater Baton Rouge area.

Direct Bridge API access to live GBRMLS data was explored, but direct API/vendor access requires vendor approval and additional fees. For now, the site uses Realtor.com search links as a practical search option while keeping the site compliant and functional.

Future IDX integration may be added through an approved IDX provider if needed.

## Current Status

The project currently has:
```
React frontend
→ Express backend
→ Supabase database
→ Resend email notifications
→ Netlify frontend deployment
→ Render backend deployment
→ Cloudflare custom domain
```
The live site is available at:
```
https://erbmoves.com
```

## Future Goals
* Add approved IDX solution or hosted search integration
* Add more local area search cards
* Improve lead dashboard features
* Add mortgage calculator
* Add buyer/seller resource pages
* Add blog or market update section
* Add testimonials as available
* Improve SEO
* Add analytics
* Continue refining mobile design


## Branch Workflow

Main branches used in this project:

* main → stable production-ready code
* setup/* → project setup tasks
* feature/* → application features
* backend/* → server/database work
## Author

Ellene Broome