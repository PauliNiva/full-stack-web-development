import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = ({filter, handleFilter}) => {
  return (
    <p>find countries <input value={filter} onChange={handleFilter}/></p>
  )
}

const Countries = ({countries, selectedCountry}) => {
  if (countries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (1 < countries.length && countries.length <= 10) {
     return (
        <CountryList
          countries={countries}
          selectedCountry={selectedCountry} />
      )
  } else if (countries.length === 1) {
      return (
        <Country country={countries[0]} />
      )
  } else {
      return (
        <></>
      )
  }
}

const CountryList = ({countries, selectedCountry}) => {
  return (
    <p>
      {countries.map(country =>
        <SelectCountry
          key={country.name}
          country={country}
          selectedCountry={selectedCountry}
        />)}
    </p>
  )
}

const SelectCountry = ({country, selectedCountry}) => {
  const handleClick = (country) => {
    return () => selectedCountry(country)
  }
  return (
    <p>
      {country.name} <button onClick={handleClick(country)}>show</button>
    </p>
  )
}

const Country = ({country}) => {
  const [weather, setWeather] = useState('')
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then((response) => {
        if (response.data.success) {
          setWeather(response.data)
        }
      })
  })

  return(
    <div>
    <h1>{country.name}</h1>
    <p>
      Capital: {country.capital}<br/>
      Population: {country.population}
    </p>
    <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
    <img src={country.flag} height="100" alt="" />
    <h2>Weather in {country.capital}</h2>
    <Weather weather={weather} />
  </div>
  )
}

const Weather = ({weather}) => {
  if (weather === '') {
    return (
      <p>Weather data not available, check API key and availability</p>
    )
  }

  return (
    <div>
      <p>{`temperature: ${weather.current.temperature} Celcius`}</p>
      <img src={weather.current.weather_icons[0]} />
      <p>{`wind: ${weather.current.wind_speed} mph  direction ${weather.current.wind_dir}`}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const all_countries = 'https://restcountries.eu/rest/v2/all';

  useEffect(() => {
    axios
      .get(all_countries)
      .then(response => {
        setCountries(response.data)
      })
    }, [])

  const handleFilter = (event) => (
    setFilter(event.target.value)
  )

  const countryFilter = (country) => (
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  const selectedCountry = (country) => (
    setFilter(country.name)
  )

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries
        countries={countries.filter(countryFilter)}
        selectedCountry={selectedCountry}/>
    </div>
  );
}

export default App;