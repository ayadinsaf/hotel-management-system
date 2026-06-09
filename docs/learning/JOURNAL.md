# Project Journal

Chronological log of everything built and learned.
Read this to remember why decisions were made and how the project evolved.

---

## Step 1 — Created the GitHub repository

We created the repository `hotel-management-system` on GitHub.
This is the single source of truth for all code and documentation.

Configuration:
- Public repository
- README initialized
- .gitignore set to Node
- MIT license

**Tips:**
- Always initialize with a README so the repo is not empty
- Add .gitignore at creation, not after — avoids committing unwanted files
- .DS_Store files are created automatically by macOS — add them
  to .gitignore immediately

---

## Step 2 — Installed Node.js and Claude Code

Node.js is the runtime that executes JavaScript outside the browser.
Claude Code is the CLI tool that runs AI agents in the terminal.

    brew install node
    npm install -g @anthropic-ai/claude-code

**Tips:**
- Homebrew is the standard package manager on macOS
- Node.js installs globally — version check: node --version
- Claude Code requires a Claude Pro subscription to run

---

## Step 3 — Cloned the repo and opened it in VS Code

    cd ~/projects
    git clone https://github.com/ayadinsaf/hotel-management-system
    cd hotel-management-system
    code .

The `code .` command opens the current folder directly in VS Code.
It requires enabling the shell command first via Cmd + Shift + P
→ Shell Command: Install 'code' command in PATH.

**Tips:**
- Keep all projects in ~/projects — clean and consistent
- Open VS Code from the terminal with `code .` rather than
  dragging folders — faster and less error-prone

---

## Step 4 — Created the documentation structure

Before writing any code, we created the documentation structure.
This is the docs-first principle — decisions are documented
before they are implemented.

    docs/product/       vision, initiatives, roadmap, UX
    docs/architecture/  system diagrams
    docs/agents/        agent team, prompts, contexts, harness
    docs/epics/         epics and user stories
    docs/learning/      concepts, tips, this journal

**Tips:**
- Docs that live in the repo stay in sync with the code
- Never put architecture decisions only in Notion or Google Drive
- A new team member (or agent) should understand the project
  by reading docs/ alone

---

## Step 5 — Wrote README.md

The README is the front page of the project.
It is the first file anyone sees when landing on the GitHub repo.
It answers: what is this, what does it do, how do I run it.

Keep it honest and up to date. A README that describes
a future state is misleading.

**Tips:**
- Write in English — universal convention in tech
- No emojis, no marketing language — write for developers
- Update the README every time the project structure changes

---

## Step 6 — Wrote VISION.md

The vision document answers three questions:
- What problem does this solve?
- Who are the users?
- What are we building and in what order?

It is the reference document for the entire project.
Every agent reads it before working.

**Tips:**
- Keep it short — one page maximum
- The roadmap in VISION.md is high level
  Detailed sprint planning lives in ROADMAP.md
- If you cannot summarize the vision in three sentences,
  the project scope is not clear enough yet

---

## Step 7 — Wrote INITIATIVES.md

Initiatives are the strategic objectives of the project.
They sit above epics in the hierarchy.

    Initiative → Epic → User Story → Task

Each initiative maps to a phase in the roadmap.

**Tips:**
- Initiatives should be stable — they rarely change
- If an initiative changes often, it is probably an epic

---

## Step 8 — Wrote SYSTEM.md

The system architecture document describes how all the pieces fit together.
It contains Mermaid diagrams for each architectural phase.

Mermaid is a text-based diagramming language.
Diagrams are versioned in the repo — no lost images in Google Drive.

    graph TB        top to bottom diagram
    sequenceDiagram interaction between components over time
    graph LR        left to right diagram

GitHub renders Mermaid natively.
VS Code needs the Markdown Preview Mermaid Support extension.

**Tips:**
- Triple backticks for Mermaid blocks must be flush left
  No indentation, or the diagram will not render
- When in doubt, push to GitHub to check the render
- Keep one diagram per architectural phase — easier to read

---

## Step 9 — Wrote TEAM.md

The team charter defines the agent team.
Each agent has a role, inputs, outputs, and allowed tools.

    PM          orchestrates, writes epics and user stories
    Backend     builds microservices and APIs
    Frontend    builds user interfaces
    DevOps      handles containers, CI/CD, deployment
    QA          writes tests, validates deliverables
    Data        builds data pipeline and dbt models
    Doc         keeps documentation in sync with code

**Tips:**
- Define what each agent cannot do, not just what it can do
- Agents communicate through files in docs/ and GitHub issues
- The PM agent is the only one that creates GitHub issues

---

## Step 10 — Configured the PM agent

Each agent has three configuration files:

    system-pm.md    identity, responsibilities, rules, output templates
    ctx-pm.md       what to read and when, good/bad context signals
    harness-pm.md   allowed tools, forbidden tools, pre-flight checks

This is the context engineering and harness pattern.
It prevents agents from going off-script and producing useless output.

**Tips:**
- The system prompt must be complete — agents have no memory
  between sessions. Every session starts from scratch.
- Bad context = bad output. If an agent produces wrong results,
  check what it was given to read, not just what it was asked to do.
- Define session limits — max 10 user stories per session keeps quality high

---

## Step 11 — Wrote CLAUDE.md

CLAUDE.md is read automatically by Claude Code at the start
of every session. It is the entry point for the entire agent system.

It contains:
- Project summary
- Repository structure
- How to invoke each agent
- Current phase and active epic
- Coding conventions

**Tips:**
- Keep CLAUDE.md up to date — it is what Claude Code reads first
- Update the active epic every time a new phase starts
- The conventions section prevents agents from making inconsistent choices

---

## Step 12 — Wrote the epics

### Epic 00 — POC
The POC epic covers the minimum viable booking flow.
One app, one database, basic interface. No microservices.

Goal: see something working as fast as possible.
Avoid the tunnel effect — weeks of setup before seeing any result.

### Epic 01 — Foundations
Splitting the POC into microservices.
Each service owns its domain and its database.
Depends on Epic 00 being completed first.

**Tips:**
- One epic at a time — do not start epic 01 before epic 00 is done
- Scope creep is the main reason projects stall
- The completion criteria in an epic are more important than the user stories
  They define what done actually means

---

## Step 13 — Wrote ROADMAP.md

The roadmap gives the full picture: phases, timeline, and budget.

    Phase 0    POC                    now → end of June 2026
    Phase 1    Microservices          July - August 2026
    Phase 2    Staff app              September - October 2026
    Phase 3    Event-driven           November 2026
    Phase 4    Booking site           December 2026
    Phase 5    Data pipeline          January - February 2027
    Phase 6    ML and pricing         March - April 2027

Budget: ~18€/month (Claude Pro + AWS free tier + Snowflake trial)

**Tips:**
- Estimate in durations, not fixed dates — projects slip
- Budget for the tools you will actually use, not the ones you plan to use
- Sprint planning and detailed breakdowns are added at the start
  of each phase, not upfront — you know more then

---

## Step 14 — Wrote UX.md

The UX document describes each screen in the staff app.
Not a mockup — a textual wireframe.

For each screen:
- Goal: what the user wants to accomplish
- Content: what they see
- Actions: what they can do
- Behavior: what happens when they act

The four screens for the POC:
    Login           authenticate and access the app
    Dashboard       understand the state of the hotel at a glance
    Bookings        see all bookings and create new ones
    Rooms           see room status and manage availability

**Tips:**
- Define UX before writing backend code
  The API must support what the interface needs, not the other way around
- One screen, one job — if a screen does two things, split it
- The dashboard is always the most important screen
  It is what the user sees first every morning

---

## Step 15 — Configured the Backend agent

Same pattern as the PM agent — three files:

    system-backend.md    Node.js, Express, Prisma, Jest, project structure
    ctx-backend.md       implementation order, what to read per task
    harness-backend.md   allowed tools, forbidden paths, commit conventions

The implementation order matters:
    1. Project setup and Docker
    2. Database schema
    3. Auth routes
    4. Room routes
    5. Guest routes
    6. Booking routes
    7. Dashboard route

**Tips:**
- Always implement auth first — everything else depends on it
- Define the database schema before writing any route
  Schema changes are expensive once you have data
- One user story per agent session — more than that and quality drops

---

## Step 16 — Created the POC skeleton

Files created before Claude Code writes the actual implementation:

    poc/src/prisma/schema.prisma    database schema (all entities)
    poc/.env.example                required environment variables
    poc/README.md                   setup instructions
    poc/Dockerfile                  container definition
    poc/docker-compose.yml          local orchestration
    poc/package.json                dependencies and scripts
    poc/src/index.js                app entry point
    poc/src/middleware/auth.js      JWT verification middleware

**Tips:**
- Create the skeleton before running Claude Code
  Agents produce better output when the structure already exists
- The Dockerfile should use node:18-alpine — lighter and faster
- Always define a named volume for the database container
  Without it, data is lost every time the container stops
- .env.example is mandatory — it is the contract between
  the code and the environment

---

## Step 17 — Started implementing auth

Files created:

    poc/src/routes/auth.js              POST /auth/login
    poc/src/controllers/authController.js
    poc/src/services/authService.js

The Route / Controller / Service pattern:

    Route       defines the URL and HTTP verb
    Controller  validates inputs, calls service, formats response
    Service     pure business logic — no HTTP knowledge

**Tips:**
- Put logic in services, not controllers
  If you cannot test it without an HTTP server, it is in the wrong place
- Always return the same error for wrong email and wrong password
  Separate messages reveal information to attackers
- JWT tokens are stateless — the server stores nothing
  The token carries the user id, role, and expiration
- Never store passwords in plain text
  bcrypt hashes passwords irreversibly before storing them