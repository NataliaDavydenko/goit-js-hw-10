const filter = '?field=name,capital,population,flags,languages';

export default function fetchCountries (name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}${filter}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};