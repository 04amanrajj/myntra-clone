let form = document.querySelector("form");
form.addEventListener("submit", login);
let test = false;
let arr = JSON.parse(localStorage.getItem("users")) || [];

function login(event) {
  event.preventDefault();

  let obj = {
    username: form.username.value,
    userpass: form.userpass.value,
  };

  let foundUser = arr.find(
    (element) =>
      obj.username == element.username && obj.userpass == element.userpass
  );

  if (foundUser) {
    localStorage.setItem("loggedInUser", foundUser.username);
    // document.querySelector(".username").textContent = foundUser.username;
    alert("welcome back " + obj.username);
    window.location.href = "men-page.html";
  } else {
    Swal.fire("Looks like you are new. Let's create an account");
    setTimeout(() => {
      Swal.fire({
        title: "Create new Account",
        html: `
            <input placeholder="Enter name" id="newusername" class="swal2-input" required>
            <input placeholder="Enter password" id="newpassword" class="swal2-input">
          `,
        focusConfirm: false,
        preConfirm: () => {
          let username = document.getElementById("newusername").value;
          let userpass = document.getElementById("newpassword").value;

          if (username == "" || userpass == "") {
            alert("Your name or password cannot be empty");
            return false;
          } else {
            let newUser = { username, userpass };
            arr.push(newUser);
            localStorage.setItem("users", JSON.stringify(arr));

            Swal.fire("Now you can log in");
          }
        },
      });
    }, 3000);
  }
}
// user name show in navbar
import { isUserLoggedin } from '../utils/utils.js';
isUserLoggedin();