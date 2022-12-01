const link = document.querySelector('.invisible-link')

window.onscroll = function (e) {
  //invisibleLink
  link.classList.add("visible");
  if(window.scrollY==0) {
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

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
