// openCAge Geocoding API is used here.

let btn = document.querySelector("button");
let data = document.querySelector("p");
let fulladdress = document.querySelector(".fullAddress");
let formatedaddress = document.querySelector(".formatAddress");
let pTime = document.querySelector(".time");

let apiPoint = "https://api.opencagedata.com/geocode/v1/json";
let apiKey = "0b768208cc5c48f08057b037c4c4cb04";

//Api to get user address
const getUserCurrentAddress = async (latitude, longitude) => {
  let query = `${latitude},${longitude}`;
  let apiUrl = `${apiPoint}?key=${apiKey}&q=${query}&pretty=1`;
  try {
    const res = await fetch(apiUrl);
    const rawData = await res.json();
    console.log(rawData);
    const { suburb, state_district, postcode, state, country, continent } =
      rawData.results[0].components;

    fulladdress.textContent = `${suburb}, ${state_district}, ${postcode}, ${state}, ${country}, ${continent}`;
    formatedaddress.textContent = rawData.results[0].formatted;

    pTime.textContent = "Present Time: " + rawData.timestamp.created_http;
  } catch (error) {
    console.log("Error occur", error);
  }
};

btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        data.textContent = `Latitude: ${latitude} ; Longitude: ${longitude}`;

        getUserCurrentAddress(latitude, longitude);
      },
      (error) => {
        data.textContent = error.message;
      }
    );
  }
});
