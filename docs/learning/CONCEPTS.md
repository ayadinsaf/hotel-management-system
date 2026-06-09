# Concepts

A living document. Updated as the project grows.
Use it to review, consolidate, and prepare for technical interviews.

---

## 1. Project methodology

### Hierarchy of requirements
    Vision
        └── Initiative      strategic objective (weeks to months)
                └── Epic    functional workstream (days to weeks)
                        └── User Story    one user need
                                    └── Task    one unit of work

### User story format
    As a [role],
    I want to [action],
    so that [business benefit].

    Acceptance criteria:
    - [ ] specific, testable behavior

### ADR — Architecture Decision Record
A short document that captures a technical decision:
why it was made, what alternatives were considered,
and what the consequences are.
Versioned in the repo alongside the code.

### Docs-first
Document decisions before writing code.
The repo is the single source of truth for both code and decisions.

---

## 2. Architecture patterns

### Monolith vs Microservices
A monolith is one app that does everything.
Microservices split responsibilities into independent services,
each with its own codebase and database.

Start with a monolith (or a POC). Split into microservices
when you feel the pain of keeping everything together.

### One database per service
In a microservices architecture, each service owns its data.
No service reads or writes another service's database directly.
They communicate through APIs or events.

### API Gateway
A single entry point for all client requests.
It routes requests to the right service, handles authentication,
and can apply rate limiting.

    Client → API Gateway → service-auth
                        → service-bookings
                        → service-hotels

### Event-driven architecture
Instead of services calling each other directly (tight coupling),
they publish and consume events through a message broker (loose coupling).

    service-bookings  publishes  BookingCreated
    message broker    routes it to consumers
    service-notifications  consumes  BookingCreated → sends email
    data lake              consumes  BookingCreated → stores for analytics

Key benefit: services don't need to know about each other.

### REST API conventions
    GET     /resources          list
    GET     /resources/:id      get one
    POST    /resources          create
    PATCH   /resources/:id      partial update
    DELETE  /resources/:id      delete

Response format:
    success   { data: any, message?: string }
    error     { error: string, code: string }

---

## 3. Backend concepts

### Express
The most popular web framework for Node.js.
Handles routing, middleware, and HTTP request/response.

### Route / Controller / Service pattern

    Route       defines the URL and HTTP method
    Controller  validates inputs, calls the service, formats the response
    Service     pure business logic, no HTTP knowledge

Why separate them:
- Services can be tested without HTTP
- Controllers stay thin and readable
- Business logic is reusable

Flow example for POST /api/v1/auth/login:

    routes/auth.js          receives the request
            ↓
    authController.js       validates email + password
            ↓
    authService.js          checks database, generates token
            ↓
    JSON response           token + staff info

### Middleware
A function that runs between the request and the route handler.
Used for authentication, logging, error handling, etc.

    Request → middleware → middleware → route handler → response

### CORS — Cross Origin Resource Sharing
A browser security mechanism that blocks requests
from a different domain by default.

    Frontend on http://localhost:3001
    API on     http://localhost:3000
    Without CORS → browser blocks the request
    With CORS    → API explicitly allows it

### JWT — JSON Web Token
A stateless authentication mechanism.

Flow:
    1. User logs in with email + password
    2. Server verifies credentials
    3. Server generates a signed JWT token
    4. Client stores the token (localStorage in the POC)
    5. Client sends the token in every subsequent request
    6. Server verifies the token signature — no database lookup needed

Structure:
    Header     algorithm used
    Payload    data (id, role, expiration)
    Signature  guarantees the token has not been tampered with

Advantage over sessions: the server stores nothing.
The token is self-contained.

### bcrypt
A hashing algorithm for passwords.
Never store passwords in plain text.
bcrypt transforms a password into an irreversible hash.

    bcrypt.hash('mypassword', 10)     → '$2b$10$...'
    bcrypt.compare('mypassword', hash) → true or false

### ORM — Prisma
An Object Relational Mapper.
Instead of writing raw SQL, you define your schema in code
and Prisma generates the queries.

    prisma.booking.findMany({ where: { status: 'CONFIRMED' } })
    is equivalent to:
    SELECT * FROM bookings WHERE status = 'CONFIRMED'

---

## 4. DevOps concepts

### Docker
Packages an application and everything it needs to run
into a portable container.
Works identically on any machine.

Key files:
    Dockerfile         instructions to build the container image
    .env.example       lists required environment variables (no values)
    .dockerignore      files to exclude from the image

### Docker Compose
Orchestrates multiple containers together.
One file, one command to start everything.

    docker-compose up    starts all containers
    docker-compose down  stops all containers

### Environment variables
Configuration values that live outside the code.
Never hardcode secrets, URLs, or credentials.

    DATABASE_URL=postgresql://...
    JWT_SECRET=...
    PORT=3000

### CI/CD — Continuous Integration / Continuous Deployment
    CI   automatically runs tests on every push
    CD   automatically deploys when tests pass

Pipeline:
    push to GitHub → run tests → build Docker image → deploy

### GitHub Actions
CI/CD tool built into GitHub.
Workflows are defined in .github/workflows/*.yml
and triggered by git events (push, pull request, merge).

---

## 5. Data concepts

### Data pipeline
The flow of data from operational systems to analytics.

    Events (Kafka) → raw storage (S3) → transform (dbt) → warehouse (Snowflake)

### dbt — data build tool
Transforms raw data in the warehouse using SQL.
Models are versioned, tested, and documented like code.

### Snowflake
A cloud data warehouse optimized for analytics queries.
Separates storage and compute — you only pay for what you use.

### Dimensional modeling
A data modeling technique for analytics.
    Fact tables      measurable events (bookings, payments)
    Dimension tables descriptive context (rooms, guests, dates)

---

## 6. AI agent concepts

### Context engineering
The art of giving the right context to an AI agent at the right time.
Not just a prompt — everything the agent needs to produce useful output:
documents, current state, constraints, history.

### System prompt
Defines the agent's identity, responsibilities, rules, and output format.
Read at the start of every session.

### Harness
The execution framework around an agent.
Defines allowed tools, forbidden actions, pre-flight checks, and limits.
Prevents the agent from going off-script.

### Multi-agent architecture
Multiple specialized agents collaborate on a project.
Each owns a domain. An orchestrator (PM agent) coordinates the work.

    PM → Backend, Frontend, DevOps, QA, Data, Doc