// importing ShowCountry component, 
// which is used to render the searched country 
// if there is only one country in the countryList 
// and the country exists
import ShowCountry from './ShowCountry';

// 2.18 countries infos
// This component is used to render the filtered countries
const FilteredCountries = ({ countryList, setCountryList, setSearchedCountry }) => {
  // if the countryList is more than 10, return a message
  if (countryList.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
    // if the countryList is less than 10 and more than 1, return the countryList
  } else if (countryList.length <= 10 && countryList.length > 1) {
    return (
      <div>
        {/* map all the countries in the countryList, using index as the key */}
        {countryList.map((country, index) =>
          <div key={index}>
            {country.name.common}

            {/* 2.19 button for every filtered country */}
            <button onClick={() => {
              // set country name to the search input
              setSearchedCountry(country.name.common);
              // set the country to the countryList.
              // not countryList will only have one country
              // and the ShowCountry component will be rendered
              setCountryList([country]);
            }}>show</button>
          </div>
        )}
      </div>
    )
    // if the countryList is only one, return the ShowCountry component
  } else if (countryList.length === 1) {
    return (
      <ShowCountry country={countryList[0]} />
    )
  }
}


export default FilteredCountries;