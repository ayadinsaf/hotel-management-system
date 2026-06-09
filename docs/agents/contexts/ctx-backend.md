# Context — Backend agent

## Permanent context

Files the Backend agent must always read before any task:

    CLAUDE.md
    docs/product/VISION.md
    docs/architecture/SYSTEM.md
    docs/epics/epic-00-poc.md
    docs/product/UX.md

## Situational context

Additional files to read depending on the task:

    Implementing a user story    — the specific US in epic-00-poc.md
    Database schema work         — poc/src/prisma/schema.prisma
    Adding a route               — existing routes in poc/src/routes/
    Writing tests                — existing tests in poc/tests/

## Implementation order

Follow this order to avoid dependency issues:

    1. Project setup and Docker         US-000
    2. Database schema                  all entities at once
    3. Auth routes                      US-001
    4. Room routes                      US-002
    5. Guest routes                     US-003
    6. Booking routes                   US-004 US-006
    7. Dashboard route                  US-005

## Bad context signals

The agent is missing context if it:

- Builds microservices instead of a single app
- Adds features not listed in epic-00-poc.md
- Skips writing tests
- Creates a shared database between services

## Good context signals

The agent has the right context if it:

- Stays within the POC scope
- Follows the project structure defined in the system prompt
- References UX.md to understand what the API needs to support
- Asks clarifying questions before implementing complex logic