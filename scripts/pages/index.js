const link = document.querySelector(".invisible-link");

window.onscroll = function (e) {
  //invisibleLink
  link.classList.add("visible");
  if (window.scrollY == 0) {
    link.classList.remove("visible");
  }
};

async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const response = await fetch("./data/photographers.json");
  const datas = await response.json();
  // et bien retourner le tableau photographers seulement une fois
  return datas;
}
const photographersSection = document.querySelector(".photographer_section");

async function displayData(photographers) {
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

const tagsElements = document.querySelectorAll(".jelly");
const allPeople = document.querySelector(".allPhotographers");
async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  allPeople.addEventListener("click", (event) => {
    photographersSection.innerHTML = "";
    displayData(photographers);
  });
  const filtered = tagsElements.forEach((item) => {
    item.addEventListener("click", (event) => {
      const filteredPhotographers = photographers.filter(function (
        currentElement
      ) {
        return currentElement.tags.includes(item.ariaLabel.toLowerCase());
      });
      photographersSection.innerHTML = "";
      displayData(filteredPhotographers);
    });
  });
  displayData(photographers);
}

init();
