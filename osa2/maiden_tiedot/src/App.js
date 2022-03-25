import { useState, useEffect } from 'react'
import axios from 'axios'

const OneCountry = (props) => {
  const languages = Object.values(props.country.languages)
  const api_key = process.env.REACT_APP_API_KEY
  const lat = props.country.capitalInfo.latlng[0]
  const lon = props.country.capitalInfo.latlng[1]
  const [weather, setWeather] = useState()

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      {weather &&
      <>
      <h1>{props.country.name.common}</h1>
      <p>
        capital {props.country.capital[0]}<br/>
        area {props.country.area}
      </p>
      <p>
        <b>languages: </b>
      </p>
      <ul>
        {languages.map(lang => 
          <li key={lang}>{lang}</li>
        )}
      </ul>
      <img src={props.country.flags.png} width="170"/>

      <h2>Weather in {props.country.capital[0]}</h2>
      <p>temperature {(weather.main.temp - 276.47).toFixed(2)} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
      <p>wind {weather.wind.speed} m/s</p>
      </>}
    </div>
  )
}

const Country = (props) => {

  return (
    <>{props.country.name.common} <button onClick={() => props.onClick([props.country])}>show</button><br /></>
  )
}

const Countries = (props) => {
  return (
  <div>
    {props.c.map(country => 
      <Country key={country.name.common} country={country} onClick={props.onClick}/>
    )}
  </div>
  )
}

const Result = (props) => {
  if(props.countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(props.countries.length === 1) {
    return (
      <div>
        <OneCountry key={props.countries[0].name.common} country={props.countries[0]}/>
      </div>
    )
  } else {
    return (
      <div><Countries c={props.countries} onClick={props.onClick}/></div>
    )
  }
}

const Filter = (props) => {
  return (
    <div>
      find countries <input 
        value={props.newFilter}
        onChange={props.onChange}
      />
    </div>
  )
}

function App() {

  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().match(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <Filter newFilter={newFilter} onChange={handleFilterChange}/>
      <Result countries={filteredCountries} onClick={setFilteredCountries}/>
    </div>
  );
}

export default App;
