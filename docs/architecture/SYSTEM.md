# System architecture

## Overview

```mermaid
graph TB
subgraph Products
SA[Staff app]
BK[Booking site]
DA[Analytics dashboard]
end
subgraph Gateway
GW[API Gateway]
end
subgraph Services
AUTH[service-auth]
HOTELS[service-hotels]
BOOKINGS[service-bookings]
GUESTS[service-guests]
PAYMENTS[service-payments]
end
subgraph Databases
DB1[(auth db)]
DB2[(hotels db)]
DB3[(bookings db)]
DB4[(guests db)]
end
SA --> GW
BK --> GW
DA --> GW
GW --> AUTH
GW --> HOTELS
GW --> BOOKINGS
GW --> GUESTS
GW --> PAYMENTS
AUTH --> DB1
HOTELS --> DB2
BOOKINGS --> DB3
GUESTS --> DB4
```

## Services

| Service | Port | Responsibility |
|---|---|---|
| api-gateway | 3000 | Routing, auth middleware, rate limiting |
| service-auth | 3001 | Login, JWT, staff roles |
| service-hotels | 3002 | Hotels, rooms, availability |
| service-bookings | 3003 | Reservations, conflicts, status |
| service-guests | 3004 | Guest profiles, history |
| service-payments | 3005 | Payments, invoicing |

## Principles

- Each service owns its database. No shared database between services.
- Services communicate over HTTP/REST in phase 1.
- Authentication is handled at the gateway level, not per service.
- Each service is independently deployable.

## Phase 3 — Event-driven

```mermaid
sequenceDiagram
participant Staff as Staff app
participant BK as service-bookings
participant BR as Message broker
participant NT as service-notifications
participant DL as Data lake
Staff->>BK: POST /bookings
BK->>BR: BookingCreated
BK-->>Staff: 201 Created
BR->>NT: BookingCreated
NT->>NT: Send confirmation email
BR->>DL: BookingCreated
```

## Key events

| Event | Producer | Consumers |
|---|---|---|
| BookingCreated | service-bookings | notifications, data lake |
| BookingCancelled | service-bookings | notifications, payments, data lake |
| PaymentConfirmed | service-payments | bookings, notifications, data lake |
| CheckInCompleted | service-bookings | housekeeping, data lake |
| CheckOutCompleted | service-bookings | payments, data lake |

## Phase 5 — Data pipeline

```mermaid
graph LR
BR[Message broker] --> S3[S3 data lake]
S3 --> DBT[dbt]
DBT --> SF[Snowflake]
SF --> MB[Metabase]
```

## Architecture decision records

| # | Decision | Status |
|---|---|---|
| ADR-001 | Microservices over monolith | accepted |
| ADR-002 | One database per service | accepted |
| ADR-003 | RabbitMQ in phase 3, Kafka in phase 5 | accepted |
| ADR-004 | Snowflake as data warehouse | accepted |
| ADR-005 | Markdown docs versioned in repo | accepted |
| ADR-006 | GitHub Actions for CI/CD | accepted |
