const BASE_URL = 'https://restcountries.com/v2/';

export async function fetchCountries(name) {
  const response = await fetch(
    `${BASE_URL}name/${name}?fields=name,capital,population,flags,languages`
  );

  return await response.json();
}
