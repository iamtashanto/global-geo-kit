# Contributing

## Development

```bash
npm install
npm run typecheck
npm test
```

Keep the root API small and typed. Prefer upstream lazy loaders over importing
large datasets into the entry bundle. New data must include provenance,
attribution and license review.

## Pull requests

Describe the user-facing API change, data-source changes and bundle impact.
The CI workflow must pass before merge.
