import { tostBottomEnd, isUserLoggedin } from "../utils/utils.js";
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

let dataURL = "../json/men.json";

async function getData() {
  try {
    let data = await fetch(dataURL);
    data = await data.json();
    bag = data;
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

    let price = document.createElement("p");
    price.textContent =
      element.discountedPrice +
      " " +
      element.strike +
      " " +
      element.discountPercentage;

    let wish = document.createElement("div");
    wish;
    // price.setAttribute("class","price")

    // let extraPrice = document.createElement("p");
    // extraPrice.textContent = element.strike;

    // let rating=document.createElement("p")
    // rating.textContent=element.ratingsContainer

    let discount = document.createElement("p");
    discount.textContent = element.discountPercentage;

    card.append(img, product, brand, price);
    document.querySelector(".products").append(card);
  });
}

// user name show in navbar
isUserLoggedin();
