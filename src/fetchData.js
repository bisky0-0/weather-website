import { inputRegxp } from "./adjustedData";

export async function fetchLocation(input) {
    let adjustedInput = inputRegxp(input)
    console.log(adjustedInput)
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${adjustedInput}&appid=e63fb2b29bb27929a9b9ea7a81dbe699`)
    let jsonData = await data.json();
    console.log(jsonData)
    return jsonData;
}

export async function fetchingLatLon(lat, lon) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e63fb2b29bb27929a9b9ea7a81dbe699`)
    let jsonData = await data.json();
    console.log(jsonData)
    return jsonData;
}

export async function fetchingData(lat, lon) {
    let data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=20f7632ffc2c022654e4093c6947b4f4`);
    let jsonData = await data.json();
    return jsonData;
}

