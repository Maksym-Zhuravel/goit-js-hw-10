import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';


const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputCountryName, DEBOUNCE_DELAY))


function onInputCountryName() {
    let countryName = refs.input.value.trim()


    if (countryName === "") {
        return
    }

    fetchCountries(countryName).then(country => {
        if (country.length > 10) {
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        } else if (country.length >= 2 && country.length < 10) {
            onCountryList(country)
        }
    })
}


function onCountryList(country) {
    const countryCard = country.map(({ flags }) => `<img src="${flags.svg}" alt = "Flag"`).join('')

    refs.countryInfo.innerHTML = countryCard

    console.log(countryCard)
}