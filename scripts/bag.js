import { tostTopEnd } from "../utils/utils.js";

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
  if (bag.length == 0) kick();
  productClass.innerHTML = "";

  total = 0;
  total2 = 0;

  bag.forEach((element, i) => {
    element.quantity = element.quantity || 1;
    productClass.innerHTML += `
      <div class="outter">
  <div class="left-div">
    <img src="${element.imageUrl}" />
  </div>
  <div class="right-div">
    <div class="up-div">
      <h2>${element.product}</h2>
    </div>
    <div class="down-div">
      <div class="down-left">
        <p>Brand - ${element.brand || "Local"}</p>
        <p>${element.quantity} items in bag</p>
        <p>Rs.${(element.discountedPrice * element.quantity).toFixed(2)}</p>
      </div>
      <div class="down-right">
        <div>
          <span class="minus" data-index="${i}">-</span>
          <input class="input" type="text" value="${
            element.quantity
          }" readonly />
          <span class="plus" data-index="${i}">+</span>
        </div>
        <button class="del">Remove</button>
      </div>
    </div>
  </div>
</div>
    `;

    total += element.discountedPrice * element.quantity;
    total2 += element.strike * element.quantity;
  });

  addEventListenersToButtons();

  let delButton = document.querySelectorAll(".del");
  delButton.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      removes(i);
    });
  });
  bill();
}

function bill() {
  document.querySelector(".counter").textContent = "(" + bag.length + " items)";
  displayTotal.textContent = "Rs." + total.toFixed(2) + " Only";
  totalMrp.textContent = "Rs." + total2.toFixed(2);
  discountMrp.textContent = "Rs." + (total2 - total).toFixed(2);
  couponDiscount.textContent = "Rs." + 0;
  if (total >= 1000) {
    document.querySelector(".shipping-fee").textContent = "Rs." + 100;
    total += 100;
    totalAmount.textContent = "Rs." + total.toFixed(2);
  } else {
    totalAmount.textContent = "Rs." + total.toFixed(2);
    document.querySelector(".shipping-fee").textContent = "Free below Rs.1000";
  }
}

// adding event listeners to plus and minus buttons
function addEventListenersToButtons() {
  let plusButton = document.querySelectorAll(".plus");
  let minusButton = document.querySelectorAll(".minus");

  plusButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      bag[index].quantity++;
      localStorage.setItem("bag", JSON.stringify(bag));
      displayRecipt(bag);
    });
  });

  minusButton.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let index = e.target.getAttribute("data-index");
      if (bag[index].quantity > 1) {
        bag[index].quantity--;
        localStorage.setItem("bag", JSON.stringify(bag));
        displayRecipt(bag);
      }
    });
  });
}

// initial display call
displayRecipt(bag);

// function to remove item from the bag
function removes(i) {
  let arr = JSON.parse(localStorage.getItem("bag")) || [];
  arr.splice(i, 1);
  localStorage.setItem("bag", JSON.stringify(arr));
  bag = arr;
  displayRecipt(bag);

  tostTopEnd.fire({
    icon: "success",
    title: "Item removed",
  });
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
    displayTotal.textContent = "Rs." + total.toFixed(0);
    +" Only";
    totalAmount.textContent = "Rs." + total.toFixed(0);
    couponDiscount.textContent = "Rs." + (temp - total).toFixed(0);

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
form.addEventListener("submit", orderPlaced);

// scroll to bottom, click on procced
let button = document.querySelector(".Procced");
button.addEventListener("click", () => {
  form.style.display = "block";
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
    if (result.dismiss === Swal.DismissReason.timer) {
      Swal.fire({
        icon: "success",
        title: "Order Placed",
      });
      setTimeout(() => {
        Swal.fire({
          icon: "info",
          title: "Thank you for your purchase!",
          showConfirmButton: true,
          allowOutsideClick: false,
        });
      }, 3000);
      setTimeout(() => {
        localStorage.removeItem("bag");
        bag = "";
        displayRecipt(bag);
      }, 6000);
    }
  });
}
displayRecipt(bag);

function kick() {
  Swal.fire({
    icon: "info",
    title: "You bag is empty",
    text: "Redirecting to home...",
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    allowOutsideClick: false,
  });
  setTimeout(() => {
    window.location.href = "shop.html";
  }, 3000);
}
