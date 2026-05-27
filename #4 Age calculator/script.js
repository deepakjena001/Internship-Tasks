const birthDateInput = document.getElementById("birthDate");

const calculateBtn = document.getElementById("calculateBtn");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

const message = document.getElementById("message");

calculateBtn.addEventListener("click", calculateAge);

function calculateAge() {

  const birthDateValue = birthDateInput.value;

  if (birthDateValue === "") {
    showMessage("Please select birth date");
    return;
  }

  const birthDate = new Date(birthDateValue);

  const today = new Date();

  if (birthDate > today) {
    showMessage("Future dates are not allowed");
    return;
  }

  let years = today.getFullYear() - birthDate.getFullYear();

  let months = today.getMonth() - birthDate.getMonth();

  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {

    months--;

    let previousMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0
    ).getDate();

    days += previousMonth;
  }

  if (months < 0) {

    years--;

    months += 12;
  }

  yearsEl.innerText = years;
  monthsEl.innerText = months;
  daysEl.innerText = days;

  message.innerText = "";
}

function showMessage(text) {

  message.innerText = text;

  yearsEl.innerText = 0;
  monthsEl.innerText = 0;
  daysEl.innerText = 0;
}