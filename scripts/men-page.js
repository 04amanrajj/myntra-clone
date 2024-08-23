let images = [
  "../images/slideshow/menPage/Workwear_Desk.jpg",
  "../images/slideshow/menPage/Sports-Shoes_Desk2.jpg",
  "../images/slideshow/menPage/Lancer_Desk.jpg",
  "../images/slideshow/menPage/Sports-Shoes_Desk.jpg",
  "../images/slideshow/menPage/CR7_Desk_Baner.jpg",
  "../images/slideshow/menPage/Backpacks---Luggage_Desk.jpg",
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


// user name show in navbar
import { redirect,isUserLoggedin } from '../utils/utils.js';
isUserLoggedin()
redirect()