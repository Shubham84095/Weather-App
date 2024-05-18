const container = document.querySelector(".container");
const search = document.querySelector(".searchBox button");
const weatherBox = document.querySelector(".weatherBox");
const weatherDetails = document.querySelector(".weatherDetails");
const error404 = document.querySelector(".notFoundBox");

function capitalize(str) {
  if (typeof str !== "string" || str.length === 0) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

search.addEventListener("click", () => {
  const API_KEY = "d33ff06b39fa56df9c27c080429b1d3e";

  const city = document.querySelector(".searchBox input").value;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      const image = document.querySelector(".weatherBox img");
      const temp = document.querySelector(".weatherBox .temperature");
      const description = document.querySelector(".weatherBox .description");
      const humidity = document.querySelector(".weatherDetails .humidity span");
      const wind = document.querySelector(".weatherDetails .wind span");

      if (city === "") {
        alert("Please enter a city name");
        return;
      }

      if (data.cod === "404") {
        container.style.height = "400px";
        error404.classList.add("active");
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        return;
      }

      container.style.height = "600px";
      error404.classList.remove("active");
      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");

      // console.log(typeof(city));
      // console.log(data);

      switch (data.weather[0].main) {
        case "Clear":
          image.src = "clear.png";
          break;
        case "Clouds":
          image.src = "cloud.png";
          break;
        case "Rain":
          image.src = "rain.png";
          break;
        case "Snow":
          image.src = "snow.png";
          break;
        case "Mist":
          image.src = "clear.png";
          break;
        case "Haze":
          image.src = "clear.png";
        default:
          image.src = "cloud.png";
      }

      temp.innerHTML = `${Math.round(data.main.temp)}°C`;
      description.innerHTML = capitalize(data.weather[0].description);
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} km/h`;
    });
});
