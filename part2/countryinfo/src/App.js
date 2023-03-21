
// import useState, and axios
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

// import FilteredCountries component
import FilteredCountries from './components/FilteredCountries';

// 2.18 countries infos
const App = () => {
  // state for all countries
  const [AllCountries, setAllCountries] = useState([]);
  // state for searched country
  const [searchedCountry, setSearchedCountry] = useState('');
  // state for country list, which is the filtered countries
  const [countryList, setCountryList] = useState([]);

  // using axios to fetch data from restcountries.com
  // setting the data to countries state
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setAllCountries(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  // handling the search input
  const handleSearchChange = (event) => {
    setSearchedCountry(event.target.value);

    // if the search input is empty, set the countryList to empty array
    if (event.target.value === '') {
      setCountryList([]);
    }
    // if the search input is not empty, filter the countries by the input
    else {
      setCountryList(AllCountries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    }
  }


  return (
    <>
      {/* Input field for searching countries */}
      <div>
        find countries <input value={searchedCountry} onChange={handleSearchChange} />
      </div>

      {/* passing the countryList state to FilteredCountries component */}
      <FilteredCountries countryList={countryList} setCountryList={setCountryList} setSearchedCountry={setSearchedCountry} />
    </>
  )

}

export default App;
