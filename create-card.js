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

function uploadJson() {
  const stringifiedCities = JSON.stringify(citiesArray);
  localStorage.setItem("cities", stringifiedCities);
}

function uploadArray() {
  const arrayFromStorage = localStorage.getItem("cities");
  return JSON.parse(arrayFromStorage);
}

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

const cardsColumn = document.getElementById("my-cards-column");

for (let i = 0; i < citiesArray.length; i++) {
  cardsColumn.appendChild(
    h(
      "div",
      {
        class: "my-card card-shadow",
        "data-city-name": citiesArray[i].name,
      },
      h(
        "div",
        { class: "my-card-image" },
        h("img", {
          src: citiesArray[i].imageUrl,
          alt: `City photo: ${citiesArray[i].name}`,
        })
      ),
      h(
        "div",
        { class: "my-card-right" },
        h("div", { class: "my-card-header" }, citiesArray[i].name),
        h("div", { class: "my-card-subtitle" }, citiesArray[i].country),
        h(
          "div",
          { class: "my-card-body" },
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic consequuntur harum ea cumque provident porro, autem nihil ..."
        ),
        h(
          "div",
          { class: "my-card-footer" },
          h("i", { class: "fa-regular fa-calendar" }),
          ` ${citiesArray[i].dateOfArrival}`
        )
      )
    )
  );
}
