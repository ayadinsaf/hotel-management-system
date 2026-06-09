# Vision

Hotel management system built for small to mid-size hotels.
Covers daily operations, online reservations, and business reporting.

## Problem

Hotel staff rely on outdated tools or manual processes to manage
reservations, room availability, and guest information. This creates
errors, double bookings, and poor guest experience.

## Products

### 1. Staff app (priority 1)
Internal tool for hotel staff.
Manages reservations, room inventory, check-ins, check-outs, 
and guest profiles.

Users: receptionist, manager, housekeeping

### 2. Booking site (priority 2)
Customer-facing interface.
Allows guests to search availability and book rooms online.

Users: hotel guests (B2C)

### 3. Analytics dashboard (priority 3)
Business reporting and forecasting.
Tracks occupancy rates, revenue, and guest behavior.

Users: hotel manager, revenue manager

## Roadmap

Phase 0 — POC: single app, one database, core booking flow visible
Phase 1 — Microservices foundations (auth, hotels, bookings, guests)
Phase 2 — Staff app frontend
Phase 3 — Event-driven architecture
Phase 4 — Booking site
Phase 5 — Data pipeline and analytics
Phase 6 — ML and dynamic pricing

## Core entities

- Hotel
- Room (type, capacity, rate)
- Booking (dates, room, guest, status)
- Guest (profile, history)
- Payment
- Staff (role, permissions)