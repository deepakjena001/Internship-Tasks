const quoteEl = document.getElementById("quote");

const authorEl = document.getElementById("author");

const generateBtn = document.getElementById("generateBtn");

const copyBtn = document.getElementById("copyBtn");

const saveBtn = document.getElementById("saveBtn");

const favoriteList = document.getElementById("favoriteList");

const message = document.getElementById("message");

let currentQuote = {};

generateBtn.addEventListener("click", getQuote);

copyBtn.addEventListener("click", copyQuote);

saveBtn.addEventListener("click", saveFavorite);

async function getQuote() {

  quoteEl.innerText = "Loading quote...";
  authorEl.innerText = "";

  try {

    const response = await fetch(
      "https://dummyjson.com/quotes/random"
    );

    const data = await response.json();

    currentQuote = {
      text: data.quote,
      author: data.author
    };

    quoteEl.innerText = currentQuote.text;

    authorEl.innerText =
      "- " + currentQuote.author;

  } catch (error) {

    quoteEl.innerText =
      "Failed to fetch quote";

    authorEl.innerText = "";

    showMessage("Something went wrong");
  }
}

function copyQuote() {

  if (!currentQuote.text) {
    showMessage("Generate quote first");
    return;
  }

  let textToCopy =
    currentQuote.text +
    " - " +
    currentQuote.author;

  navigator.clipboard.writeText(textToCopy);

  showMessage("Quote copied");
}

function saveFavorite() {

  if (!currentQuote.text) {
    showMessage("Generate quote first");
    return;
  }

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  let exists = favorites.some(item =>
    item.text === currentQuote.text
  );

  if (exists) {
    showMessage("Quote already saved");
    return;
  }

  favorites.push(currentQuote);

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );

  displayFavorites();

  showMessage("Quote saved");
}

function displayFavorites() {

  let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

  favoriteList.innerHTML = "";

  favorites.forEach(item => {

    let div = document.createElement("div");

    div.classList.add("favorite-item");

    div.innerHTML = `
      <p>"${item.text}"</p>
      <h4>- ${item.author}</h4>
    `;

    favoriteList.appendChild(div);
  });
}

function showMessage(text) {

  message.innerText = text;

  setTimeout(() => {
    message.innerText = "";
  }, 2000);
}

displayFavorites();

getQuote();