import {
  tostTopEnd,
  tostBottomEnd,
  isUserLoggedin,
  filter,
} from "../utils/utils.js";
// user name show in navbar
isUserLoggedin();

let bag = [];

document.querySelector("#product").addEventListener("input", search);

function search() {
  let input = document.querySelector("#product").value;
  let newData = bag.filter((element) => {
    return element.product.toLowerCase().includes(input.toLowerCase());
  });
  // console.log(bag);

  displayProduct(newData);
}

let dataURL = "../json/women.json";

async function getData() {
  try {
    let data = await fetch(dataURL);
    data = await data.json();
    bag = randomArray(data);
    displayProduct(bag);

    tostBottomEnd.fire({
      icon: "success",
      title: "Data fetched successfully",
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
      confirmButtonText: "Okay!",
    });
  }
}
getData();

// random product
function randomArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// display product
function displayProduct(data) {
  // console.log(data[0])
  document.querySelector(".products").innerHTML = "";
  data.forEach((element) => {
    // console.log(element);
    let card = document.createElement("div");

    let img = document.createElement("img");
    img.src = element.imageUrl;

    let product = document.createElement("h4");
    product.textContent = element.product;

    let brand = document.createElement("p");
    brand.textContent = element.brand;

    // line between strike
    let price = document.createElement("div");
    price.setAttribute("class", "pricep");

    let strikePrice = document.createElement("span");
    strikePrice.textContent = "Rs." + element.strike;
    strikePrice.style.textDecoration = "line-through";
    strikePrice.style.marginLeft = "5px";
    strikePrice.style.color = "#666";

    let discount = document.createElement("p");
    discount.textContent = element.discountPercentage;

    let discountedPrice = document.createElement("span");
    discountedPrice.textContent = "Rs." + element.discountedPrice;

    price.append(discountedPrice, strikePrice, discount);

    let wish = document.createElement("button");
    wish.textContent = "Wishlist";
    wish.addEventListener("click", () => {
      wishlist(element);
    });
    wish.setAttribute("class", "button");

    card.append(img, wish, product, brand, price);
    document.querySelector(".products").append(card);

    // items counter display
    let counter = document.querySelector(".counter");
    counter.textContent = data.length + " items";
  });
}

// mobile responsive filter
let show = document.querySelector(".show-mobile-filter");
let close = document.querySelector(".hide-mobile-filter");
close.addEventListener("click", function () {
  let filterPanel = document.querySelector(".filter");
  filterPanel.style.display = "none";
  if (filterPanel.style.display == "none") close.style.display = "none";
});
show.addEventListener("click", function () {
  let filterPanel = document.querySelector(".filter");
  close.style.display = "flex";
  filterPanel.style.display = "flex";
});

function wishlist(element) {
  let arr = JSON.parse(localStorage.getItem("wishlist")) || [];
  arr.push(element);
  localStorage.setItem("wishlist", JSON.stringify(arr));
  tostTopEnd.fire({
    icon: "success",
    title: "added to wishlist",
  });
}

//filter
function applyFilters() {
  let gender =
    document.querySelector('input[name="gender"]:checked')?.value || "All";
  let priceSort = document.getElementById("priceSort").value;
  let filteredData = bag;
  if (gender != "All")
    filteredData = filteredData.filter((element) => element.gender == gender);
  if (priceSort === "low to high")
    filteredData.sort((a, b) => a.discountedPrice - b.discountedPrice);
  else if (priceSort === "high to low")
    filteredData.sort((a, b) => b.discountedPrice - a.discountedPrice);
  displayProduct(filteredData);
}

// apply or reset filter
document
  .querySelector(".filter button")
  .addEventListener("click", applyFilters);
document.querySelector(".resetF").addEventListener("click", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.checked = false;
  });
  document.querySelectorAll("select").forEach((select) => {
    select.selectedIndex = 0;
  });
  displayProduct(bag);
});

let filterbutton = document.querySelectorAll(".filter-checkboxes-brand");

for (let btn of filterbutton) {
  btn.addEventListener("click", async (e) => {
    let type = e.target.className.split("-")[2];
    let brandName = e.target.id;
    // console.log(type, brandName);
    let filterData = await filter(brandName, bag, type);
    displayProduct(filterData);
  });
  // console.log(btn);
}

let filterbutton2 = document.querySelectorAll(".filter-product");

for (let btn of filterbutton2) {
  btn.addEventListener("click", async (e) => {
    let type = e.target.className.split("-")[1];
    let productName = e.target.id;
    let filterData = await filter(productName, bag, type);
    console.log(filterData);
    displayProduct(filterData);
  });
}

// popup
function showProductPopup(product) {
  Swal.fire({
    html: `
    <img src="${product.imageUrl}" alt="" width=200px> <br>
    <strong>${product.product} Details</strong>
    <p>${product.brand}</p> <br>
    <button class="popup-btn">Add to wishlist! </button>
    `,
    showConfirmButton: false,
    showCloseButton: true,
    focusConfirm: true,
  });

  document.querySelector(".popup-btn").addEventListener("click", () => {
    wishlist(product);
  });
}

let products = document.querySelectorAll(".products");

for (let p of products) {
  p.addEventListener("click", (e) => {
    let element = e.target;
    let productName = element.querySelector("h4").textContent;

    let clickedProduct = bag.find((item) => item.product === productName);
    showProductPopup(clickedProduct);
  });
}