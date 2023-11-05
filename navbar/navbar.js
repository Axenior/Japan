const hamburgerMenu = document.querySelector(".hamburger-menu");
const navbarMenu = document.querySelector(".navbar-show");

hamburgerMenu.addEventListener("click", () => {
  if (navbarMenu.style.display === "block") {
    navbarMenu.style.display = "none";
  } else {
    navbarMenu.style.display = "block";
  }
});