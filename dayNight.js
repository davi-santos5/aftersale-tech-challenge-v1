//selecting DOM element
const skyDiv = document.querySelector(".sky");

//functions to control the element background
const turnSkyNight = () => skyDiv.classList.add("sky-night");
const turnSkyDay = () =>
  skyDiv.classList.contains("sky-night") &&
  skyDiv.classList.remove("sky-night");

//api path and header
const path = "https://api.sunrise-sunset.org/json?";

const headers = {
  method: "get",
  mode: "cors",
  cache: "default",
};

//getting time now in UTC in minutes
const date = new Date();
const hours = date.getUTCHours();
const minutes = date.getUTCMinutes();
const timeNowInMinutes = hours * 60 + minutes;

//function to convert api time response in minutes
const getTimeInMinutes = (time) => {
  if (!time) return null;

  let hours = Number(time.match(/^(\d+)/)[1]);
  let minutes = Number(time.match(/:(\d+)/)[1]);
  let AMPM = time.match(/\s(.*)$/);

  if (AMPM) {
    if (AMPM[1] == "PM" && hours < 12) hours = hours + 12;
    if (AMPM[1] == "AM" && hours == 12) hours = hours - 12;
  }

  minutes += hours * 60;
  return minutes;
};

//getting location, making api request and checking if is day or night
navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  fetch(`${path}lat=${lat}&lng=${lng}`)
    .then((response) => response.json())
    .then((data) => {
      const sunrise = data.results.sunrise;
      const sunset = data.results.sunset;
      return { sunrise, sunset };
    })
    .then(({ sunrise, sunset }) => {
      const sunriseInMinutes = getTimeInMinutes(sunrise);
      const sunsetInMinutes = getTimeInMinutes(sunset);
      return { sunriseInMinutes, sunsetInMinutes };
    })
    .then(({ sunriseInMinutes, sunsetInMinutes }) => {
      sunriseInMinutes < timeNowInMinutes && timeNowInMinutes < sunsetInMinutes
        ? turnSkyDay()
        : turnSkyNight();
    });
});
