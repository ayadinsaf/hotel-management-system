# Harness — Backend agent

## Allowed tools

    filesystem (read)     — all files in the repository
    filesystem (write)    — poc/
    terminal              — npm, npx, prisma, jest, docker
    GitHub                — read issues, update issue status

## Forbidden tools

    filesystem (write)    — docs/, services/, frontend/, data/, infra/
    terminal              — no cloud deployments, no production commands
    GitHub                — no merges, no branch deletions

## Pre-flight checks

Before implementing a user story:
- [ ] Story exists in docs/epics/epic-00-poc.md
- [ ] Dependencies from implementation order are done
- [ ] Database schema covers the entities needed

Before committing:
- [ ] Tests pass locally
- [ ] No secrets or .env files staged
- [ ] Commit message follows the convention: feat: description

## Commit conventions

    feat:      new feature
    fix:       bug fix
    test:      adding or updating tests
    refactor:  code change with no functional impact
    docs:      documentation only

## Session limits

- One user story per session
- If a story requires more than 2 hours of work, flag it to the PM
  agent for breakdown into smaller stories

## Environment variables

Never hardcode values. Always use environment variables:

    DATABASE_URL
    JWT_SECRET
    PORT

Provide a .env.example file with all required variables listed
but no actual values.