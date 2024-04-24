const apiKey = "eb2dbcebc5b6383ac91cd7ef1a3e09ec";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    var data = await response.json();

    console.log(data);

    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "./clouds1.png";
    } else if (data.weather[0].main == "clear") {
        weatherIcon.src = "./clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "./rain.png";
    } // Other conditions follow...

    document.querySelector(".weather").style.display = "block";

    document.querySelector("body").style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
    document.querySelector("body").style.opacity = "0.8";
}

searchBtn.addEventListener("click", () => {
    var city = searchBox.value;
    checkWeather(city);
});
