# global-geo-kit

<p align="center">
  <strong>One professional TypeScript toolkit for global location data.</strong><br>
  Countries, administrative regions, cities, currencies, phone codes, postal codes, timezones and GeoJSON from one package.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/global-geo-kit"><img src="https://img.shields.io/npm/v/global-geo-kit?color=cb3837&logo=npm" alt="npm version"></a>
  <a href="https://github.com/iamtashanto/global-geo-kit/actions"><img src="https://github.com/iamtashanto/global-geo-kit/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/iamtashanto/global-geo-kit/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT license"></a>
  <a href="https://globalgeokit.tashanto.com"><img src="https://img.shields.io/badge/docs-globalgeokit.tashanto.com-6366f1" alt="Documentation"></a>
</p>

## Why global-geo-kit?

Most applications need several location datasets at once: a country selector, state and city cascading fields, currency formatting, phone dial codes, postal validation, timezone conversion and map-ready coordinates. `global-geo-kit` gives you one consistent, typed entry point while preserving the upstream packages' lazy loading for large datasets.

```bash
npm install global-geo-kit
```

Works with Node.js, Next.js, Vite, browsers and edge runtimes through ESM and CommonJS builds.

## Included data

| Area | Included |
| --- | --- |
| Countries | 250 countries, ISO2/ISO3, regions, subregions, flags and coordinates |
| Administrative data | 5,000+ states/regions and 150,000+ cities |
| Currencies | 154 ISO 4217 currencies, symbols, native symbols, decimals and formatting |
| Phone | Country dial codes, reverse lookup, search and formatting |
| Postal | 728,556 postal codes across 117 countries, locality search and existence validation |
| Timezones | IANA zones, country mapping, current time, conversion and DST helpers |
| GeoJSON | Country, state and city Point FeatureCollections |
| Developer experience | TypeScript, ESM, CJS, lazy loading, tree-shaking and compatibility helpers |

## Quick start

```ts
import {
  getCountries,
  getStatesOfCountry,
  getCitiesOfState,
  searchGlobal,
  formatCurrencyAmount,
  getPhonecodeByCountry,
  getTimezonesByCountry,
} from 'global-geo-kit';

const countries = await getCountries();
const states = await getStatesOfCountry('BD');
const cities = await getCitiesOfState('US', 'CA');

const results = await searchGlobal({
  query: 'Bangladesh',
  limit: 10,
  includeCities: false,
});

const price = await formatCurrencyAmount(1250, 'BDT');
const phone = await getPhonecodeByCountry('BD');
const zones = await getTimezonesByCountry('BD');
```

## API guide

### Countries, states and cities

```ts
import {
  getCountries,
  getCountryByCode,
  getStatesOfCountry,
  getStateByCode,
  getCitiesOfState,
  getAllCitiesOfCountry,
  searchCitiesByName,
} from 'global-geo-kit';

const country = await getCountryByCode('US');
const states = await getStatesOfCountry('US');
const california = await getStateByCode('US', 'CA');
const cities = await getCitiesOfState('US', 'CA');
const matches = await searchCitiesByName('US', 'CA', 'san');
```

Compatibility aliases:

```ts
import { getCountries, getStatesOfCountry, getCitiesOfState } from 'global-geo-kit';
```

### Global search

Search countries, cities, currencies, phone codes, timezones and optionally postal localities.

```ts
const matches = await searchGlobal({
  query: 'Dhaka',
  countryCode: 'BD',
  includePostcodes: true,
  limit: 20,
});

// [{ type: 'city', value: ... }, { type: 'postalcode', value: ... }]
```

The legacy form remains supported:

```ts
const matches = await searchGlobal('Japan', 10);
```

The city index is cached after its first use. Call `clearGlobalSearchCache()` when a long-running process needs to release the in-memory index.
Cities are opt-in (`includeCities: true`) so a country/currency/phone/timezone search does not load the 150,000+ city index unnecessarily.

### Currencies

```ts
import {
  getCurrencies,
  getCurrencyByCode,
  getCurrencySymbol,
  formatCurrencyAmount,
} from 'global-geo-kit';

const usd = await getCurrencyByCode('USD');
const symbol = await getCurrencySymbol('BDT');
const formatted = await formatCurrencyAmount(1999.5, 'USD');
```

### Phone codes

```ts
import {
  getPhonecodeByCountry,
  getCountriesByDialCode,
  formatWithDialCode,
} from 'global-geo-kit';

const dialCode = await getPhonecodeByCountry('BD');
const countries = await getCountriesByDialCode('+1');
const international = await formatWithDialCode('01700000000', 'BD');
```

### Postal codes

```ts
import {
  validatePostalCode,
  lookupPostalCode,
  searchPostalCodesByLocalityInCountry,
} from 'global-geo-kit';

const valid = await validatePostalCode('BD', '1207');
const entries = await lookupPostalCode('US', '10001');
const dhaka = await searchPostalCodesByLocalityInCountry('BD', 'Dhaka');
```

Postal data is loaded only when a postal API is called.

### Timezones

```ts
import {
  getTimezonesByCountry,
  getCurrentTime,
  convertTime,
  isDaylightSaving,
} from 'global-geo-kit';

const zones = await getTimezonesByCountry('BD');
const now = await getCurrentTime('Asia/Dhaka');
const converted = await convertTime(
  new Date(),
  'Asia/Dhaka',
  'America/New_York',
);
const dst = await isDaylightSaving('America/New_York');
```

### GeoJSON

```ts
import {
  getCountryGeoJSON,
  getStatesGeoJSON,
  getCitiesGeoJSON,
} from 'global-geo-kit';

const country = await getCountryGeoJSON('BD');
const states = await getStatesGeoJSON('US');
const cities = await getCitiesGeoJSON('US', 'CA');
```

GeoJSON uses valid GeoJSON Point coordinates in `[longitude, latitude]` order. These are point features, not administrative boundary polygons.

## Performance and bundle strategy

- ESM and CommonJS builds are included.
- Large country, city, postal and GeoJSON datasets stay lazy-loaded.
- Global city search caches its index after first use.
- `sideEffects: false` enables tree-shaking.
- Use targeted APIs such as `getCitiesOfState()` instead of loading every city.

## Data provenance

The geographic datasets are derived from the [Countries States Cities Database](https://github.com/dr5hn/countries-states-cities-database), with attribution and applicable ODbL-1.0 notices preserved in [NOTICE-ODBL.txt](./NOTICE-ODBL.txt). Currency, phone, timezone and postal data retain their upstream notices and licenses.

The package source code is MIT licensed. See [DATA-PROVENANCE.md](./DATA-PROVENANCE.md) for source versions, update policy and validation responsibilities.

## Contributing

```bash
npm install
npm run typecheck
npm test
```

Please open an issue before proposing a data-source or API change. Data updates must include provenance, license review and validation evidence.

## Links

- Website and documentation: <https://globalgeokit.tashanto.com>
- npm: <https://www.npmjs.com/package/global-geo-kit>
- GitHub: <https://github.com/iamtashanto/global-geo-kit>
- Support: <https://www.supportkori.com/iamtashanto>
