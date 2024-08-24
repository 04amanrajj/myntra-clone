import { tostTopEnd, tostBottomEnd, isUserLoggedin } from "../utils/utils.js";
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

let dataURL = "../json/home.json";

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
    price.setAttribute("class","pricep")

    let strikePrice = document.createElement("span");
    strikePrice.textContent = "Rs." + element.strike;
    strikePrice.style.textDecoration = "line-through";
    strikePrice.style.marginLeft = "5px"; 
    strikePrice.style.color="#666";

    let discount = document.createElement("p");
    discount.textContent = element.discountPercentage;

    let discountedPrice = document.createElement("span");
    discountedPrice.textContent = "Rs." + element.discountedPrice;



    price.append(discountedPrice,strikePrice,discount);

    let wish = document.createElement("button");
    wish.textContent = "Wishlist";
    wish.addEventListener("click", () => {
      wishlist(element);
    });
    wish.setAttribute("class", "button");



    card.append(img, wish, product, brand, price);
    document.querySelector(".products").append(card);
  });
}

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
  // gender
  let gender =
    document.querySelector('input[name="gender"]:checked')?.value || "All";

  // price sort
  let priceSort = document.getElementById("priceSort").value;

  let filteredData = bag;

  if (gender != "All") {
    filteredData = filteredData.filter((element) => element.gender == gender);
  }

  if (priceSort === "low to high") {
    filteredData.sort((a, b) => a.discountedPrice - b.discountedPrice);
  } else if (priceSort === "high to low") {
    filteredData.sort((a, b) => b.discountedPrice - a.discountedPrice);
  }

  displayProduct(filteredData);
}

document
  .querySelector(".filter button")
  .addEventListener("click", applyFilters);
document.querySelector(".resetF").addEventListener("click", () => {
  displayProduct(bag);
});
// user name show in navbar
isUserLoggedin();
