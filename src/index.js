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
  
  fetchCountries(event.target.value.trim()).then(data => {
    tooManyMessage(data.length);
    createListOfContriesMarkup(data.length, data);

    if (data.status === 404) {
      throw new Error();
    }
  }).
    catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name')
    });
   
  


function tooManyMessage(value) {
  if (value > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );

    refs.countryInfo.innerHTML = '';
    refs.listOfCountries.innerHTML = '';
  }
}

function createListOfContriesMarkup(amount, data) {
  let markup = '';
  if (amount >= 2 && amount < 10) {
    markup = data
      .map(
        item =>
          `<li class="country__list"><img src="${item.flags.svg}" alt="" width=20> ${item.name}</li>`
      )
      .join('');
    refs.countryInfo.innerHTML = '';
    refs.listOfCountries.innerHTML = markup;
  } else if (amount === 1) {
    markup = data
      .map(
        item =>
          `<ul><li ><img class="flag" src="${
            item.flags.svg
          }" alt="" width=30 ><span class="country__name">${
            item.name
          }</span> </li>
          <li><b>Capital:</b> ${item.capital}</li>
          <li><b>Population:</b> ${item.population}</li>
          <li><b>Languages:</b> ${item.languages
            .map(item => item.name)
            .join(', ')} </li></ul>`
      )
      .join('');
    refs.listOfCountries.innerHTML = '';
    refs.countryInfo.innerHTML = markup;
  }
}
