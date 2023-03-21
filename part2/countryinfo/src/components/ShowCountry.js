import ShowWeather from './ShowWeather';

// 2.18 countries infos 
// This component is used to show the details of a country
const ShowCountry = ({ country }) => {

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={country.name.common} width="200" />

      <ShowWeather country={country} />
    </>
  )
}


export default ShowCountry;