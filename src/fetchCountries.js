export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(respons => respons.json())
    .catch(error => {
      throw Error(error);
    });
};

//console.log(fetchCountries('usa'));
