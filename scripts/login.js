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

  let found = false;
  arr.forEach((element) => {
    if (obj.username == element.username && obj.userpass == element.userpass) {
      return (found = true);
    }
  });
  if (found) {
     (params) => {
      document.querySelector(".username").textContent = element.username;
    }
    
    alert("welcome back " + obj.username);
    window.location.href = "men-page.html";
  } else {
    const { value: formValues } = Swal.fire({
      title: "Create new Account",
      html: `
            <input placeholder="Enter name" id="newusername" class="swal2-input" required>
            <input placeholder="Enter password" id="newpassword" class="swal2-input">
          `,
      focusConfirm: false,
      preConfirm: () => {
        let username = document.getElementById("newusername").value;
        let userpass = document.getElementById("newpassword").value;

        let obj = {
          username: username,
          userpass: userpass,
        };
        if (username == "" || userpass == "")
          return alert("your name or password is ' '?");
        else {
          arr.push(obj);
          localStorage.setItem("users", JSON.stringify(arr));

          Swal.fire("Now you can login");
        }
      },
    });
  }
}

export { testlogin };
