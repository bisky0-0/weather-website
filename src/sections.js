import { formatingDate } from "./adjustedData";

export function locationBrief(obj) {
    let input = document.getElementById('search-bar')
    let location = document.getElementById('country-name');
    let description = document.getElementById('current-description');
    let img = document.getElementById('weather-icon');
    let temp = document.getElementById('temp');
    let highTemp = document.getElementById('high-temp');
    let lowTemp = document.getElementById('low-temp');

    location.textContent = input.value ? input.value.split(',')[0] : 'Cairo';
    //make sure the font size won't damage the styling in long letters cities
    if (location.textContent.length > 10) location.style.fontSize = '1.4rem'

    description.textContent = obj.weather[0].description;
    img.src = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`
    temp.dataset.temp = obj.main.temp
    highTemp.dataset.temp = obj.main.temp_max
    lowTemp.dataset.temp = obj.main.temp_min
}


export async function todayForecast(obj) {
    //I named all fields with the same name of properities in the Json object
    //so I can iterate and reduse lines of code typing getElementyId and 
    // textcontent and these things
    let dataFields = document.getElementsByClassName('data');
    for (const field of dataFields) {
        console.log(field.id)
        field.textContent = obj.current[field.id];
    }
    document.getElementById('feels_like').dataset.temp = obj.current['feels_like']
    convertAndSufix(obj)
}

function convertAndSufix(obj) {
    //date
    let sunset = document.getElementById('sunset');
    let sunrise = document.getElementById('sunrise');
    sunset.textContent = formatingDate(sunset.textContent, obj.timezone_offset, "h:m bb")
    sunrise.textContent = formatingDate(sunrise.textContent, obj.timezone_offset, "h:m bb")

    //visiblity
    let visibility = document.getElementById('visibility');
    visibility.textContent = `${Number(visibility.textContent) / 1000}km`

    //humidity
    let humidity = document.getElementById('humidity');
    humidity.textContent += '%'

    //wind
    let wind = document.getElementById('wind_speed');
    wind.textContent += "km/hr";


    //cloudliness 
    let clouds = document.getElementById('clouds');
    clouds.textContent += '%'

    //pressure
    let pressure = document.getElementById('pressure');
    pressure.textContent += 'hpa'
}

export function hourlyFrecast(obj, hoursArray) {
    let container = document.getElementById('hours-container');
    container.textContent = ''
    for (let i = 1; i <= 24; i++) {
        let card = document.createElement('div');
        let hour = document.createElement('div');
        let img = document.createElement('img');
        let temp = document.createElement('div');

        container.appendChild(card).setAttribute('class', 'hour-info')
        card.appendChild(hour).setAttribute('class', 'hour');
        card.appendChild(img);
        card.appendChild(temp).setAttribute('class', 'hour-temp temp');

        hour.textContent = formatingDate(hoursArray[i].dt, obj.timezone_offset, 'h:m bb')
        img.src = `https://openweathermap.org/img/wn/${hoursArray[i].weather[0].icon}@2x.png`
        temp.dataset.temp = hoursArray[0].temp;
    }
}


export function daysForecast(obj) {
    let windowWidth = window.matchMedia('(max-width: 559px)')
    let dayName = document.getElementsByClassName('day-name')
    let dayIcon = document.getElementsByClassName('day-icon')
    let dayTemp = document.getElementsByClassName('day-temp')
    let dayHumidity = document.getElementsByClassName('day-humidity')
    let dayClouds = document.getElementsByClassName('day-clouds');
    console.log(obj.daily.length)
    for (let i = 1; i < obj.daily.length; i++) {
        dayName[i - 1].textContent = !windowWidth ? formatingDate(obj.daily[i].dt, obj.timezone_offset, 'eeee') : formatingDate(obj.daily[i].dt, obj.timezone_offset, 'eee')
        dayIcon[i - 1].src = `https://openweathermap.org/img/wn/${obj.daily[i].weather[0].icon}@2x.png`;
        dayTemp[i - 1].dataset.temp = obj.daily[i].temp.day;
        console.log(obj.daily[i].temp.day)
        dayHumidity[i - 1].textContent = obj.daily[i].humidity + '%';
        dayClouds[i - 1].textContent = obj.daily[i].clouds + '%';
    }
}