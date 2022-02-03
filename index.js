const submit = document.querySelector("input[type=submit]")
const inputElement = document.querySelector("input[name=city]")
const cityElement = document.getElementById("city");
const degreeElement = document.getElementById("degree");
const descriptionElement = document.getElementById("description");
const degreeHighLowElement = document.getElementById("highLow");
const errorMessageElement = document.getElementById("errorMessage");
const form = document.querySelector('form');

const API_KEY = "962e825e6ec5ba6d75b10c5dd226d310";

async function fetchWeather(city) {
    const APICall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    const response = await fetch(APICall);
    if (!response.ok) {
        // console.log(Promise.reject(response));
        return Promise.reject(response);
    } else {
        const weatherData = await response.json();
        return weatherData;
    }

}
submit.addEventListener("click", (event) => {

    event.preventDefault();

    //loadweather given location
    loadWeather(inputElement.value);

    reset();
})

function displayWeather(weather) {
    // console.log("displaying weather");
    cityElement.textContent = weather.name;
    degreeElement.textContent = `${weather.main.temp}°`;;
    descriptionElement.textContent = weather.weather[0].main;
    degreeHighLowElement.textContent = `Low: ${weather.main.temp_min} High: ${weather.main.temp_max}`;
}

function loadWeather(city) {
    //get weather
    fetchWeather(city)
        //display weather
        .then(weatherData => {
            displayWeather(processWeatherData(weatherData));
        })
        .catch(error => {
            console.log(error);
            handleError();
        });

}

function processWeatherData(weatherData) {
    let processedWeatherData = weatherData;

    processedWeatherData.main.temp = Math.round(processedWeatherData.main.temp);
    processedWeatherData.main.temp_min = Math.round(processedWeatherData.main.temp);
    processedWeatherData.main.temp_max = Math.round(processedWeatherData.main.temp_max);


    // console.log(processedWeatherData);

    return processedWeatherData;
}

function reset() {
    form.reset();
    errorMessageElement.textContent = ""
}

function handleError() {
    errorMessageElement.textContent = "Location Not Found"
}

//default
loadWeather("Chicago");
