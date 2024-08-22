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
    // pic.setAttribute("id","slideimg")
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

slideshow(images);
let main = document.querySelector("#imgTag");
main.addEventListener("click", () => (window.location.href = "men-item.html"));
console.log(main);
