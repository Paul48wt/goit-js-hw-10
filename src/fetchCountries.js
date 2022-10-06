import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v2/';
const listOfCountries = document.querySelector('.country-list');
export function fetchCountries(name) {
  fetch(
    `${BASE_URL}name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(r => {
      return r.json();
    })
    .then(data => {
      tooManyMessage(data.length);
      populateListOfCountries(createListOfContriesMarkup(data.length, data));
    })
    .catch(error => console.log(error));
}

function tooManyMessage(value) {
  if (value > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function createListOfContriesMarkup(value, data) {
  if (value > 2 && value < 10) {
    return data
      .map(
        item =>
          `<li><img src="${item.flags.svg}" alt="" width=20> ${item.name}</li>`
      )
      .join('');
  }
}
// `<li><img src="${item.flags.svg}" alt=""> ${item.name}</li>`

function populateListOfCountries(markup) {
  console.log(markup);
  listOfCountries.innerHTML = markup;
}
