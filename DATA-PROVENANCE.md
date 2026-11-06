# Data provenance

`global-geo-kit` is an aggregation facade. It does not claim ownership of the
upstream datasets and does not silently replace their licenses.

| Domain | Upstream package/source | Update responsibility |
| --- | --- | --- |
| Countries, regions, states, cities | Countries States Cities Database via `@countrystatecity/countries` | Pin and review upstream releases |
| Postal codes | `@countrystatecity/postalcodes` | Preserve source notices and supported-country manifest |
| GeoJSON points | `@countrystatecity/geojson` | Preserve source notices; points only |
| Currencies | `@countrystatecity/currencies` | Preserve upstream package license and release |
| Phone codes | `@countrystatecity/phonecodes` | Preserve upstream package license and release |
| Timezones | `@countrystatecity/timezones` and IANA data | Review timezone data updates |
| Translations | `@countrystatecity/translations` | Preserve upstream package license and release |

The package uses semver dependency ranges for normal consumers, but release
CI installs from the lockfile and runs typecheck, build, smoke tests and
`npm pack --dry-run` before publishing. Any data update must document the
upstream version, source URL, license/attribution impact and validation result.

## Licensing

The wrapper source is MIT. The underlying data may be subject to ODbL-1.0 or
other upstream terms. Read [NOTICE-ODBL.txt](./NOTICE-ODBL.txt) and the notices
distributed by the upstream packages before redistributing data.
