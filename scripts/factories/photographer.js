function photographerFactory(data) {
  const {
    name,
    portrait,
    id,
    tagline,
    tabindex,
    tabindexDesc,
    accesskey,
    tags,
    city,
    price,
  } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const imgDiv = document.createElement("div");
    const descDiv = document.createElement("div");
    const locationn = document.createElement("h5");
    locationn.textContent = city;
    const link = document.createElement("a");
    link.setAttribute("tabindex", tabindex);
    link.setAttribute("aria-label", name);
    descDiv.setAttribute("tabindex", tabindexDesc);
    const desc = document.createElement("p");
    desc.textContent = tagline;
    const priceCont = document.createElement("p");
    priceCont.textContent = `${price}€/jour`;

    const tagscontainer = document.createElement("div");
    tagscontainer.setAttribute("class", "tagscontainer");
    tagscontainer.setAttribute("aria-label", "Tag");

    const tagJelly = document.createElement("div");
    tagJelly.setAttribute("class", "jelly");

    tags.forEach(function (tagElement) {
      clone = tagJelly.cloneNode();
      clone.textContent = tagElement;
      clone.setAttribute("aria-label", clone.textContent);
      tagscontainer.appendChild(clone);
    });

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    link.setAttribute("href", `photographer.html?${id}`);
    imgDiv.setAttribute("class", "imgContainer");
    descDiv.setAttribute("class", "descContainer");
    priceCont.setAttribute("class", "price");
    article.setAttribute("id", id);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    descDiv.appendChild(locationn);
    descDiv.appendChild(desc);
    descDiv.appendChild(priceCont);
    descDiv.appendChild(tagscontainer);
    imgDiv.appendChild(img);
    link.appendChild(imgDiv);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(descDiv);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

function photographerPageFactory(data) {
  const { name, portrait, id, tagline, city, tags } = data;
  const formTitle = document.querySelector(".phName")
  const modal = document.querySelector(".modal")
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const descDiv = document.createElement("div");
    const locationn = document.createElement("h5");

    locationn.textContent = city;
    const link = document.createElement("a");
    const desc = document.createElement("p");

    desc.textContent = tagline;

    const tagscontainer = document.createElement("div");
    article.setAttribute("tabindex", "2");
    tagscontainer.setAttribute("class", "tagscontainer");
    tagscontainer.setAttribute("aria-role", "Tag");
    modal.setAttribute("aria-label", `Contact me ${name}`);
    modal.setAttribute("aria-labelledby", "2");
    

    const tagJelly = document.createElement("div");
    tagJelly.setAttribute("class", "jelly");

    tags.forEach(function (tagElement) {
      clone = tagJelly.cloneNode();
      clone.textContent = tagElement;
      clone.setAttribute("aria-label", clone.textContent);
      tagscontainer.appendChild(clone);
    });
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    link.setAttribute("href", `photographer.html?${id}`);
    descDiv.setAttribute("class", "descContainer");
    locationn.setAttribute("class", "city");
    article.setAttribute("id", id);
    const h2 = document.createElement("h2");
    formTitle.textContent = name;
    h2.textContent = name;
    descDiv.appendChild(locationn);
    descDiv.appendChild(desc);
    descDiv.appendChild(tagscontainer);
    link.appendChild(h2);
    article.appendChild(link);
    article.appendChild(descDiv);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

function photographerPhotoFactory(data) {
  const { name, portrait, id, tagline, city, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const imgDiv = document.createElement("div");

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    imgDiv.setAttribute("class", "imgContainer");
    article.setAttribute("id", id);
    img.setAttribute("aria-label", `Photo de ${name}`);
    img.setAttribute("alt", name);

    imgDiv.appendChild(img);
    article.appendChild(imgDiv);
    return article;
  }
  return { name, picture, getUserCardDOM };
}

function photographerGalleryFactory(data) {
  const { image, likes, id, photographerId, title } = data;
  const picture = `assets/${photographerId}/${image}`;

  function getUserCardDOM() {
    const imgElement = document.createElement("div");
    const imgDiv = document.createElement("div");

    const link = document.createElement("a");
    link.setAttribute("href", picture);
    link.setAttribute("aria-label", `${title}, closeup view`);

    const img = document.createElement("img");
    const desc = document.createElement("p");
    const likesContainer = document.createElement("div");
    const likesText = document.createElement("span");
    const likesIcon = document.createElement("i");
    desc.textContent = title;
    likesText.textContent = likes;
    img.setAttribute("src", picture);
    imgElement.setAttribute("id", id);
    imgElement.setAttribute("class", "imgGallery");
    likesIcon.setAttribute("class", "fa-sharp fa-solid fa-heart");
    imgDiv.setAttribute("class", "imgDivGallery");

    desc.setAttribute("class", "descGallery");
    likesContainer.setAttribute("class", "likesGallery");
    likesContainer.setAttribute("aria-label", "likes");

    likesContainer.appendChild(likesText);
    likesContainer.appendChild(likesIcon);
    link.appendChild(img);
    imgDiv.appendChild(link);
    imgElement.appendChild(imgDiv);
    imgElement.appendChild(desc);
    imgElement.appendChild(likesContainer);
    return imgElement;
  }
  return { image, likes, id, photographerId, title, picture, getUserCardDOM };
}
