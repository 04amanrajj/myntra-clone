let images = [
  "../images/slideshow/women-page/1.jpeg",
  "../images/slideshow/women-page/2.jpg",
  "../images/slideshow/women-page/3.jpg",
  "../images/slideshow/women-page/4.jpg",
  "../images/slideshow/women-page/5.jpg",
  "../images/slideshow/women-page/6.jpg"
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
      () => (window.location.href = "women-item.html")
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
    () => (window.location.href = "women-item.html")
  );
});


// user name show in navbar
import { redirect,isUserLoggedin } from '../utils/utils.js';
isUserLoggedin()
redirect()

