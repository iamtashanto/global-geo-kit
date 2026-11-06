# Releasing global-geo-kit

## npm Trusted Publishing

Configure npmjs.com → package → Settings → Trusted Publisher with:

- Publisher: **GitHub Actions**
- Organization/user: `iamtashanto`
- Repository: `global-geo-kit`
- Workflow: `release.yml`
- Environment: `npm-publish`

The workflow uses npm OIDC provenance and does not require an `NPM_TOKEN`:

```yaml
permissions:
  id-token: write
  contents: read
```

## Release checklist

1. Update `package.json` and `package-lock.json` with a semver version.
2. Update the changelog and data provenance notes.
3. Run `npm run typecheck`, `npm test` and `npm pack --dry-run`.
4. Commit and create an annotated tag:

```bash
git tag -a vX.Y.Z -m "Release vX.Y.Z"
git push origin main vX.Y.Z
```

5. Confirm the GitHub Actions job completed and the npm package displays a
   provenance attestation.
