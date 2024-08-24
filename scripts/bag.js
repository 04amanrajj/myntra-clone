let bag = JSON.parse(localStorage.getItem("bag")) || [];
let total = 0;
let total2 = 0;

let productClass = document.querySelector(".product");
let totalMrp = document.querySelector(".mrp");
let discountMrp = document.querySelector(".discountMrp");
let totalAmount = document.querySelector(".total-amount");
let couponDiscount = document.querySelector(".CouponDis");
let displayTotal = document.querySelector("#total");

// Function to display receipt and calculate totals
function displayRecipt(bag) {
  productClass.innerHTML = "";

  total = 0;
  total2 = 0;

  bag.forEach((element, i) => {
    let imgDiv = document.createElement("div");

    let img = document.createElement("img");
    img.src = element.imageUrl;
    imgDiv.append(img);

    let description = document.createElement("div");

    let productName = document.createElement("h2");
    productName.textContent = element.product;
    description.append(productName);

    let brand = document.createElement("p");
    brand.textContent = element.brand;
    description.append(brand);

    let price = document.createElement("p");
    price.textContent = "Rs " + element.discountedPrice;
    description.append(price);

    let del = document.createElement("button");
    del.textContent = "Remove";
    del.setAttribute("class", "del");
    del.addEventListener("click", () => removes(i));

    let product = document.createElement("div");
    product.append(imgDiv, description);
    let itemsrow = document.createElement("div");
    itemsrow.append(product, del);
    productClass.append(itemsrow);

    total += Number(element.discountedPrice);
    total2 += Number(element.strike);
  });

  bill(); // Recalculate totals
}

function bill() {
  document.querySelector(".counter").textContent = "(" + bag.length + " items)";

  displayTotal.textContent = "Rs " + total + " Only";
  totalMrp.textContent = "Rs " + total2;
  discountMrp.textContent = "Rs " + (total2 - total).toFixed(2);
  couponDiscount.textContent = "Rs " + 0;
  totalAmount.textContent = "Rs " + total;
}

// Coupon code application
document.querySelector(".btn-apply").addEventListener("click", async () => {
  const { value: formValues } = await Swal.fire({
    title: "Enter Code",
    html: `<input id="swal-input1" class="swal2-input">`,
    focusConfirm: false,
    preConfirm: () => {
      return [document.getElementById("swal-input1").value];
    },
    didOpen: () => {
      const input = document.getElementById("swal-input1");
      if (input) {
        input.style.width = "190px";
      }
    },
  });

  if (formValues) {
    Swal.fire("Congrats");
  }

  if (formValues == "aman30") {
    let temp = total;
    total *= 0.7;
    displayTotal.textContent = "Rs " + total + " Only";
    totalAmount.textContent = "Rs " + total;
    couponDiscount.textContent = "Rs " + (temp - total);

    tostTopEnd.fire({
      icon: "success",
      title: "You got this",
    });
  } else {
    tostTopEnd.fire({
      icon: "error",
      title: "Try aman30",
    });
  }
});

// Form submission handling
let form = document.getElementById("form");
form.style.display = "none";
form.addEventListener("click", orderPlaced);

// scroll to bottom, click on procced
let button = document.querySelector(".Procced");
button.addEventListener("click", () => {
  form.style.display = "flex";
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
});

function orderPlaced(e) {
  e.preventDefault();
  let timerInterval;
  Swal.fire({
    title: "Processing!",
    html: "Wait <b></b> milliseconds.",
    timer: 5000,
    timerProgressBar: true,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      Swal.fire({
        icon: "success",
        title: "Order Placed",
      });
    }
  });
}

// Function to remove item from the bag
function removes(i) {
  let arr = JSON.parse(localStorage.getItem("bag")) || [];
  arr.splice(i, 1);
  localStorage.setItem("bag", JSON.stringify(arr));
  bag = arr; // Update the global bag variable
  displayRecipt(bag);
  tostTopEnd.fire({
    icon: "success",
    title: "Item removed",
  });
}

// Initial display of the receipt
displayRecipt(bag);

import { tostTopEnd } from "../utils/utils.js";
