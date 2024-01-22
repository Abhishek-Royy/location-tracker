let btn = document.querySelector("button");
let data = document.querySelector("p");

btn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        data.textContent = `Latitude: ${latitude} ; Longitude: ${longitude}`;
      },
      (error) => {
        console.log(error.message);
      }
    );
  }
});
