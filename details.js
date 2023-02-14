function h(tagName, attributes = {}, ...children) {
  // create the tag
  const tag = document.createElement(tagName);
  // assign attributes if given
  Object.keys(attributes).forEach((k) => {
    tag.setAttribute(k, attributes[k]);
  });
  // the rest of the parameters are "children". These
  // can be either further tags (created by more h()'s')
  // or just text which is added as text nodes
  children.forEach((child) => {
    if (typeof child === "string") {
      tag.appendChild(document.createTextNode(child));
    } else {
      tag.appendChild(child);
    }
  });
  return tag;
}

function getCityWeather(city) {
  return fetch(
    // `http://api.openweathermap.org/geo/1.0/direct?q=new+orleans&limit=1&appid=${MY_API_KEY}`
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${MY_API_KEY}`
  )
    .then((response) => {
      return response.json();
    })
    .then((cityGeoLoc) => {
      console.log(
        "getCityWeather() Function called! longitude and latitude values are:"
      );
      console.log(cityGeoLoc[0].lon);
      console.log(cityGeoLoc[0].lat);
      return fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoLoc[0].lat}&lon=${cityGeoLoc[0].lon}&appid=${MY_API_KEY}&units=metric`
      ).then((response) => {
        return response.json();
      });
    });
}

function displayWeather(w, i, t) {
  console.log("displayWeather function called!");
  console.log(`w: ${w} i: ${i} t: ${t}`);
}

function getWeatherIcon(i) {
  var iconurl = `http://openweathermap.org/img/wn/${i}@2x.png`;
  fetch(iconurl)
    .then((response) => {
      console.log("FETCH FOR ICON CALLED!");
      icon = response;
    })
    .then((icon) => {
      // $("#wicon").attr("src", iconurl);
      return icon;
    });
}

function showDetail(city, array, weather, icon, temp, lon, lat) {
  const searchIndex = array.findIndex((ciudad) => ciudad.name === city);
  const name = array[searchIndex].name;
  const country = array[searchIndex].country;
  const dateOfArrival = array[searchIndex].dateOfArrival;
  const dateOfDeparture = array[searchIndex].dateOfDeparture;
  const image = array[searchIndex].imageUrl;
  console.log("ShowDetail() Function called!!! ");
  const icono = getWeatherIcon(icon);
  // window.location.replace("index.html");

  const cardsDetail = document.getElementById("city-detail-parent");
  cardsDetail.innerHTML = "";
  console.log(cardsDetail);

  cardsDetail.appendChild(
    h(
      "div",
      {
        id: "city-detail-child",
      },
      h(
        "div",
        { id: "detail-photo" },
        h("img", { src: image, alt: `Photo of ${name}` }),
        h(
          "div",
          { id: "image-weather" },
          `Weather: ${weather}  `,
          h("i", { class: "fa-solid fa-temperature-three-quarters" }),
          `  ${temp} C `
        )
      ),
      // City Info Content
      h(
        "div",
        { id: "city-detail-content" },
        h("div", { class: "my-card-header" }, name),
        h("div", { class: "my-card-subtitle" }, country),
        h(
          "div",
          { id: "my-travel-dates" },
          h(
            "i",
            { class: "fa-regular fa-calendar fa-sm" },
            `  ${dateOfArrival}  -  ${dateOfDeparture}`
          )
        ),
        h(
          "div",
          { class: "my-card-body" },
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hicconsequuntur harum ea cumque provident porro, autem nihilearum! Lorem ipsum dolor sit amet consectetur, adipisicingelit.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hicconsequuntur harum ea cumque provident porro, autem nihilearum! Lorem ipsum dolor sit amet consectetur, adipisicingelit. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hicconsequuntur harum ea cumque provident porro, autem nihilearum! Lorem ipsum dolor sit amet consectetur, adipisicingelit."
        )
      )
      // h(
      //   "div",
      //   { class: "city-map", id: "map" }
      //   // h("img", { src: "/project-v2/img/NY map.png", alt: `Map of ${name}` })
      // )
    )
  );
}
function uploadArray() {
  const arrayFromStorage = localStorage.getItem("cities");
  return JSON.parse(arrayFromStorage);
}

function uploadJson() {
  const stringifiedCities = JSON.stringify(arregloCiudades);
  localStorage.setItem("cities", stringifiedCities);
}

let arregloCiudades = [
  {
    name: "New York",
    country: "USA",
    dateOfArrival: "12/05/2005",
    dateOfDeparture: "23/08/2017",
    imageUrl:
      "https://www.travelbook.de/data/uploads/2018/01/gettyimages-613574262_1517219415.jpg",
  },
];
const MY_API_KEY = "3a42576b87aa5574c7be70803ff1f679";

if (localStorage.getItem("cities") !== null) {
  arregloCiudades = uploadArray();
} else {
  uploadJson();
}

getCityWeather("New York").then((cityWeather) => {
  let weather = cityWeather.weather[0].main;
  let icon = cityWeather.weather[0].icon;
  let temp = cityWeather.main.temp;
  let lon = cityWeather.coord.lon;
  let lat = cityWeather.coord.lat;
  displayWeather(weather, icon, temp, lon, lat);
  showDetail("New York", arregloCiudades, weather, icon, temp);
});

document.querySelectorAll("div.my-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    console.log("CLICK!!!");

    let cityName = String(event.currentTarget.dataset.cityName);

    getCityWeather(cityName).then((cityWeather) => {
      weather = cityWeather.weather[0].main;
      icon = cityWeather.weather[0].icon;
      temp = cityWeather.main.temp;
      lon = cityWeather.coord.lon;
      lat = cityWeather.coord.lat;

      displayWeather(weather, icon, temp, lon, lat);
      console.log(
        `Data attribute for the clicked card (cityName): ${cityName}`
      );
      showDetail(cityName, arregloCiudades, weather, icon, temp);
    });
  });
});
