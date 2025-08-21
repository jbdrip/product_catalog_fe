# Product Catalog Web Application

Esta es una aplicación web realizada como parte de una prueba técnica. La aplicación muestra un catálogo de productos con sus respectivos, nombres, precios y detalles. El stack utilizado aprovecha **Gatsby** para el frontend o cliente, **Netlify Functions** para funciones serverless backend y logica del negocio, **Supabase** como base de datos y solucion de almacenamiento, y la utilización de **TypeScript** en toda la aplicación para mayor seguridad de tipado y mantenibilidad.

---

## 🚀 Stack Tecnológico

- **Frontend**: [Gatsby](https://www.gatsbyjs.com/) (Generador de sitios web estáticos basado en React)
- **Backend**: [Netlify Functions](https://docs.netlify.com/functions/overview/) con [Node.js](https://nodejs.org/)
- **Database**: [Supabase](https://supabase.com/) (Postgres)
- **Storage**: Supabase Buckets (para almacenamiento de imagenes)
- **API**: [GraphQL](https://graphql.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Estructura del Proyecto

```plaintext
.
├── functions/                  # Funciones Netlify (serverless backend)
│   └── graphql.ts              # Funcion GraphQL para consultar los productos de Supabase
├── src/
│   └── logger.ts               # Configuración de Logger con winston
├── frontend/
│   ├── src/
│   │   ├── components/         # Componentes Reutilizables React
│   │   ├── pages/              # Páginas Gatsby
│   │   ├── styles/             # Estilos globales y de componentes
│   │   ├── apolloClient.ts     # Configuración de Apollo Client para GraphQL
│   │   └── types.ts            # Definiciones de tipado
│   ├── gatsby-config.js        # Configuración de Gatsby
│   ├── package.json             # Dependencias y scripts para el frontend
│   └── tsconfig.json            # Configuración de TypeScript
├── netlify.toml                # Configuración de Netlify
├── README.md                   # Documentación
├── package.json                # Dependencias y scripts para el backend
└── tsconfig.json               # Configuración de TypeScript
```

---

## ⚙️ Características y Funcionalidades

- 📦 **Catálogo de Productos** – Muestra los productos con sus detalles, con opcion para filtrar por categoria y ordenar por precio.
- 🗄️ **Integración con Base de Datos** – Data almacenada y consultada en base de datos **Supabase**.
- 🖼️ **Almacenamiento de Imágenes** – Almacenamiento de imagenes utilizando **Supabase Buckets**.
- ⚡ **Funciones Serverless** – Iplementación de GraphQL API con Netlify Functions.
- 🎨 **UI Responsiva** – Frontend basado en Gatsby y estilado con CSS.
- 🔒 **Seguridad en Tipado** – Implementación completa de TypeScript (frontend y backend).

---

## 🔧 Instrucciones de Configuration

### Pre-requisitos
- Node.js (>= 18.x)
- Yarn o npm
- Cuenta Supabase y proyecto
- Cuenta Netlify

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jbdrip/product_catalog_fe.git
   cd product_catalog_fe
   ```

2. Configura Netlify:
   Puedes conectar un repositorio de GitHub y configurar los despliegues automáticos. Sigue las instrucciones en la documentación de Netlify para desplegar el sitio.

3. Desplegar:
   ```bash
   git push origin main
   # Netlify se encargará de construir y realizar el despliegue automáticamente.
   ```

---

## 🌐 Despliegue

Este proyecto está desplegado en **Netlify**:
- Frontend: Sitio estático Gatsby alojado en Netlify
- Backend: Netlify Functions que manejan solicitudes GraphQL
- Base de Datos y Almacenamiento: Supabase

---