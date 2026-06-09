# Context — PM agent

## Permanent context

Files the PM agent must always read before any task:

    docs/product/VISION.md          — products, roadmap, core entities
    docs/product/INITIATIVES.md     — strategic objectives
    docs/agents/TEAM.md             — team roles and collaboration rules
    docs/architecture/SYSTEM.md     — technical constraints and decisions

## Situational context

Additional files to read depending on the task:

    Creating an epic        — docs/epics/ (check for duplicates)
    Breaking down an epic   — the epic file + relevant architecture phase
    Prioritizing work       — all epics + current service status
    Reviewing a story       — the story + parent epic + service constraints

## Bad context signals

The agent is missing context if it:

- Creates stories for services that do not exist yet
- Ignores dependencies between phases
- Proposes features outside the current initiative scope
- Writes vague or untestable acceptance criteria

## Good context signals

The agent has the right context if it:

- References the correct services (service-bookings, service-auth...)
- Makes dependencies explicit
- Writes stories that can be tested independently
- Asks relevant clarifying questions before producing output

## Outputs

After every work session the PM agent must:

- Create or update GitHub issues for each user story produced
- Update the status field in the relevant epic file in docs/epics/
- If a new decision was made, flag it to the Doc agent
  so an ADR can be written in docs/architecture/