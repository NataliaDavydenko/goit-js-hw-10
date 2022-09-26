import './css/styles.css';
import Notiflix from 'notiflix';
import API from './fetchCountries';
import {
  countryList,
  countryInfo,
  markupInfo,
  markupList,
  resetMarkup,
} from "./markup";
  
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');

inputEl.addEventListener('input', debounce(e => {
  let countryName = inputEl.value.trim();

  if (countryName.length === 0) {
    resetMarkup(countryInfo, countryList);
    return;
  }
    
  API.fetchCountries(countryName)
    .then(data => {
      if (data.length === 1) {
        resetMarkup(countryInfo, countryList);
        markupInfo(data);
      } else if (data.length > 1 && data.length <= 10) {
        resetMarkup(countryInfo, countryList);
        markupList(data);
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
         resetMarkup(countryInfo, countryList);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      resetMarkup(countryInfo, countryList);
    })
}, DEBOUNCE_DELAY));