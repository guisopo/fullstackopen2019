import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Response from './components/Response';

function App() {
  const [countriesList, setCountriesList] = useState([])
  const [singleCountry, setSingleCountry] = useState('Spain')
  const [weatherData, setWeatherData] = useState()
  const [newQuery, setNewQuery] = useState('')
  const [filteredList, setFilteredList] = useState(countriesList)

  const countryHook = () => { 
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesList(response.data)
      })
  }

  useEffect(countryHook, [])

  const weatherHook = () => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=042abea1ba1d4d0a98f162505190307&q=${singleCountry}`)
      .then(response => {
        setWeatherData(response.data)
      })
  }

  useEffect(weatherHook, [singleCountry])

  const handleQueryChange = (event) => {
    setNewQuery(event.target.value)
    filterData(event.target.value)
  }

  const filterData = (query) => {
    const filteredList = countriesList.filter( 
      (country) => country.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 
    )
    setFilteredList(filteredList)
  }

  const showCountryInfo = (name) => {
    const countryToShow = filteredList.filter( country => country.name === name)
    setFilteredList(countryToShow)
  }

  return (
    <React.Fragment>
      <Filter 
        newQuery = {newQuery} 
        handleQueryChange = {handleQueryChange}/>
      <Response
        setSingleCountry = {setSingleCountry}
        filteredList = {filteredList} 
        weatherData = {weatherData}
        showCountryInfo = {showCountryInfo}
      />
    </React.Fragment>
  )
}

export default App
