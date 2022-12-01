//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const response = await fetch("./data/photographers.json");
  const datas = await response.json();
  // et bien retourner le tableau photographers seulement une fois
  return datas;
}
const queryString = window.location.search;
const comparedId = queryString.slice(1, 4);

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_page");
  const photographersPhoto = document.querySelector(".photographer_photo");
  photographers.forEach((photographer) => {
    if (photographer.id == comparedId) {
      const photographerModel = photographerPageFactory(photographer);
      const photographerPhotoModel = photographerPhotoFactory(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      const userCardPhoto = photographerPhotoModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
      photographersPhoto.appendChild(userCardPhoto);
    }
  });
}
const selector = document.querySelector(".custom-selector");

selector.addEventListener("mousedown", (e) => {
  e.preventDefault();
  const select = selector.children[0];
  const dropDown = document.createElement("ul");
  dropDown.className = "selector-options";
  [...select.children].forEach((option) => {
    const dropDownOption = document.createElement("li");
    dropDownOption.textContent = option.textContent;
    dropDownOption.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      select.value = option.value;
      selector.value = option.value;
      select.dispatchEvent(new Event("change"));
      selector.dispatchEvent(new Event("change"));
      dropDown.remove();
    });
    dropDown.appendChild(dropDownOption);
  });

  selector.appendChild(dropDown);
});

selector.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    console.log("yo");
    e.preventDefault();
    const select = selector.children[0];
    const dropDown = document.createElement("ul");
    elementOpt = document.getElementsByTagName("option");
    dropDown.className = "selector-options";
    [...select.children].forEach((option) => {
      const dropDownOption = document.createElement("li");
      dropDownOption.textContent = option.textContent;
      console.log(option);
     
      option.addEventListener("change", (e) => {
        console.log("OK")
        e.stopPropagation();
        select.value = option.value;
        selector.value = option.value;
        select.dispatchEvent(new Event("change"));
        selector.dispatchEvent(new Event("change"));
        dropDown.remove();
      });
      dropDown.appendChild(dropDownOption);
    });

    selector.appendChild(dropDown);
  }
});

const filters = document.getElementById("sort");
async function displayGallery(photographers) {
  const { media } = await getPhotographers();
  const photographersGallery = document.querySelector(".photographer_photos");
  const showGallery = (items) => {
    items.map((media) => {
      if (media.photographerId == comparedId) {
        const photographerModel = photographerGalleryFactory(media);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersGallery.appendChild(userCardDOM);
      }
    });
    Lightbox.init(media);
  };
  showGallery(photographers);

  filters.addEventListener("change", function () {
    if (filters.value == "--") {
      photographersGallery.innerHTML = "";
      showGallery(photographers);
    }
    if (filters.value == "Popularite") {
      const objectComparisonCallback = (a, b) => {
        if (a.likes < b.likes) {
          return -1;
        }
        if (a.likes > b.likes) {
          return 1;
        }
        return 0;
      };
      photographersGallery.innerHTML = "";

      let sortedByLikes = photographers
        .sort(objectComparisonCallback)
        .reverse();
      showGallery(sortedByLikes);
    }
    if (filters.value == "Titre") {
      let sortByTitle = photographers.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      photographersGallery.innerHTML = "";
      showGallery(sortByTitle);
    }
    if (filters.value == "Date") {
      const sortedByDate = photographers.sort(function (a, b) {
        var dateA = new Date(a.date),
          dateB = new Date(b.date);
        return dateA - dateB;
      });
      photographersGallery.innerHTML = "";
      showGallery(sortedByDate);
    }
  });
}

//lightbox
class Lightbox {
  static init(data) {
    if (data) {
      const links = Array.from(
        document.querySelectorAll(
          'a[href$=".jpg"], a[href$=".jpeg"], a[href$=".png"]'
        )
      );
      const gallery = links.map((link) => link.getAttribute("href"));
      links.forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault();
          new Lightbox(e.currentTarget.getAttribute("href"), gallery);
        })
      );
    }
  }

  constructor(url, images) {
    const block = document.getElementById("main");
    this.images = images;
    this.element = this.buildDom(url);
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    block.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }
  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox_container");
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.innerHTML = "";
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
    if (e.key === "ArrowLeft") {
      this.prev(e);
    }
    if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  close(e) {
    e.preventDefault();
    this.element.classList.add("fadeout");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }
  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }
  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((image) => image === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }
  buildDom(url) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox_close">Fermer</button>
    <button class="lightbox_prev">Previous</button>
    <button class="lightbox_next">Next</button>
    <div class="lightbox_container">
    
    </div>`;
    dom
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

//lightbox end

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { media } = await getPhotographers();
  displayData(photographers);
  displayGallery(media);
  Lightbox.init(media);
}

init();
