let form = document.querySelector("form");
form.addEventListener("submit", login);
let test = false;
let arr = [];
//   JSON.parse(localStorage.getItem("user")) || [];

function login(event) {
  event.preventDefault();

  let obj = {
    number: form.userNumber.value,
  };
  arr.push(obj);
  localStorage.setItem("user", JSON.stringify(arr));

 
}