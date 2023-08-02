require('dotenv').config({ path: 'config/.env' })
const axios = require('axios')
const countriesList = require('countries-list').countries

exports.forecast = async(req, res) => {
  try {
    const location = req.body.location
    const {lat, lon} = await coordinates(location)
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${process.env.OPEN_WEATHER_API}&lang=pt&units=metric`
    const response = await axios.get(URL)
    
    const current_weather = {
      temperature: response.data.current.temp,
      pressure: response.data.current.pressure,
      humidity: response.data.current.humidity,
      wind_speed: response.data.current.wind_speed,
      description: response.data.current.weather[0].description,
      icon: response.data.current.weather[0].icon,
    }
    const daily_data = {
      min_temp: response.data.daily[0].temp.min,
      max_temp: response.data.daily[0].temp.max,
      daily_description: response.data.daily[0].weather[0].description,
      daily_icon: response.data.daily[0].weather[0].icon
    }
    
    res.send([current_weather, daily_data])
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.exchange = async(req, res) => {
  try {
    const location = req.body.location
    const {country_code} = await coordinates(location)
    const currency_code = countriesList[country_code.toString().toUpperCase()]["currency"]
    const URL = `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.RATE_API}&symbols=${currency_code}`

    const response = await axios.get(URL)
    res.send({
      base: response.data.base,
      rates: response.data.rates
    })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}

exports.population = async(req, res) => {
  try {
    const location = req.body.location
    const {country_code} = await coordinates(location)

    // SP.POP.TOTL -> Population
    // NY.GDP.PCAP.CD -> GDP
    const population_url = `https://api.worldbank.org/v2/country/${country_code}/indicator/SP.POP.TOTL?format=json`
    const gdp_url = `https://api.worldbank.org/v2/country/${country_code}/indicator/NY.GDP.PCAP.CD?format=json`
    
    let response = await axios.get(population_url)
    const  population = response.data[1][0]["value"]
    
    response = await axios.get(gdp_url)
    const gdp = response.data[1][0]["value"]

    res.send({
      population,
      gdp
    })
  } catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
}


// Helper function to get coordinates of a given location
const coordinates = async(location) => {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MAP_BOX_API}` 

  let country_code = ''
  try {
    const response = await axios.get(URL)
    if(response.data.features.length === 0 ) {
      res.status(400).send("Invalid location")
    }

    const lat = response.data.features[0].center[1]
    const lon = response.data.features[0].center[0]
    const location = response.data.features[0].place_name

    if (response.data.features[0].place_type[0] === 'country') {
      country_code = response.data.features[0].properties['short_code']
    } 
    else {
      country_code = response.data.features[0].context[0].short_code
    }

    return {
      lat,
      lon,
      location,
      country_code
    }
  } catch (e) {
    console.log(e)
    throw new Error("Location Services Unavailable")
  } 
}