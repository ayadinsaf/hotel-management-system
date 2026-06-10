# CLAUDE.md

This file is read automatically by Claude Code at the start of every
session. It defines the project structure, conventions, and how to
invoke each agent.

## Project

Hotel management system built with microservices.
Three products: staff app, booking site, analytics dashboard.

Full context: docs/product/VISION.md

## Repository structure

    poc/             single app POC (phase 0 — current)
    services/        microservices (phase 1+)
    frontend/        staff app and booking site (phase 2+)
    data/            pipelines and dbt models (phase 5+)
    infra/           docker-compose and CI/CD
    docs/            all documentation

## Agent team

Seven specialized agents collaborate on this project.
Full team definition: docs/agents/TEAM.md

### Invoking an agent

Each agent has three configuration files:

    docs/agents/prompts/system-[agent].md    — identity and rules
    docs/agents/contexts/ctx-[agent].md      — what to read and when
    docs/agents/harness/harness-[agent].md   — allowed tools and limits

To invoke an agent, read its three files before starting work.

### Available agents

    PM          docs/agents/prompts/system-pm.md
    Backend     docs/agents/prompts/system-backend.md
    Frontend    docs/agents/prompts/system-frontend.md
    DevOps      docs/agents/prompts/system-devops.md
    QA          docs/agents/prompts/system-qa.md
    Data        docs/agents/prompts/system-data.md
    Doc         docs/agents/prompts/system-doc.md

## Architecture

Microservices over REST in phase 1, event-driven in phase 3.
Full architecture: docs/architecture/SYSTEM.md

## Conventions

- Language: English for all code, docs, and commit messages
- Commit format: type: short description
  types: feat, fix, docs, test, infra, refactor
- One database per service, no shared state
- Docs updated in the same commit as the code

## Current phase

Phase 0 — POC
Active epic: docs/epics/epic-00-poc.md

## Current state

### US-000 — Project setup (done)
All files created and verified:
- poc/Dockerfile (openssl added, binaryTargets declared)
- poc/docker-compose.yml
- poc/package.json (prisma schema path declared)
- poc/src/prisma/schema.prisma (binaryTargets for Mac + Docker)
- poc/src/prisma/migrations/ (init migration applied)
- poc/.env.example
- poc/src/index.js
- poc/src/middleware/auth.js
- poc/src/routes/rooms.js (stub)
- poc/src/routes/guests.js (stub)
- poc/src/routes/bookings.js (stub)
- poc/src/routes/dashboard.js (stub)

App running: docker compose up -d → /health returns {"status":"ok"}

### US-001 — Login (done)
A receptionist can log in with email and password.
- poc/src/routes/auth.js
- poc/src/controllers/authController.js
- poc/src/services/authService.js
- poc/src/prisma/seed.js (test users)

Tested: POST /api/v1/auth/login returns JWT token + staff info.

### US-002 — Create a room (done)
A receptionist can create a room.
- poc/src/services/roomService.js
- poc/src/controllers/roomController.js
- poc/src/routes/rooms.js

### US-003 to US-006
Not started.

## Next steps

1. US-002: a receptionist can create a room
2. US-003: a receptionist can create a guest profile
3. US-004: a receptionist can create a booking for a guest
4. US-005: a receptionist can view the list of current bookings
5. US-006: a receptionist can cancel a booking

## Learning resources

    docs/learning/CONCEPTS-FR.md    concepts and definitions
    docs/learning/DIAGRAMS-FR.md    visual flow diagrams
    docs/learning/JOURNAL-FR.md     chronological project log
    docs/learning/TIPS-FR.md        practical tips and best practices