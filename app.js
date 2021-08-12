"use strict";

const bookmark = document.querySelector("#bookmark");
const iconGreen = document.querySelector("#icon__bookmark--green");
const iconGrey = document.querySelector("#icon__bookmark--grey");

const suppBtn = document.querySelector("#btn__support");
const closeBtn = document.querySelector("#popup__close--btn");

const popup = document.querySelector("#popup__container");

let count = 1;
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

suppBtn.addEventListener("click", function () {
  popup.style.display = "block";
});

//closeBtn.a
closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
});
