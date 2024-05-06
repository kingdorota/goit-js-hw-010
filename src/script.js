const searchBox = document.getElementById('search-box');
const countryList = document.getElementById('country-list');

const debouncedSearch = _.debounce(async name => {
  if (name.trim() === '') {
    countryList.innerHTML = '';
    return;
  }
  try {
    const countries = await fetchCountries(name);
    displayCountries(countries);
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
}, 300);

searchBox.addEventListener('input', event => {
  const name = event.target.value.trim();
  debouncedSearch(name);
});

function displayCountries(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
    countryList.innerHTML = '';
    return;
  }

  const html = countries
    .map(
      country => `
    <li>
      <p>Name: ${country.name.official}</p>
      <p>Capital: ${country.capital}</p>
      <p>Population: ${country.population}</p>
      <img src="${country.flags.svg}" alt="Flag">
      <p>Languages: ${country.languages.map(lang => lang.name).join(', ')}</p>
    </li>
  `
    )
    .join('');
  countryList.innerHTML = html;
}
