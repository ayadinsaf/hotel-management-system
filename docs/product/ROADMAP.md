# Roadmap

## Budget

    Claude Pro        ~18€/month    required
    AWS free tier     0€            phases 1-4 (12 months)
    Snowflake trial   0€            phase 5 (30 days, $400 credits)
    dbt Core          0€            open source

    Total             ~18€/month

## Schedule

Working pace: ~10 hours per week.

    Phase 0    POC                    now → end of June 2026
    Phase 1    Microservices          July - August 2026
    Phase 2    Staff app              September - October 2026
    Phase 3    Event-driven           November 2026
    Phase 4    Booking site           December 2026
    Phase 5    Data pipeline          January - February 2027
    Phase 6    ML and pricing         March - April 2027

Sprint planning and epic breakdown added at the start of each phase.

## Phases

### Phase 0 — POC (current)

Goal: validate the core booking flow end to end.
One app, one database, basic interface.

    US-000   project setup: Node.js, PostgreSQL, Docker
    US-001   receptionist can log in
    US-002   receptionist can create a room
    US-003   receptionist can create a guest profile
    US-004   receptionist can create a booking
    US-005   receptionist can view today's dashboard
    US-006   receptionist can cancel a booking

Deliverable: a receptionist can log in, manage rooms and guests,
and complete a full booking flow in the browser.

---

### Phase 1 — Microservices foundations

Goal: split the POC into independent services.
Each service owns its domain and its database.

    service-auth       login, JWT, staff roles
    service-hotels     hotels and room inventory
    service-bookings   reservations and availability
    service-guests     guest profiles and history
    api-gateway        routing and auth middleware
    CI/CD pipeline     GitHub Actions, Docker Compose

Deliverable: same features as the POC, now running as microservices.

---

### Phase 2 — Staff app

Goal: build a proper frontend on top of the microservices.

    staff app          React Native or Next.js
    receptionist UI    dashboard, bookings, rooms, guests
    manager UI         configuration, staff management

Deliverable: a production-ready staff app connected to the APIs.

---

### Phase 3 — Event-driven architecture

Goal: decouple services using a message broker.

    message broker     RabbitMQ
    BookingCreated     → notifications, data lake
    BookingCancelled   → payments, notifications
    PaymentConfirmed   → bookings, notifications
    CheckInCompleted   → housekeeping
    CheckOutCompleted  → payments

Deliverable: services communicate asynchronously.
System is resilient to individual service failures.

---

### Phase 4 — Booking site

Goal: allow guests to book online.

    booking site       Next.js, customer-facing
    availability       real-time room search
    payment            online payment integration
    confirmation       email confirmation on booking

Deliverable: a guest can find a room and book it online.

---

### Phase 5 — Data pipeline and analytics

Goal: give management visibility into business performance.

    data pipeline      Kafka → S3 → dbt → Snowflake
    dbt models         bookings, revenue, occupancy
    dashboard          Metabase, key business metrics
    KPIs               occupancy rate, revenue per room, avg stay

Deliverable: a manager can track hotel performance in real time.

---

### Phase 6 — ML and dynamic pricing

Goal: use historical data to optimize pricing and forecast demand.

    demand forecast    predict busy periods
    dynamic pricing    adjust room rates based on occupancy
    guest segments     identify guest profiles and behavior

Deliverable: pricing adjusts automatically based on demand signals.