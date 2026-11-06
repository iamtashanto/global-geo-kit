import {
  getCountries,
  getCountryByCode,
  getStatesOfCountry,
  getCitiesOfState,
  getAllCitiesOfCountry,
  getAllCitiesInWorld,
} from '@countrystatecity/countries';
import { searchCurrencies } from '@countrystatecity/currencies';
import { searchPhonecodes } from '@countrystatecity/phonecodes';
import { searchTimezones } from '@countrystatecity/timezones';
import { searchPostalCodesByLocalityInCountry } from '@countrystatecity/postalcodes';

export * from '@countrystatecity/countries';
export * from '@countrystatecity/currencies';
export * from '@countrystatecity/phonecodes';
export {
  getManifest,
  getPostalCodesOfState,
  getUnassignedPostalCodesOfCountry,
  getAllPostalCodesOfCountry,
  validatePostalCode,
  lookupPostalCode,
  searchPostalCodesByLocality,
  searchPostalCodesByLocalityInCountry,
  getSupportedCountryCodes,
  isCountrySupported,
} from '@countrystatecity/postalcodes';
export {
  getTimezones,
  getTimezonesByCountry,
  getTimezoneInfo,
  getTimezoneAbbreviations,
  getTimezonesByAbbreviation,
  convertTime,
  getCurrentTime,
  isDaylightSaving,
  getGMTOffset,
  formatGMTOffset,
  isValidTimezone,
  searchTimezones,
  getUniqueAbbreviations,
  getTimezonesByOffset,
} from '@countrystatecity/timezones';
export {
  configure,
  resetConfiguration,
  getCountriesGeoJSON,
  getCountryGeoJSON,
  getStatesGeoJSON,
  getCitiesGeoJSON,
  getAllCitiesGeoJSONOfCountry,
} from '@countrystatecity/geojson';
export * from '@countrystatecity/translations';

export interface GlobalSearchResult {
  type: 'country' | 'city' | 'currency' | 'phonecode' | 'timezone' | 'postalcode';
  value: unknown;
}

export interface GlobalSearchOptions {
  query: string;
  limit?: number;
  countryCode?: string;
  includeCities?: boolean;
  includePostcodes?: boolean;
}

let countriesPromise: ReturnType<typeof getCountries> | undefined;
let citiesPromise: ReturnType<typeof getAllCitiesInWorld> | undefined;

function getCachedCountries() {
  countriesPromise ??= getCountries();
  return countriesPromise;
}

function getCachedCities() {
  citiesPromise ??= getAllCitiesInWorld();
  return citiesPromise;
}

export async function searchGlobal(
  queryOrOptions: string | GlobalSearchOptions,
  legacyLimit = 20,
): Promise<GlobalSearchResult[]> {
  const options = typeof queryOrOptions === 'string'
    ? { query: queryOrOptions, limit: legacyLimit }
    : queryOrOptions;
  const { query, limit = 20, countryCode, includeCities = false, includePostcodes = false } = options;
  const term = query.trim();
  if (!term) return [];
  const [countries, cities, currencies, phonecodes, timezones, postcodes] = await Promise.all([
    getCachedCountries(),
    includeCities ? getCachedCities() : Promise.resolve([]),
    searchCurrencies(term),
    searchPhonecodes(term),
    searchTimezones(term),
    includePostcodes && countryCode
      ? searchPostalCodesByLocalityInCountry(countryCode, term)
      : Promise.resolve([]),
  ]);
  const normalized = term.toLocaleLowerCase();
  const countryResults = countries
    .filter((country) => [country.name, country.iso2, country.iso3].some((value) => value?.toLocaleLowerCase().includes(normalized)))
    .map((value) => ({ type: 'country' as const, value }));
  const cityResults = cities
    .filter((city) => city.name.toLocaleLowerCase().includes(normalized))
    .map((value) => ({ type: 'city' as const, value }));
  return [...countryResults, ...cityResults,
    ...currencies.map((value) => ({ type: 'currency' as const, value })),
    ...phonecodes.map((value) => ({ type: 'phonecode' as const, value })),
    ...timezones.map((value) => ({ type: 'timezone' as const, value })),
    ...postcodes.map((value) => ({ type: 'postalcode' as const, value }))].slice(0, limit);
}

export function clearGlobalSearchCache(): void {
  countriesPromise = undefined;
  citiesPromise = undefined;
}

export async function getLocation(countryCode: string, stateCode?: string, cityName?: string) {
  if (!stateCode) return getCountryByCode(countryCode);
  if (!cityName) return getStatesOfCountry(countryCode);
  const cities = await getCitiesOfState(countryCode, stateCode);
  return cities.filter((city) => city.name.toLocaleLowerCase() === cityName.toLocaleLowerCase());
}

export const getCities = getAllCitiesOfCountry;
