const API_KEY = `ed9746ae7fa8eca657ecc0bc286c50f0`

const form = document.querySelector("form")

const search = document.querySelector("#search")

const weather = document.querySelector("#weather")

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h2> City Not Found <h2>`
        return;
    }

    weather.innerHTML = `
        <div class="TempBox2">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            <h3> ${data.weather[0].main} </h3>
        </div>
        <div class="TempBox">
            <h1>${data.main.temp} ℃</h1>
        </div>
    `
}

form.addEventListener(
    "submit",
    function (event) {
        getWeather(search.value)
        event.preventDefault();
    }
)