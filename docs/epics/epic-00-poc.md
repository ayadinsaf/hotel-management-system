# Epic 00 — POC

Initiative: I1 — Core system foundations
Priority: P1
Status: draft

## Objective

Build the simplest possible version of the booking flow.
One app, one database, core features only.
The goal is to validate the business logic and see something
working as fast as possible.

## Users

Receptionist — needs to log in, create a booking, and see the list
of current reservations.

## User stories

- [ ] US-000 — Project setup: Node.js app, PostgreSQL, Docker
- [ ] US-001 — A receptionist can log in with email and password
- [ ] US-002 — A receptionist can create a room
- [ ] US-003 — A receptionist can create a guest profile
- [ ] US-004 — A receptionist can create a booking for a guest
- [ ] US-005 — A receptionist can view the list of current bookings
- [ ] US-006 — A receptionist can cancel a booking

## Completion criteria

- [ ] App starts with docker-compose up
- [ ] Receptionist can log in via a basic interface
- [ ] A full booking flow works end to end
- [ ] Data persists in PostgreSQL

## Dependencies

None — this is the starting point.

## Notes

No microservices. No API gateway. No event broker.
One Node.js app, one PostgreSQL database.
Architecture comes in Epic 01.