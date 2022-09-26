const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

function resetMarkup(info, list) {
  info.innerHTML = '';
  list.innerHTML = '';
}

function markupList(countries) {
  const countriesArray = countries.map(country => {
      return `<li class='country__item'><img class='country__img' src="${country.flags.png}" width="50" height='30' alt="flag">
    <h3 class='country-list__name'>${country.name.official}</h3></li>`;
  });
  countriesArray.forEach(countryElement => {
    countryList.insertAdjacentHTML('beforeend', countryElement);
  });
}

function markupInfo(countries) {
  const country = countries[0];
  const information = `<div class='country-info__inner'>
    <img class='country__img' src="${country.flags.png}" width="40" height ='30' alt="flag">
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
};

export {
  countryList,
  countryInfo,
  markupInfo,
  markupList,
  resetMarkup,
};