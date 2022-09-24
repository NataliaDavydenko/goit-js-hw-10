import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(event => {
    let countryName = event.target.value.trim();

    if (countryName === 0) {
      resetMarkup(countryInfo, countryList);
      return;
    }

    fetchCountries(countryName)
      .then(data => {
        if (data.length === 1) {
          resetMarkup(countryInfo, countryList);
          markupInfo(data);
        } else if (data.length >= 2 && data.length <= 10) {
          resetMarkup(countryInfo, countryList);
          markupList(data);
        } else {
          resetMarkup(countryInfo, countryList);
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        resetMarkup(countryInfo, countryList);
      });
  }, DEBOUNCE_DELAY)
);

function resetMarkup(info, list) {
  info.innerHTML = '';
  list.innerHTML = '';
}

function markupList(countries) {
  const countriesArray = countries.map(country => {
    return `<li class='country__item'><img class='country__img' src="${country.flags.png}" width="50" height='30' alt="flag"><h3 class='country-list__name'>${country.name.official}</h3></li>`;
  });
  countriesArray.forEach(countryElement => {
    countryList.insertAdjacentHTML('beforeend', countryElement);
  });
}

function markupInfo(countries) {
  const country = countries[0];
  const information = `<div class='country-info__inner'>
    <img class='country__img' src="${
      country.flags.png
    }" width="40" height ='30' alt="flag">
    <h2 class='country__name'>${country.name.official}</h2>
  </div>
    <p class='country-desc'><span class='country-desc__name'>Capital:</span>${
      country.capital
    }</p>
    <p class='country-desc'><span class='country-desc__name'>Population:</span>${
      country.population
    }</p>
    <p class='country-desc'><span class='country-desc__name'>Languages:</span>${Object.values(
      country.languages
    ).join(', ')}</p>`;

  countryInfo.insertAdjacentHTML('beforeend', information);
}
