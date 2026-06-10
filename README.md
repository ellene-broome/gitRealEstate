# Git Real Estate

A full-stack real estate website being built one commit at a time.

Git Real Estate is a React, Express, and Supabase project designed to grow into a professional real estate platform with property listings, contact lead capture, search features, and future MLS/IDX integration.

## Project Goals

This project is being built to become a full-featured real estate platform with:

* Property listings
* Search and filtering
* Property detail pages
* Contact form lead capture
* Backend API
* Supabase database storage
* Future MLS/IDX integration
* Future user authentication
* Future saved favorites
* Future agent dashboard
* Mobile responsive design

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

### Database

* Supabase
* PostgreSQL

### Tools

* Git
* GitHub
* VS Code

## Current Features

* React app initialized with Vite
* Responsive homepage
* Real estate branding
* Featured property listings
* Listing filters
* Dynamic property detail pages
* Reusable React components
* Property data separated into a data file
* Mobile responsive layout
* Contact form with controlled React state
* Loading, success, and error form feedback
* Express backend API
* Supabase database connection
* Contact leads saved to Supabase
* Environment variable setup for frontend and backend
* Git feature branch workflow

## Project Structure

```txt
gitRealEstate/
├── server/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   └── node_modules/
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

### Backend `server/.env`

Create a `.env` file inside the `server` folder:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=5000
```

Do not commit real `.env` files to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/ellene-broome/gitRealEstate.git
```

Move into the project folder:

```bash
cd getRealEstate
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

Receives contact form submissions and saves them to the Supabase `contact_leads` table.

### View Contact Leads

```txt
GET /api/contact
```

Returns saved contact form submissions from Supabase.

## Database

The project currently uses a Supabase table named:

```txt
contact_leads
```

This table stores:

* Name
* Email
* Phone
* Interest
* Message
* Created date

## Current Status

The project currently has a working full-stack contact form:

```txt
React frontend
→ Express backend
→ Supabase database
```

Listing data is currently shown for development purposes. Live MLS/IDX integration is planned.

## Future Goals

* MLS/IDX integration
* Authentication
* Saved favorites
* Agent dashboard
* Admin lead management page
* Mortgage calculator
* Interactive maps
* Deployment
* Production environment setup

## Branch Workflow

Main branches used in this project:

* `main` → stable production-ready code
* `setup/*` → project setup tasks
* `feature/*` → application features
* `backend/*` → server/database work

## Author

Ellene Broome
