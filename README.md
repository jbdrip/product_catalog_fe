# Product Catalog Web Application

This is a full-stack web application built as part of a technical assessment. The application displays a catalog of products with images, prices, and details. The stack leverages **Gatsby** for the frontend, **Netlify Functions** for serverless backend logic, **Supabase** as the database and storage solution, and **TypeScript** across the entire project for type safety and maintainability.

---

## 🚀 Tech Stack

- **Frontend**: [Gatsby](https://www.gatsbyjs.com/) (React-based static site generator)
- **Backend**: [Netlify Functions](https://docs.netlify.com/functions/overview/) with [Node.js](https://nodejs.org/)
- **Database**: [Supabase](https://supabase.com/) (Postgres-based)
- **Storage**: Supabase Buckets (for product images)
- **API**: [GraphQL](https://graphql.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Project Structure

```plaintext
.
├── functions/                  # Netlify functions (serverless backend)
│   └── graphql.ts              # GraphQL function to fetch products from Supabase
├── src/
│   └── logger.ts               # Logger configuration with winston
├── frontend/
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Gatsby pages
│   │   ├── styles/             # Global and component styles
│   │   ├── apolloClient.ts     # Apollo Client setup for GraphQL
│   │   └── types.ts            # Type definitions
│   ├── gatsby-config.js        # Gatsby configuration
│   ├── package.json             # Dependencies and scripts for frontend
│   └── tsconfig.json            # TypeScript configuration
├── netlify.toml                # Netlify configuration
├── README.md                   # Documentation
├── package.json                # Dependencies and scripts for backend
└── tsconfig.json               # TypeScript configuration
```

---

## ⚙️ Features

- 📦 **Product Catalog** – Displays products with their name, price, and image.
- 🗄️ **Database Integration** – Data retrieved from **Supabase**.
- 🖼️ **Image Storage** – Product images stored in **Supabase Buckets**.
- ⚡ **Serverless Functions** – GraphQL API built with Netlify Functions.
- 🎨 **Responsive UI** – Gatsby-based frontend styled with modern CSS.
- 🔒 **Type Safety** – Full TypeScript implementation (frontend & backend).

---

## 🔧 Setup Instructions

### Prerequisites
- Node.js (>= 18.x)
- Yarn or npm
- Supabase account & project
- Netlify account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jbdrip/product_catalog_fe.git
   cd product_catalog_fe
   ```

2. Configure Netlify:
   You can connect your GitHub repository and set up automatic deployments. Follow the instructions in the Netlify documentation to deploy your site.

3. Deploy:
   ```bash
   git push origin main
   # Netlify will handle build and deployment automatically
   ```

---

## 🌐 Deployment

This project is deployed on **Netlify**:
- Frontend: Gatsby static site hosted on Netlify
- Backend: Netlify Functions handling GraphQL requests
- Database & Storage: Supabase

---