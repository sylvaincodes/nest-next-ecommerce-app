DOWNLOAD FULL CODE HERE => https://www.patreon.com/posts/full-stack-e-app-146932359

# NestJS + Next.js E-Commerce Project

## Overview

This is a full-stack e-commerce application built with **NestJS** for the backend API and **Next.js** for the frontend. The project is organized into two main folders:

- `api` — the NestJS backend, handling authentication, product management, cart, orders, and payment processing.
- `front` — the Next.js frontend, providing a responsive web interface for users to browse products, manage carts, and checkout.

The backend exposes a REST API consumed by the frontend, with secure JWT authentication, role-based access, and integration with Stripe for payments.

---

## Folder Structure

root/
│
├── api/ # NestJS backend
│ ├── src/
│ │ ├── modules/ # Features: auth, users, products, orders, payments
│ │ ├── prisma/ # Prisma schema & service
│ │ ├── common/ # Guards, decorators, interceptors, filters
│ │ ├── main.ts # Application bootstrap
│ │ └── ...
│ ├── test/ # Backend tests
│ ├── package.json
│ └── README.md # Backend-specific instructions
│
├── front/ # Next.js frontend
│ ├── app/ # Pages & layouts (Next.js 13+ App Router)
│ ├── components/ # UI components
│ ├── hooks/ # React hooks
│ ├── types/ # TypeScript types
│ ├── public/ # Static assets
│ ├── styles/ # Global & modular styles
│ ├── package.json
│ └── README.md # Frontend-specific instructions
│
└── README.md # This overview file


---

## Tech Stack

### Backend (`api`)
- **Framework:** [NestJS](https://nestjs.com/) (TypeScript, modular architecture)
- **Database:** PostgreSQL via [Prisma ORM](https://www.prisma.io/)
- **Authentication:** JWT with access and refresh tokens
- **Payments:** Stripe integration
- **Testing:** Jest

### Frontend (`front`)
- **Framework:** [Next.js](https://nextjs.org/) (React + TypeScript)
- **Styling:** SCSS / CSS Modules
- **State Management:** React Context / Redux (if needed)
- **API Client:** Axios / Fetch to connect with backend

### DevOps & Deployment
- **Docker:** Containerized backend & frontend
- **AWS:** ECR for Docker images, EC2 for deployment (optional EKS for Kubernetes)
- **CI/CD:** GitHub Actions for automated build, test, and deploy pipeline

---

## Features

- User registration, login, and logout with JWT
- Role-based access (User/Admin)
- Product listing, creation, update, and deletion
- Shopping cart and order management
- Stripe-based payment processing
- Rate-limited authentication endpoints for security
- Fully containerized for easy deployment

---

## Notes

- Each folder (`api` and `front`) contains its **own README** for local setup, environment variables, and running instructions.
- This project is structured for **modular growth**, allowing easy addition of new features and microservices.

---

## License

MIT License

