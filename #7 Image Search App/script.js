const searchInput =
  document.getElementById("searchInput");

const searchBtn =
  document.getElementById("searchBtn");

const imageGallery =
  document.getElementById("imageGallery");

const loadMoreBtn =
  document.getElementById("loadMoreBtn");

const loading =
  document.getElementById("loading");

const ACCESS_KEY =
  "jtR8itKcM_IQPDLGIR4TVVMu5nyrDfxMsI9lXVl1mWU";

let keyword = "";

let page = 1;

searchBtn.addEventListener(
  "click",
  searchImages
);

loadMoreBtn.addEventListener(
  "click",
  loadMoreImages
);

async function searchImages() {

  keyword = searchInput.value;

  if (keyword === "") {
    loading.innerText =
      "Please enter search keyword";
    return;
  }

  page = 1;

  imageGallery.innerHTML = "";

  fetchImages();
}

async function fetchImages() {

  loading.innerText = "Loading images...";

  try {

    const url =
      `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${ACCESS_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    if (data.results.length === 0) {

      loading.innerText =
        "No images found";

      loadMoreBtn.style.display =
        "none";

      return;
    }

    displayImages(data.results);

    loading.innerText = "";

    loadMoreBtn.style.display =
      "block";

  } catch (error) {

    loading.innerText =
      "Something went wrong";
  }
}

function displayImages(images) {

  images.forEach(image => {

    const imageCard =
      document.createElement("div");

    imageCard.classList.add("image-card");

    imageCard.innerHTML = `
      <img src="${image.urls.small}">
    `;

    imageGallery.appendChild(imageCard);
  });
}

function loadMoreImages() {

  page++;

  fetchImages();
}