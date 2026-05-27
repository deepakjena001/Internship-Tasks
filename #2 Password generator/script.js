const passwordInput = document.getElementById("password");
const lengthInput = document.getElementById("length");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const saveBtn = document.getElementById("saveBtn");

const strengthText = document.getElementById("strengthText");
const message = document.getElementById("message");

const labelInput = document.getElementById("label");
const passwordList = document.getElementById("passwordList");
const searchInput = document.getElementById("search");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+";

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
saveBtn.addEventListener("click", savePassword);
searchInput.addEventListener("input", displayPasswords);

function generatePassword() {

  let length = parseInt(lengthInput.value);

  if (length < 4 || length > 50) {
    showMessage("Password length must be between 4 and 50", "red");
    return;
  }

  let characters = "";

  if (uppercaseEl.checked) {
    characters += upperChars;
  }

  if (lowercaseEl.checked) {
    characters += lowerChars;
  }

  if (numbersEl.checked) {
    characters += numberChars;
  }

  if (symbolsEl.checked) {
    characters += symbolChars;
  }

  if (characters === "") {
    showMessage("Select at least one option", "red");
    return;
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  passwordInput.value = password;

  checkStrength(password);

  showMessage("Password generated", "green");
}

function copyPassword() {

  if (passwordInput.value === "") {
    showMessage("Generate password first", "red");
    return;
  }

  navigator.clipboard.writeText(passwordInput.value);

  showMessage("Password copied", "green");
}

function checkStrength(password) {

  let strength = "Weak";

  let hasUpper = /[A-Z]/.test(password);
  let hasLower = /[a-z]/.test(password);
  let hasNumber = /[0-9]/.test(password);
  let hasSymbol = /[^A-Za-z0-9]/.test(password);

  let score = 0;

  if (password.length >= 8) score++;
  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasNumber) score++;
  if (hasSymbol) score++;

  if (score >= 5) {
    strength = "Strong";
  } else if (score >= 3) {
    strength = "Medium";
  }

  strengthText.innerText = strength;
}

function savePassword() {

  let password = passwordInput.value;

  if (password === "") {
    showMessage("Generate password first", "red");
    return;
  }

  let savedPasswords =
    JSON.parse(localStorage.getItem("passwords")) || [];

  let exists = savedPasswords.some(item => item.password === password);

  if (exists) {
    showMessage("Password already saved", "red");
    return;
  }

  let passwordData = {
    password: password,
    label: labelInput.value || "No Label",
    date: new Date().toLocaleString()
  };

  savedPasswords.push(passwordData);

  localStorage.setItem(
    "passwords",
    JSON.stringify(savedPasswords)
  );

  labelInput.value = "";

  displayPasswords();

  showMessage("Password saved", "green");
}

function displayPasswords() {

  let savedPasswords =
    JSON.parse(localStorage.getItem("passwords")) || [];

  let searchValue = searchInput.value.toLowerCase();

  passwordList.innerHTML = "";

  let filteredPasswords = savedPasswords.filter(item =>
    item.password.toLowerCase().includes(searchValue) ||
    item.label.toLowerCase().includes(searchValue)
  );

  filteredPasswords.forEach((item, index) => {

    let div = document.createElement("div");

    div.classList.add("password-item");

    div.innerHTML = `
      <p><strong>Password:</strong> ${item.password}</p>
      <p><strong>Label:</strong> ${item.label}</p>
      <p><strong>Date:</strong> ${item.date}</p>

      <button class="delete-btn" onclick="deletePassword(${index})">
        Delete
      </button>
    `;

    passwordList.appendChild(div); 

  });
}

function deletePassword(index) {

  let savedPasswords =
    JSON.parse(localStorage.getItem("passwords")) || [];

  savedPasswords.splice(index, 1);

  localStorage.setItem(
    "passwords",
    JSON.stringify(savedPasswords)
  );

  displayPasswords();

  showMessage("Password deleted", "green");
}

function showMessage(text, color) {

  message.innerText = text;
  message.style.color = color; 

  setTimeout(() => {
    message.innerText = "";
  }, 3000);
}

displayPasswords();












































































































































































































































