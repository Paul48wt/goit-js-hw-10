import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  if (event.target.value === '') {
    refs.countryInfo.innerHTML = '';
    refs.listOfCountries.innerHTML = '';
    return;
  }
  fetchCountries(event.target.value.trim());
}
