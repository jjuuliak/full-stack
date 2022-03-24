import { useState, useEffect } from 'react'
import axios from 'axios'

const OneCountry = (props) => {
  const languages = Object.values(props.country.languages)

  return (
    <div>
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
    </div>
  )
}

const Country = (props) => {
  return (
    <>{props.country}<br /></>
  )
}

const Countries = (props) => {
  return (
  <div>
    {props.c.map(country => 
      <Country key={country.name.official} country={country.name.common}/>
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
        <OneCountry key={props.countries[0].name.official} country={props.countries[0]}/>
      </div>
    )
  } else {
    return (
      <div><Countries c={props.countries}/></div>
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
    setFilteredCountries(countries.filter(country => country.name.official.toLowerCase().match(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <Filter newFilter={newFilter} onChange={handleFilterChange}/>
      <Result countries={filteredCountries}/>
    </div>
  );
}

export default App;
