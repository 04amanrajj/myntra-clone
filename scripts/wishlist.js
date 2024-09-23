import {
  tostTopEnd,
  redirect,
  linkTo,
} from "../utils/utils.js";

redirect();
linkTo();

let data = JSON.parse(localStorage.getItem("wishlist")) || [];
let bigDiv = document.querySelector(".wishes");

if (data.length != 0) displayWish(data);
else {
  Swal.fire({
    icon: "question",
    title: "You have no wishes?",
    text: "Go wish for something!",
    confirmButtonText: "I will",
    allowOutsideClick: false,
  });
  setTimeout(() => {
    window.location.href = "shop.html";
  }, 3000);
}

function displayWish(data) {
  // console.log(data[0])
  bigDiv.innerHTML = "";
  let counter = document.querySelector("#main>h1");
  counter.textContent = "I have " + data.length + " Wishes!";
  //   document.querySelector()

  data.forEach((element, i) => {
    // console.log(element);
    let card = document.createElement("div");

    let img = document.createElement("img");
    img.src = element.imageUrl;

    let product = document.createElement("h4");
    product.textContent = element.product;

    let brand = document.createElement("p");
    brand.textContent = element.brand;

    let price = document.createElement("p");
    price.textContent =
      "Rs." +
      element.discountedPrice +
      " " +
      "Rs." +
      element.strike +
      " " +
      element.discountPercentage;

    let cart = document.createElement("button");
    cart.textContent = "MOVE TO BAG";
    cart.addEventListener("click", () => {
      bag(element, i);
    });
    cart.setAttribute("class", "button");

    let remove = document.createElement("button");
    remove.textContent = "REMOVE FROM WISH";
    remove.addEventListener("click", () => {
      removes(i);
    });
    remove.setAttribute("class", "remove");

    let discount = document.createElement("p");
    discount.textContent = element.discountPercentage;

    card.append(remove, img, cart, product, brand, price);
    bigDiv.append(card);
  });
}

function bag(element, i) {
  let arr = JSON.parse(localStorage.getItem("bag")) || [];
  arr.push(element);
  localStorage.setItem("bag", JSON.stringify(arr));
  removes(i);
  tostTopEnd.fire({
    icon: "success",
    title: "Added to bag",
  });
}

// remove funtion
function removes(i) {
  let arr = JSON.parse(localStorage.getItem("wishlist")) || [];
  arr.splice(i, 1);
  localStorage.setItem("wishlist", JSON.stringify(arr));
  displayWish(arr);
  tostTopEnd.fire({
    icon: "success",
    title: "Wish is vanished XD",
  });
}
