import {
  getCountries,
  getCountryByCode,
  getStatesOfCountry,
  getCitiesOfState,
  getAllCitiesOfCountry,
  searchCitiesByName,
} from '@countrystatecity/countries';
import { searchCurrencies } from '@countrystatecity/currencies';
import { searchPhonecodes } from '@countrystatecity/phonecodes';
import { searchTimezones } from '@countrystatecity/timezones';

export * from '@countrystatecity/countries';
export * from '@countrystatecity/currencies';
export * from '@countrystatecity/phonecodes';
export * from '@countrystatecity/postalcodes';
export * from '@countrystatecity/timezones';
export * from '@countrystatecity/geojson';
export * from '@countrystatecity/translations';

export interface GlobalSearchResult {
  type: 'country' | 'city' | 'currency' | 'phonecode' | 'timezone';
  value: unknown;
}

export async function searchGlobal(query: string, limit = 20): Promise<GlobalSearchResult[]> {
  const term = query.trim();
  if (!term) return [];
  const [countries, cities, currencies, phonecodes, timezones] = await Promise.all([
    getCountries(),
    searchCitiesByName(term),
    searchCurrencies(term),
    searchPhonecodes(term),
    searchTimezones(term),
  ]);
  const normalized = term.toLocaleLowerCase();
  const countryResults = countries
    .filter((country) => [country.name, country.iso2, country.iso3].some((value) => value?.toLocaleLowerCase().includes(normalized)))
    .map((value) => ({ type: 'country' as const, value }));
  return [...countryResults, ...cities.map((value) => ({ type: 'city' as const, value })),
    ...currencies.map((value) => ({ type: 'currency' as const, value })),
    ...phonecodes.map((value) => ({ type: 'phonecode' as const, value })),
    ...timezones.map((value) => ({ type: 'timezone' as const, value }))].slice(0, limit);
}

export async function getLocation(countryCode: string, stateCode?: string, cityName?: string) {
  if (!stateCode) return getCountryByCode(countryCode);
  if (!cityName) return getStatesOfCountry(countryCode);
  const cities = await getCitiesOfState(countryCode, stateCode);
  return cities.filter((city) => city.name.toLocaleLowerCase() === cityName.toLocaleLowerCase());
}

export const getCities = getAllCitiesOfCountry;
