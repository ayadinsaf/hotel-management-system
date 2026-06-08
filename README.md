# hotel-management-system

Back-office management system for hotel staff. Handles reservations, 
room inventory, and guest profiles.

Part of a larger system that will eventually include a booking website 
and a business analytics dashboard.

## Overview

Three products, one shared core:

- **Staff app** — internal tool for receptionists and managers (this repo, priority 1)
- **Booking site** — customer-facing reservation interface (planned)
- **Analytics dashboard** — business reporting and forecasting (planned)

## Architecture

Microservices over REST in phase 1, progressively moving toward 
event-driven as complexity grows.

Each service owns its database. No shared state between services.

## Stack

- Backend: Node.js, PostgreSQL
- Frontend: React Native / Next.js
- Infra: Docker, GitHub Actions
- Cloud: Railway (phase 1), AWS (phase 3+)
- Data: Kafka, dbt, Snowflake (phase 5)

## Getting started

> Prerequisites: Node.js 18+, Docker

```bash
git clone https://github.com/ayadinsaf/hotel-management-system
cd hotel-management-system
docker-compose up
```

## Project structure

    services/        microservices (auth, hotels, bookings, guests)
    frontend/        staff app
    data/            pipelines and dbt models
    infra/           docker-compose, ci/cd
    docs/            architecture decisions, epics, agent team

## Documentation

- [Vision](docs/product/VISION.md)
- [System architecture](docs/architecture/SYSTEM.md)
- [Agent team](docs/agents/TEAM.md)
- [Epic 01 — Foundations](docs/epics/epic-01-foundations.md)