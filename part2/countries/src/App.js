import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter';
import Response from './components/Response';

function App({apiKey}) {
  const [countriesList, setCountriesList] = useState([])
  const [newQuery, setNewQuery] = useState('')
  const [filteredList, setFilteredList] = useState(countriesList)
  const [singleCountry, setSingleCountry] = useState()
  const [weatherData, setWeatherData] = useState()

  const countryListHook = () => { 
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountriesList(response.data)
      })
  }

  useEffect(countryListHook, [])
  
  const weatherHook = () => {
    if (singleCountry) {
      axios
        .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${singleCountry.capital}`)
        .then(response => {
          setWeatherData(response.data)
      })
    }
    return
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

    filteredList.length === 1 
      ? setSingleCountry(filteredList[0]) 
      : setSingleCountry('')

    setFilteredList(filteredList)
  }

  const showCountryInfo = (countryObject) => {
    setSingleCountry(countryObject)
  }

  return (
    <React.Fragment>
      <Filter 
        newQuery = {newQuery} 
        handleQueryChange = {handleQueryChange}/>
      <Response
        filteredList = {filteredList} 
        singleCountry = {singleCountry}
        showCountryInfo = {showCountryInfo}
        weatherData = {weatherData}
      />
    </React.Fragment>
  )
}

export default App
