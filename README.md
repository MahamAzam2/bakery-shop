# 🥐 La Boulangerie — Bakery Shop

Full-stack bakery e-commerce app built with Next.js + NestJS.

## Stack

| Layer      | Tech                                      |
|------------|-------------------------------------------|
| Frontend   | Next.js 15 (App Router), Tailwind, shadcn |
| Backend    | NestJS, Prisma ORM                        |
| Database   | PostgreSQL                                |
| Auth       | JWT (access tokens)                       |
| State      | Zustand (cart + auth), React Query        |

## Project Structure

```
bakery-shop/
├── frontend/   # Next.js app (port 3000)
└── backend/    # NestJS API (port 3001)
```

## Setup

### 1. Database
Make sure PostgreSQL is running, then update `backend/.env`:
```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/bakery_db"
```

### 2. Backend
```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run prisma:seed        # seeds products + admin user
npm run start:dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

## Default Credentials

| Role  | Email              | Password   |
|-------|--------------------|------------|
| Admin | admin@bakery.com   | admin123   |

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
