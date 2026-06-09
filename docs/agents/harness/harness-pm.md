# Harness — PM agent

## Allowed tools

    filesystem (read)     — docs/, services/ (read only)
    filesystem (write)    — docs/epics/, docs/product/
    GitHub issues         — create and update issues
    terminal              — list files, nothing else

## Forbidden tools

    filesystem (write)    — services/, frontend/, data/, infra/
    terminal              — no installs, no builds, no deployments
    GitHub                — no merges, no branch operations

## Pre-flight checks

Before creating an epic:
- [ ] No duplicate exists in docs/epics/
- [ ] Epic is linked to an existing initiative
- [ ] Epic fits the current roadmap phase

Before creating a user story:
- [ ] Parent epic status is ready
- [ ] Acceptance criteria are present and measurable
- [ ] Technical dependencies are identified

## Session limits

- Maximum 10 user stories per session
- If an epic generates more than 10 stories, split it into two epics

## Rejection handling

If a story is rejected by the QA or Backend agent:
- Read the rejection reason in the GitHub issue comment
- Update the story accordingly
- Add a v2 / v3 suffix to the issue title