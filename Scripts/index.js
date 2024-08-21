let images = [
  "images/slideshow/homepage/Activewear_DK.jpg",
  "images/slideshow/homepage/Handbags_Desk.jpg",
  "images/slideshow/homepage/Western-Wear_Desk.jpg",
  "images/slideshow/homepage/USPA_Desk_Banner.jpg",
  "images/slideshow/homepage/Handbags_Desk2.jpg",
];

function slideshow(images){
    let i = 0;
let interval = false;

let imgdiv = document.querySelector(".slideshow");

function updateimg() {
  imgdiv.innerHTML = "";
  let pic = document.createElement("img");
  pic.src = images[i];
  imgdiv.append(pic);
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

slideshow(images)
