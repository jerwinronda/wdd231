const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector(".navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuBtn.classList.toggle("open");
});
