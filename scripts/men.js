import { tostTopEnd,tostBottomEnd ,search } from "../utils/utils.js";

let s = search()
console.log(s);
let dataURL = "../json/men.json";


async function getData() {
  try {
    let data = await fetch(dataURL);
    data = await data.json();
    console.log(data);

    tostBottomEnd.fire({
        icon: "success",
        title: "Data fetched successfully"
      });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.message,
      icon: "error",
      confirmButtonText: "Cool",
    });
   
  }
}

console.log(Swal);
getData();

// user name show in navbar
import { isUserLoggedin } from "../utils/utils.js";
isUserLoggedin()


