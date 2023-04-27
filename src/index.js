import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener(
  'input',
  debounce(onInputCountryName, DEBOUNCE_DELAY)
);

function onInputCountryName() {
  let countryName = refs.input.value.trim();

  if (countryName === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length < 10) {
        onSeveralCountriesList(country);
      } else if (country.length === 1) {
        onOneCountryList(country);
      }
    })
    .catch(err => Notiflix.Notify.failure('Oops, there is no country with that name'));
}


function onOneCountryList(country) {
  const oneCountry = country
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<li>
        <div class = "country-list-box">
        <img src="${flags.svg}" alt = "${
          name.official
        } flag" width="80" height="50">
        <h2 class="country-list-name"><b>${name.official}</b><h2>
        </div>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages)}</p>
        </li>`
    )
    .join('');
  refs.countryInfo.innerHTML = oneCountry;
}

function onSeveralCountriesList(country) {
  const severalCountries = country
    .map(
      ({ flags, name }) =>
        `<li class="country-list-item">
        <img src="${flags.svg}" alt = "${name.official} flag" width="50" height="30">
        <p class="country-list-text"><b>${name.official}</b></p}</li>`
    )
    .join('');

  refs.countryInfo.innerHTML = severalCountries;
}
