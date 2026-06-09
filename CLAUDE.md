# CLAUDE.md

This file is read automatically by Claude Code at the start of every
session. It defines the project structure, conventions, and how to
invoke each agent.

## Project

Hotel management system built with microservices.
Three products: staff app, booking site, analytics dashboard.

Full context: docs/product/VISION.md

## Repository structure

    services/        microservices (auth, hotels, bookings, guests)
    frontend/        staff app and booking site
    data/            pipelines and dbt models
    infra/           docker-compose and CI/CD
    docs/            all documentation

## Agent team

Six specialized agents collaborate on this project.
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