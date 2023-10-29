const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')


async function getCurrentWeather(city, apiKey = "6eb0147731f004ad68262afb3ba2d28e") {
    // fetching weather
    async function getWeather(location, apiKey = "6eb0147731f004ad68262afb3ba2d28e") {
        let { lat, lon } = location;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        if (response.ok) {
            let data = await response.json();
            console.log("weather info fetched")
            // updating page data
            document.querySelector(".weather").style.display = 'block';

            document.querySelector(".city").innerHTML = name;
            document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)} °C`;
            document.querySelector(".wind p").innerHTML = `${Math.round(data.wind.speed)} K/h`;
            document.querySelector(".humidity p").innerHTML = `${data.main.humidity} %`
            document.querySelector("weather-icon").src = `images/${data.weather[0].main}.png`;


        } else {
            console.log("HTTP error: " + response.status);

        }
    }

    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${apiKey}`);
    if (response.ok) {
        console.log("Location data fetched")
    } else {
        console.log("HTTP error: " + response.status);
        return;
    }
    let data = await response.json();
    const { name, lat, lon } = data[0]

    getWeather({ name, lat, lon })
}

searchBtn.addEventListener("click", () => {
    getCurrentWeather(searchBox.value);
})

