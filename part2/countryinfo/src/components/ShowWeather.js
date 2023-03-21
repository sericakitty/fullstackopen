import { useState, useEffect } from 'react';
import axios from 'axios';

// 2.20 This component is used to show the weather of a country
const ShowWeather = ({ country }) => {

  // use state hook to store the weather data
  const [weather, setWeather] = useState([])

  // use openweathermap api to get the weather data
  // initialize the api key using the environment variable
  // REACT_APP_API_KEY=your_secret_api_key npm start
  const apikey = process.env.REACT_APP_API_KEY

  // api url to get the weather data
  // use the country capital as the city name,
  // and use metric units,
  // and use the api key
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apikey}`

  // use effect hook to fetch the weather data
  useEffect(() => {
    axios
      .get(`${apiurl}`)
      .then(response => {
        // when the data is fetched, make a new object with the data
        // and use the setWeather hook to update the weather state
        const weatherObject = {
          temp: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: response.data.weather[0].icon,
        }
        setWeather(weatherObject)
      })
      .catch(error => {
        console.log('Weather data could not be fetched', error)
      })
  }, [apiurl])

  // if the weather state is empty, show loading message
  if (!weather) {
    return (
      <div>loading weather data...</div>
    )
  }

  // if the weather state is not empty, show the weather data
  return (
    <>
      <h3>Weather in {country.capital}</h3>
      <div>temperature {weather.temp} Celsius</div>
      <img src={`http://openweathermap.org/img/w/${weather.icon}.png`} alt="weather icon" />
      <div>wind {weather.wind} m/s</div>
    </>
  )
}

export default ShowWeather;