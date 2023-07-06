import { scroll, loading } from "./dom";
import { fetchingLatLon, fetchingData, fetchLocation } from "./fetchData";
import { celi, fahr, inputRegxp } from "./adjustedData";
import { googleSuggestions } from "./location";
import { locationBrief, todayForecast, hourlyFrecast, daysForecast } from "./sections";

scroll()

//google suggestions 
googleSuggestions()

document.getElementById('search-bar').addEventListener('input', () => {
    if (document.getElementById('error-container')) {
        document.getElementById('error-container').remove()
    }
})


async function spreadingData() {
    console.log(inputRegxp('TokyoJapan'))
    let location = document.getElementById('search-bar');
    loading();
    try {
        let weatherData = location.dataset.lat && location.dataset.lng ? await fetchingLatLon(location.dataset.lat, location.dataset.lng)
            : location.value ? await fetchLocation(location.value) : await fetchingLatLon(30.0444, 31.2357)
        let forecastData = await fetchingData(weatherData.coord.lat, weatherData.coord.lon);


        document.getElementById('loadingPage').remove()

        locationBrief(weatherData);

        todayForecast(forecastData);

        hourlyFrecast(forecastData, forecastData.hourly);

        daysForecast(forecastData);

        //convert temp from Kelvin to Celisus immediately
        document.getElementById('celicius-btn').click();

        //remove data from data keys in location 'lat', 'lon'so when the user search
        //without google suggestions, the data key will be clean 
        if (location.dataset.lat && location.dataset.lng) {
            delete location.dataset.lat
            delete location.dataset.lng
        }
    } catch (error) {
        console.log(error)
        document.getElementById('loadingPage').remove()
        document.getElementById('search-container').appendChild(document.createElement('div')).setAttribute('id', 'error-container');
        document.getElementById('error-container').textContent = 'invalid location, Make sure the place is written correctly; Or use one of the options recommended to you from Google';
    }

}

window.addEventListener('load', () => {
    spreadingData()
})

document.getElementById('search-btn').addEventListener('click', async (e) => {
    let location = document.getElementById('search-bar');
    if (location.checkValidity()) {
        e.preventDefault()
        if (document.getElementById('error-container')) {
            document.getElementById('error-container').remove()
        }
        spreadingData()
    }
})

document.getElementById('celicius-btn').addEventListener('click', (e) => {
    let tempElements = document.getElementsByClassName('temp');
    for (const elemnt of tempElements) {
        elemnt.textContent = `${celi(elemnt.dataset.temp)}°C`
    }
})

document.getElementById('fehrenhite-btn').addEventListener('click', () => {
    let tempElements = document.getElementsByClassName('temp')
    for (const elemnt of tempElements) {
        elemnt.textContent = `${fahr(elemnt.dataset.temp)}°F`
    }
})

