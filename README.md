# PRIVATECRAFT — Premium Private Aviation Website

**PRIVATECRAFT** is a modern, high-performance web application for luxury private aviation, jet charter, aircraft sales, fleet management, and bespoke interior completions.

Built as an independent, zero-dependency HTML5 / CSS3 / Vanilla JavaScript single-page application powered by **Vite** and **Supabase**, completely free of Base44 dependencies.

---

## Key Features
- **Brand Identity**: Preserved **PRIVATECRAFT** luxury branding, Cormorant Garamond & Manrope typography, obsidian dark theme with metallic gold accents.
- **Complete Route Coverage**:
  - Home (`/`)
  - Private Charter (`/charter`)
  - Request Quote (`/request-charter`)
  - Fleet Overview (`/aircraft`)
  - Aircraft Sales Inventory (`/aircraft-sales`) & Detail (`/aircraft-sales/:slug`)
  - Aircraft Management (`/aircraft-management`)
  - Design & Completion (`/design-completion`)
  - Destinations (`/destinations`)
  - About Us (`/about`), Insights (`/insights`), Contact (`/contact`)
  - Leadership Team (`/team`), Careers (`/careers`), Sustainability (`/sustainability`), Gallery (`/gallery`), FAQ (`/faq`)
  - Legal Pages (`/privacy-policy`, `/terms`, `/cookie-policy`, `/disclaimer`, `/accessibility`)
  - Client Portal & Auth (`/login`, `/dashboard`)
- **Supabase Backend Integration**:
  - PostgreSQL schema for profiles, aircraft, booking requests, contact messages, and destinations.
  - Row Level Security (RLS) policies for data protection.
  - Supabase Auth for client authentication.
- **Zero Base44 Dependencies**: Completely standalone frontend and database architecture.

---

## Project Structure
```
PRIVATECRAFT/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
├── README.md
│
├── public/
│   ├── favicon.svg
│   └── logo.svg
│
├── src/
│   ├── css/
│   │   ├── variables.css
│   │   ├── reset.css
│   │   ├── global.css
│   │   ├── components.css
│   │   ├── sections.css
│   │   ├── responsive.css
│   │   └── animations.css
│   │
│   ├── js/
│   │   ├── main.js
│   │   ├── config.js
│   │   ├── router.js
│   │   ├── navigation.js
│   │   ├── database.js
│   │   ├── auth.js
│   │   └── utils.js
│   │
│   ├── components/
│   │   ├── header.js
│   │   └── footer.js
│   │
│   └── pages/
│       ├── home.js
│       ├── charter.js
│       ├── requestCharter.js
│       ├── fleet.js
│       ├── aircraftSales.js
│       ├── aircraftSalesDetail.js
│       ├── aircraftManagement.js
│       ├── designCompletion.js
│       ├── destinations.js
│       ├── about.js
│       ├── insights.js
│       ├── contact.js
│       ├── team.js
│       ├── careers.js
│       ├── sustainability.js
│       ├── gallery.js
│       ├── faq.js
│       ├── legal.js
│       ├── login.js
│       └── dashboard.js
│
├── supabase/
│   ├── schema.sql
│   ├── seed.sql
│   └── rls.sql
│
└── docs/
    ├── DESIGN.md
    ├── DATABASE.md
    └── DEPLOYMENT.md
```

---

## Getting Started

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

---

## License
&copy; PRIVATECRAFT. All rights reserved.
