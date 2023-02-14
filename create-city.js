//Initial references

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

function createCity(cityname, countryname, dateArrival, dateDeparture, url) {
  let city = {
    name: cityname,
    country: countryname,
    dateOfArrival: dateArrival,
    dateOfDeparture: dateDeparture,
    imageUrl: url,
  };
  citiesArray.push(city);
  localStorage.setItem("cities", JSON.stringify(citiesArray));
  console.log(citiesArray);

  // location.reload();
}

function uploadJson() {
  const stringifiedCities = JSON.stringify(citiesArray);
  localStorage.setItem("cities", stringifiedCities);
}

function uploadArray() {
  const arrayFromStorage = localStorage.getItem("cities");
  return JSON.parse(arrayFromStorage);
}

// BEGINNING

let citiesArray = [
  {
    name: "New York",
    country: "USA",
    dateOfArrival: "12/05/2005",
    dateOfDeparture: "23/08/2017",
    imageUrl:
      "https://www.travelbook.de/data/uploads/2018/01/gettyimages-613574262_1517219415.jpg",
  },
];

if (localStorage.getItem("cities") !== null) {
  citiesArray = uploadArray();
} else {
  uploadJson();
}

const citiesTable = document.getElementById("citiesTable");
console.log(citiesTable);

for (let i = 0; i < citiesArray.length; i++) {
  citiesTable.appendChild(
    h(
      "tr",
      {},
      h("td", {}, citiesArray[i].name),
      h("td", {}, citiesArray[i].country),
      h("td", {}, citiesArray[i].dateOfArrival),
      h("td", {}, citiesArray[i].dateOfDeparture)
    )
  );
}

document.querySelector("#addCityButton").addEventListener("click", () => {
  const newCity = document.querySelector("#city");
  const newCountry = document.querySelector("#country");
  const newDateArrival = document.querySelector("#date-arrival");
  const newDateDeparture = document.querySelector("#date-departure");
  const newImageUrl = document.querySelector("#imageUrl");

  console.log(newCity.value);
  console.log(newCountry.value);
  console.log(newDateArrival.value);

  console.log(newImageUrl.value);

  createCity(
    newCity.value,
    newCountry.value,
    newDateArrival.value,
    newDateDeparture.value,
    newImageUrl.value
  );

  window.location.replace("addCity.html");
});
