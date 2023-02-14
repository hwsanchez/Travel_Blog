const burgerIcon = document.querySelector("#burger");
const navbarMenu = document.querySelector("#nav-links");
const menuOptions = document.querySelector("menuLinks");

burgerIcon.addEventListener("click", () => {
  navbarMenu.classList.toggle("is-active");
});
