const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const form = document.getElementById("locationinput");
const search = document.querySelector(".search");
const windOutput = document.querySelector(".wind");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "London";

// Adding click event for each city
cities.forEach((city) => {
  city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    // Funtion that fetches all data from the weather Api
    fetchWeatherData();
  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length == 0) {
    alert("enter city name");
  } else {
    // change from default city to the one written
    cityInput = search.value;
    // function that fetch weather api
    fetchWeatherData();
    // remover all values from the input filed
    search.value = "";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekday[new Date(`${day}/ ${month}/${year}`).getDay()];
}

// const fetchWeatherData = () => {
//   fetch(
//     `https://api.weatherapi.com/v1/current.json?key=7cdf7a5bfd6e46c5a18211924241601=${cityInput}`
//   );
//   then((response) => response.json()).then((data) => {
//     console.log(data);
//   });
// };

const fetchWeatherData = () => {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=7cdf7a5bfd6e46c5a18211924241601&q=${cityInput}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      //   Adding the temperature and weather
      temp.innerHTML = data.current.temp_c + "&#176;";
      conditionOutput.innerHTML = data.current.condition.text;

      //   Get exact date and time
      const date = data.location.localtime;
      const y = parseInt(date.substr(0, 4));
      const m = parseInt(date.substr(5, 2));
      const d = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      //   reformat the date display
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      dateOutput.innerHTML = ` ${d} ${monthNames[m - 1]} ${y}`;

      timeOutput.innerHTML = time;
      //   Name of city
      nameOutput.innerHTML = data.location.name;
      //   The corrensponding icon
      const iconUrl = data.current.condition.icon;

      // Set the icon source directly from the API response
      icon.src = `https:${iconUrl}`;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code;
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      if (code === 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "181e27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/partlycloudy.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "181e27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#e5ba92";
        if (timeOfDay == "night") {
          btn.style.background = "181e27";
        }
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      }
    })
    .catch((error) => {
      alert("city not found please try again");
      console.error("Error fetching weather data:", error);
    });
};

fetchWeatherData();
