# global-geo-kit

One TypeScript package for global location data and utilities.

## Includes

- 250 countries with ISO codes, regions, flags and coordinates
- 5,000+ states/regions and 150,000+ cities
- Global normalized search
- 154 ISO 4217 currencies with symbols, decimals and formatting
- Country phone/dial codes with reverse lookup and formatting
- 728,556 postal codes across 117 countries with locality search and validation
- IANA timezones, current time, conversion and DST helpers
- Country, state and city GeoJSON Point FeatureCollections
- ESM + CJS, TypeScript declarations, lazy data loading and upstream caching
- Compatibility helpers such as `getCountries`, `getStatesOfCountry`, and `getCitiesOfState`

## Install

```bash
npm install global-geo-kit
```

## Usage

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
const results = await searchGlobal('Bangladesh');
const amount = await formatCurrencyAmount(1250, 'BDT');
const dialCode = await getPhonecodeByCountry('BD');
const zones = await getTimezonesByCountry('BD');
```

The package facade exposes the complete upstream feature set while preserving lazy loading for large postal and GeoJSON assets.

## Data and licensing

Geographic data is derived from the Countries States Cities Database and is subject to ODbL-1.0. See [NOTICE-ODBL.txt](./NOTICE-ODBL.txt).
Original wrapper code is MIT licensed.
