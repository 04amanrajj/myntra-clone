import { isUserLoggedin ,linkTo } from "../utils/utils.js";
// user name show in navbar
isUserLoggedin();
linkTo()

let images = [
  "images/slideshow/homepage/Activewear_DK.jpg",
  "images/slideshow/homepage/Handbags_Desk.jpg",
  "images/slideshow/homepage/Western-Wear_Desk.jpg",
  "images/slideshow/homepage/USPA_Desk_Banner.jpg",
  "images/slideshow/homepage/Handbags_Desk2.jpg",
];

function slideshow(images) {
  let i = 0;
  let interval = false;

  let imgdiv = document.querySelector(".slideshow");

  function updateimg() {
    imgdiv.innerHTML = "";
    let pic = document.createElement("img");
    pic.src = images[i];
    imgdiv.append(pic);
    pic.addEventListener(
      "click",
      () => (window.location.href = "./pages/shop.html")
    );
  }
  if (!interval) {
    interval = setInterval(() => {
      i++;
      if (i == images.length) i = 0;
      updateimg();
    }, 5000);
  }
  updateimg();
}

slideshow(images);

// redirect to mens page on img click
let bottomImages = document.querySelectorAll("#Main .bimgs");
bottomImages.forEach((image) => {
  image.addEventListener(
    "click",
    () => (window.location.href = "./pages/shop.html")
  );
});

// redirect to shop in input
let input = document.querySelector("#product");
input.addEventListener("input", () => {
  window.location.href = "./pages/shop.html";
});
