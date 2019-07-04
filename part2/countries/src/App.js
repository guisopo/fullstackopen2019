import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Response from './components/Response';

function App({apiKey}) {
  const [countriesList, setCountriesList] = useState([])
  const [weatherData, setWeatherData] = useState()
  const [newQuery, setNewQuery] = useState('')
  const [filteredList, setFilteredList] = useState(countriesList)

  const countryListHook = () => { 
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesList(response.data)
      })
  }

  useEffect(countryListHook, [])
  
  const weatherHook = () => {
    const country = filteredList.length === 1 ? filteredList[0].name : ''
    if (country) {
      axios
        .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${country}`)
        .then(response => {
          setWeatherData(response.data)
      })
    }
    return
  }
  
  useEffect( weatherHook, [filteredList])

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
        filteredList = {filteredList} 
        showCountryInfo = {showCountryInfo}
        weatherData = {weatherData}
      />
    </React.Fragment>
  )
}

export default App
