let cart = JSON.parse(localStorage.getItem("bag")) || [],
total = 0,
item = 0;

function displayTable(cart) {
  total = 0;
  items = 0;
  document.querySelector("tbody").innerHTML = "";

  cart.forEach((element, i) => {
    let row = document.createElement("tr");

    let img = document.createElement("img");
    img.setAttribute("src", element.image_url);

    let td1 = document.createElement("td");
    td1.append(img);
    row.append(td1);

    let td2 = document.createElement("td");
    td2.textContent = element.name;
    td2.style.fontSize = "smaller";
    row.append(td2);

    let td3 = document.createElement("td");
    td3.textContent = element.price;
    row.append(td3);

    let td4 = document.createElement("td");
    td4.textContent = element.quantity || 1;
    row.append(td4);

    let td5 = document.createElement("td");
    td5.textContent = "+";
    td5.style.cursor = "pointer";
    td5.addEventListener("click", function () {
      increaseQuantity(i);
    });
    row.append(td5);

    let td6 = document.createElement("td");
    td6.textContent = "-";
    td6.style.cursor = "pointer";
    td6.addEventListener("click", function () {
      decreaseQuantity(i);
    });
    row.append(td6);

    let td7 = document.createElement("td");
    td7.textContent = "Remove";
    td7.style.color = "white";
    td7.style.backgroundColor = "darkred";
    td7.style.cursor = "pointer";
    td7.addEventListener("click", function () {
      removeFun(i);
    });
    row.append(td7);

    document.querySelector("tbody").append(row);

    //total price
    let quantity = element.quantity || 1;
    total += element.price * quantity;

    //total items
    items += quantity;
  });

  // total price funtion
  bill(total, items);
}
// showing bill
function bill(total, items, input) {
  if (input == "aman30") {
    total *= 0.7;
    document.getElementById("bill").textContent = "$" + total;
    document.getElementById("items").textContent = items;
    alert("Discount applied");
  } else {
    document.getElementById("bill").textContent = "$" + total;
    document.getElementById("items").textContent = items;
  }
}

//incresing order
function increaseQuantity(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[i].quantity += 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayTable(cart);
}

//decresing order
function decreaseQuantity(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart[i].quantity > 1) {
    cart[i].quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayTable(cart);
  } else removeFun(i);
}

//Removing rows
function removeFun(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayTable(cart);
}

//discount promo
document.querySelector("button").addEventListener("click", function () {
  let input = document.querySelector("#promo").value;
  displayTable(cart);
  bill(total, items, input);
});

// form hide
form = document.getElementById("form");
form.style.display = "none";

// form show
document.querySelector(".Procced").addEventListener("click", () => {
  form.style.display = "flex";
});

//user redirect
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let card = document.querySelector("#card").value;
  let cvv = document.querySelector("#cvv").value;
  let expire = document.querySelector("#expire").value;

  if (card && cvv && expire) {
    window.location.href = "otp.html";
  } else {
    alert("Fill Card Details");
  }
});

//normal call
displayTable(cart);
