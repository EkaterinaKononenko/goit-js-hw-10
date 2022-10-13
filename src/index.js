import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const delay = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, delay));

function onInput(e) {
  const countries = e.target.value.toLowerCase().trim();

  if (countries === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(countries)
    .then(renderCountriesInfo)
    .catch(error => Notify.failure('Oops, there is no country with that name'));
}

function renderCountriesInfo(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.innerHTML = '';
    console.log(countries);
  }

  renderCountriesList(countries);
}

function renderCountriesList(countries) {
  if (countries.length >= 2 && countries.length <= 10) {
    const markup = countries
      .map(({ name, flags }) => {
        return `<li>
        <img src="${flags.svg}" alt="${name.official}" width="30px">
        <h1 class="name">${name.official}</h1>
        </li>`;
      })
      .join('');
    refs.countryList.innerHTML = markup;
    refs.countryInfo.innerHTML = '';
    console.log(countries);
  }

  if (countries.length === 1) {
    const markup = countries
      .map(({ name, capital, population, flags, languages }) => {
        return `<img src="${flags.svg}" alt="${name.official}" width="30px">
          <h1 class="name">${name.official}</h1>
          <p><b>Capital:</b> ${capital}</p>
          <p><b>Population:</b> ${population}</p>
          <p><b>Langueges:</b> ${Object.values(languages)}</p>`;
      })
      .join('');
    refs.countryInfo.innerHTML = markup;
    refs.countryList.innerHTML = '';
    console.log(countries);
  }
}
