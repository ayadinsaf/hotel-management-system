# POC — Hotel Management System

Single Node.js app with PostgreSQL.
Validates the core booking flow before splitting into microservices.

## Prerequisites

- Node.js 18+
- Docker and Docker Compose

## Setup

    cp .env.example .env
    docker-compose up -d
    npm install
    npx prisma migrate dev
    npm run dev

## API

Base URL: http://localhost:3000/api/v1

    POST   /auth/login
    GET    /rooms
    POST   /rooms
    GET    /guests
    POST   /guests
    GET    /bookings
    POST   /bookings
    PATCH  /bookings/:id/cancel
    GET    /dashboard/today

## Tests

    npm test

## Stack

    Runtime     Node.js
    Framework   Express.js
    Database    PostgreSQL
    ORM         Prisma
    Auth        JWT + bcrypt
    Tests       Jest
    Container   Docker + Docker Compose