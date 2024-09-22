// user name show in navbar
import { redirect, isUserLoggedin, linkTo } from "../utils/utils.js";
isUserLoggedin();
redirect();
linkTo()

let images = [
  "../images/slideshow/men-page/Workwear_Desk.jpg",
  "../images/slideshow/men-page/Sports-Shoes_Desk2.jpg",
  "../images/slideshow/men-page/Lancer_Desk.jpg",
  "../images/slideshow/men-page/Sports-Shoes_Desk.jpg",
  "../images/slideshow/men-page/CR7_Desk_Baner.jpg",
  "../images/slideshow/men-page/Backpacks---Luggage_Desk.jpg",
];

function slideshow(images) {
  let i = 0;
  let interval = false;

  let imgdiv = document.querySelector(".slideshow");

  function updateimg() {
    imgdiv.innerHTML = "";
    let pic = document.createElement("img");
    pic.src = images[i];
    pic.setAttribute("id", "slideimg");
    imgdiv.append(pic);
    pic.addEventListener(
      "click",
      () => (window.location.href = "men-item.html")
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
    () => (window.location.href = "men-item.html")
  );
});

