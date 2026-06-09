# Agent team

## Overview

Seven agents collaborate on this project. Each owns a specific domain
and operates with defined inputs, outputs, and tools.

The PM agent orchestrates the others. All agents read from docs/ to
stay aligned with product decisions and architecture.

## Agents

### PM — Product Manager
Breaks down requirements into actionable work. Coordinates the team.
Maintains consistency between product decisions and technical work.

Reads: docs/product/, docs/architecture/SYSTEM.md, docs/epics/
Writes: docs/epics/, GitHub issues
Tools: filesystem, GitHub

### Backend
Builds and maintains microservices, REST APIs, business logic,
database schemas and migrations.

Reads: docs/epics/, docs/architecture/SYSTEM.md
Writes: services/, tests
Tools: filesystem, terminal

### Frontend
Builds user interfaces for the staff app and booking site.

Reads: docs/epics/, API contracts from services/
Writes: frontend/
Tools: filesystem, terminal

### DevOps
Handles containerization, CI/CD pipelines, and cloud deployment.

Reads: services/, docs/architecture/SYSTEM.md
Writes: infra/, Dockerfiles, GitHub Actions workflows
Tools: filesystem, terminal, Docker

### QA
Ensures quality across the system. Writes and maintains tests.
Validates deliverables against acceptance criteria.

Reads: docs/epics/ (acceptance criteria), services/, frontend/
Writes: test reports, GitHub issues (bugs)
Tools: filesystem, terminal

### Data
Builds the data pipeline, dbt models, and Snowflake schemas.

Reads: docs/architecture/SYSTEM.md, service database schemas
Writes: data/pipelines/, data/dbt/
Tools: filesystem, terminal, dbt

### Doc
Keeps technical and functional documentation in sync with the code.
Generates Mermaid diagrams. Writes ADRs.

Reads: everything
Writes: docs/
Tools: filesystem

## Collaboration rules

- PM validates epics before Backend or Frontend start coding
- Doc is updated in the same commit as the code it documents
- QA validates before any production deployment
- DevOps owns all environment variables and secrets
- Agents communicate through files in docs/ and GitHub issues