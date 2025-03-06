const apiKey = "c411e402e58793f7ff057e186b35d891"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");



async function checkWeather(city){
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        let data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = Number((data.wind.speed).toFixed(1)) + " km/h";

        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png";
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png";
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        document.querySelector(".city").innerHTML = "Bulunamadı!";
        document.querySelector(".temp").innerHTML = "X";
        document.querySelector(".humidity").innerHTML = "X!";
        document.querySelector(".wind").innerHTML = "X!";

        document.querySelector(".weather").style.display = "block";
    }


}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

