# 🥐 La Boulangerie — Bakery Shop

A modern, full-stack bakery e-commerce application with beautiful UI and robust backend. Order fresh bread, pastries, and cakes online from our Lahore, Pakistan bakery.

## ✨ Features

- **Modern UI**: Glassmorphism design with shimmer effects and 3D text
- **Product Catalog**: Browse bread, pastries, and cakes with category filters
- **Shopping Cart**: Add/remove items with real-time updates
- **User Authentication**: Register, login, and JWT-based sessions
- **Order Management**: Place orders and track order history
- **Admin Dashboard**: Manage products and orders (admin role)
- **Contact Page**: Contact form with Lahore bakery information
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

| Layer      | Technology                                | Purpose                          |
|------------|-------------------------------------------|----------------------------------|
| **Frontend** | Next.js 15 (App Router)                  | Server-side rendering, routing    |
|            | TypeScript                               | Type safety                      |
|            | Tailwind CSS                             | Utility-first styling            |
|            | shadcn/ui                                | Reusable UI components           |
|            | Zustand                                  | State management (cart + auth)   |
|            | React Query                              | Data fetching and caching        |
| **Backend**  | NestJS                                   | Scalable Node.js framework       |
|            | Prisma ORM                               | Database ORM and migrations      |
|            | PostgreSQL                               | Relational database              |
|            | JWT (JSON Web Tokens)                    | Authentication and authorization |
|            | Class Validator                          | Request validation               |
| **Dev Tools**| ESLint                                   | Code linting                     |
|            | Prettier                                 | Code formatting                  |
|            | Git                                      | Version control                  |

## 📁 Project Structure

```
bakery-shop/
├── frontend/                 # Next.js frontend application
│   ├── src/app/             # App Router pages
│   │   ├── admin/           # Admin dashboard
│   │   ├── auth/            # Authentication pages
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout process
│   │   ├── contact/         # Contact Us page
│   │   ├── orders/          # Order history
│   │   ├── products/        # Product catalog
│   │   └── layout.tsx       # Root layout
│   ├── src/components/      # React components
│   ├── src/hooks/          # Custom React hooks
│   ├── src/lib/            # Utility functions
│   └── src/store/          # Zustand stores
├── backend/                  # NestJS backend API
│   ├── src/                # Source code
│   │   ├── auth/           # Authentication module
│   │   ├── contact/        # Contact form module
│   │   ├── orders/         # Orders module
│   │   ├── products/       # Products module
│   │   ├── prisma/         # Database module
│   │   └── users/          # Users module
│   └── prisma/             # Database schema and migrations
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/MahamAzam2/bakery-shop.git
cd bakery-shop
```

### 2. Database Setup
Make sure PostgreSQL is running, then update `backend/.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/bakery_db"
JWT_SECRET="your-secret-key-here"
```

### 3. Backend Setup
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run prisma:seed        # seeds products + admin user
npm run start:dev          # runs on http://localhost:3001
```

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev                # runs on http://localhost:3000
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Admin login: admin@bakery.com / admin123

## Default Credentials

| Role  | Email              | Password   |
|-------|--------------------|------------|
| Admin | admin@bakery.com   | admin123   |

## Contact Information (Lahore Bakery)

- **Email**: mahamazam18@gmail.com
- **Phone**: +92 325 8180484
- **Location**: Lahore, Pakistan
- **Hours**: Mon-Sat: 6AM-8PM | Sun: 7AM-6PM

## API Endpoints

| Method | Path                  | Auth     | Description          |
|--------|-----------------------|----------|----------------------|
| POST   | /auth/register        | Public   | Register user        |
| POST   | /auth/login           | Public   | Login                |
| GET    | /products             | Public   | List products        |
| GET    | /products/:id         | Public   | Get product          |
| POST   | /products             | Admin    | Create product       |
| PATCH  | /products/:id         | Admin    | Update product       |
| DELETE | /products/:id         | Admin    | Delete product       |
| POST   | /orders               | User     | Place order          |
| GET    | /orders/my            | User     | My orders            |
| GET    | /orders               | Admin    | All orders           |
| PATCH  | /orders/:id/status    | Admin    | Update order status  |
| POST   | /contact              | Public   | Submit contact form  |

## Pages

- `/` — Homepage with hero + featured products
- `/products` — Product catalog with category filter
- `/products/:id` — Product detail
- `/cart` — Shopping cart
- `/checkout` — Multi-step checkout (delivery → payment → review)
- `/auth/login` — Login
- `/auth/register` — Register
- `/orders` — My orders
- `/admin` — Admin dashboard (products + orders)
- `/contact` — Contact Us page with Lahore bakery information

## 📄 License

This project is open source and available under the [MIT License](LICENSE).