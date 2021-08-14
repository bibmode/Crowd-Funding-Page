"use strict";

const bookmark = document.querySelector("#bookmark");
const iconGreen = document.querySelector("#icon__bookmark--green");
const iconGrey = document.querySelector("#icon__bookmark--grey");
const progressBar = document.querySelector(".progress__bar--front");
const progressText = document.querySelector(".progress__bold");
const progressBack = document.querySelector("#progress_backup");

const suppBtn = document.querySelector("#btn__support");
const freeBtn = document.querySelector("#btn__free");
const thanksBtn = document.querySelector("#btn__thanks");
const closeBtn = document.querySelector("#popup__close--btn");
const toggleBtns = document.querySelectorAll(".offer__btn");
const amountBtns = document.querySelectorAll(".amount__btn");

const radio3 = document.querySelector("#pledge-3");

const offerContainer = document.querySelector("#offer__card");
const popup = document.querySelector("#popup__container");
const thanks = document.querySelector("#thanks__container");

const toggles = document.querySelectorAll(".amount");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

let count = 1,
  add,
  numOpen,
  numClose;

let amountProgress = 89914,
  amountBack = 5007;
let arr = [0, 25, 75, 10000 - 8914, 25, 75, 10000 - 8914];

checkboxes.forEach(function (btn, i) {
  btn.addEventListener("change", function (e) {
    removeActive(i);
  });
});

//remove other active checkboxes
function removeActive(i) {
  checkboxes.forEach(function (btn) {
    if ([...checkboxes].indexOf(btn) !== i) {
      btn.checked = false;
    }
  });
}

//uncheck all checkboxes
function uncheck() {
  [...checkboxes].forEach((box) => (box.checked = false));
}

function toggleShow(num) {
  document.querySelector(`#amount__${num}`).style.visibility = "visible";
  document.querySelector(`#amount__${num}`).style.height = "100px";
  document.querySelector(`#amount__${num}`).style.padding = "1rem";
  document.querySelector(`.offer-${num}`).style.display = "none";
  if (num !== 6) {
    document.querySelector(
      `#amount__text--${num}`
    ).innerHTML = `Enter your pledge`;
  }
}

function toggleHide(num) {
  document.querySelector(`#amount__${num}`).style.visibility = "hidden";
  document.querySelector(`#amount__${num}`).style.height = "0";
  document.querySelector(`#amount__${num}`).style.padding = "0";
  document.querySelector(`.offer-${num}`).style.display = "block";
  if (num !== 6) {
    document.querySelector(`#amount__input--${num}`).value = "";
  }
}

function showThanks() {
  popup.style.display = "none";
  thanks.style.display = "block";
}

freeBtn.addEventListener("click", function () {
  showThanks();
});

thanksBtn.addEventListener("click", function () {
  thanks.style.display = "none";
  uncheck();
});

//toggle
toggleBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const buttons = [...e.target.classList];
    if (buttons[1] === "offer-1") {
      numOpen = 1;
      numClose = 2;
      toggleHide(6);
      toggleHide(numClose);
    }
    if (buttons[1] === "offer-2") {
      numOpen = 2;
      numClose = 1;
      toggleHide(6);
      toggleHide(numClose);
    }
    if (buttons[1] === "offer-3") return;
    if (buttons[1] === "offer-4") {
      numOpen = 4;
      numClose = 5;
      toggleHide(6);
      toggleHide(numClose);
    }
    if (buttons[1] === "offer-5") {
      numOpen = 5;
      numClose = 4;
      toggleHide(6);
      toggleHide(numClose);
    }
    if (buttons[1] === "offer-6") {
      if (numOpen === 1 || numOpen === 2 || numOpen === 4 || numOpen === 5) {
        numClose = numOpen;
        toggleHide(numClose);
      }
      numOpen = 6;
    }

    //show
    toggleShow(numOpen);
  });
});

//validating pledge amount
amountBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const inputAmount = document.querySelector(
      `#amount__input--${numOpen}`
    ).value;

    if (numOpen === 1) add = 4;
    if (numOpen === 2) add = 5;
    if (numOpen === 4) add = 1;
    if (numOpen === 5) add = 2;

    amountValidation(inputAmount, numOpen, add);
    updateProgress(Number(inputAmount));
  });
});

function amountValidation(amount, open, add) {
  if (amount < arr[open]) {
    document.querySelector(
      `#amount__text--${open}`
    ).innerHTML = `Pledge must be atleast $${arr[open]}`;

    document.querySelector(`#amount__input--${open}`).value = "";
  }

  if (amount >= arr[open] && amount < arr[open + 1]) {
    document.querySelector(
      `#amount__text--${open}`
    ).innerHTML = `Enter your pledge`;

    let val = Number(
      document.querySelector(`#offer__price--${open}`).innerHTML
    );
    val--;
    document.querySelector(`#offer__price--${open}`).innerHTML = `${val}`;

    let val2 = Number(
      document.querySelector(`#offer__price--${add}`).innerHTML
    );
    val2--;
    document.querySelector(`#offer__price--${add}`).innerHTML = `${val2}`;

    arr[3] -= amount;

    uncheck();
    toggleHide(open);
    showThanks();
  }

  if (amount >= arr[open + 1]) {
    document.querySelector(
      `#amount__text--${open}`
    ).innerHTML = `Enter an amount less than $${arr[open + 1]}`;

    document.querySelector(`#amount__input--${open}`).value = "";
  }
}

//updating progress bar

function updateProgress(amount) {
  amountProgress += amount;
  amountBack++;

  const percentage = (amountProgress / 100000) * 100;
  progressBar.style.width = `${percentage}%`;

  progressText.innerHTML = `$${amountProgress.toLocaleString()}`;
  progressBack.innerHTML = `${amountBack.toLocaleString()}`;
}

//bookmark
bookmark.addEventListener("click", function (e) {
  if (count % 2 !== 0) {
    bookmark.classList.add("btn__bookmark--green");
    bookmark.innerHTML = "Bookmarked";
    iconGreen.style.display = "block";
    iconGrey.style.display = "none";
  } else {
    bookmark.classList.remove("btn__bookmark--green");
    bookmark.innerHTML = "Bookmark";
    iconGreen.style.display = "none";
    iconGrey.style.display = "block";
  }
  count++;
});

//popup
suppBtn.addEventListener("click", function () {
  popup.style.display = "block";
  if (numOpen) toggleHide(numOpen);
});

closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
  uncheck();
});

//make radio unclickable
radio3.disabled = "true";
