const filter = () => {
  return "filter";
};

const search = () => {
  

  return "search";
};

const tostTopEnd = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

const tostBottomEnd = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// authantication
function isUserLoggedin() {
  document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");
    let savedUser = localStorage.getItem("loggedInUser");
    // console.log(savedUser);
    if (savedUser != null) {
      isUserLoggedin();
      tostTopEnd.fire({
        icon: "success",
        title: "Logged in successfully",
      });
    }

    if (loggedInUser) {
      let loginLink = document.querySelector(".username");
      if (loginLink) {
        loginLink.textContent = loggedInUser;
      }
    }
  });
}

export { tostTopEnd, tostBottomEnd, filter, search, isUserLoggedin };