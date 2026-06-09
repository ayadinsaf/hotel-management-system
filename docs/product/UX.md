# UX — POC (staff app)

## Target user

Receptionist. Works at the front desk. Needs a fast, reliable tool
to manage the day. No time for complex interfaces.

## Design principles

- One screen, one job
- Most important information visible without scrolling
- Minimum clicks to complete a common task

---

## Screens

### 1. Login

Goal: authenticate and access the app.

Fields:
- Email
- Password
- Submit button

Behavior:
- On success: redirect to dashboard
- On failure: display error message inline

---

### 2. Dashboard — today's overview

Goal: understand the state of the hotel at a glance.

Sections:
- Expected check-ins today (guest name, room, booking id)
- Expected check-outs today (guest name, room, booking id)
- Available rooms (room number, type, capacity)

Behavior:
- Default view when logged in
- Data scoped to current date automatically
- Each check-in row has a "check in" action button
- Each check-out row has a "check out" action button

---

### 3. Bookings

Goal: see all bookings and create new ones.

List view:
- Columns: guest name, room, check-in date, check-out date, status
- Filter by date range
- Button: new booking

Create booking form:
- Guest (select existing or create new)
- Room (select from available rooms for the selected dates)
- Check-in date
- Check-out date
- Submit button

Behavior:
- Room selector only shows rooms available for selected dates
- On success: redirect to booking detail
- On conflict: display error (room not available)

---

### 4. Rooms

Goal: see the status of all rooms and manage availability.

List view:
- Columns: room number, type, capacity, status
- Status values: available, occupied, out of service

Actions:
- Mark a room as out of service
- Mark a room as available

---

## Navigation

    Login → Dashboard
    Dashboard → Bookings (via nav)
    Dashboard → Rooms (via nav)
    Bookings → Create booking (via button)