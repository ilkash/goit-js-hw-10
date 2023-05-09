import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const card = document.querySelector('.country-info');

function countrySearch(e) {
  e.preventDefault();
  const data = fetchCountries(e.target.value);
  data.then(country => {
    if (country.length === 1) {
      card.innerHTML = '';
      listEl.innerHTML = '';
      const markupCountry = `<li class="country">
                <img src="${country[0].flags.svg}" width ="40" height ="20"/>
                <h2>${country[0].name.official}</h2>
                </li>`;
      const markupInfo = `<p>Capital: ${country[0].capital}</p>
        <p>Population: ${country[0].population}</p>
        <p>Languages: ${Object.values(country[0].languages)}</p>`;
      listEl.insertAdjacentHTML('afterbegin', markupCountry);
      card.insertAdjacentHTML('afterbegin', markupInfo);
    } else if (country.length > 1 && country.length < 11) {
      card.innerHTML = '';
      listEl.innerHTML = '';
      country.forEach(element => {
        listEl.insertAdjacentHTML(
          'afterbegin',
          `<li>
                <div class='list-country'>
                <img src="${element.flags.svg}" width ="40" height ="20"/>
                <h2>${element.name.official}</h2>
                </div>
                </li>
            `
        );
      });
    } else if (country.status === 404) {
      card.innerHTML = '';
      listEl.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (country.length > 10) {
      card.innerHTML = '';
      listEl.innerHTML = '';
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else {
      card.innerHTML = '';
      listEl.innerHTML = '';
    }
  });
}
inputEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));
