const openButton = document.querySelector("#openBtn");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeBtn");

openButton.addEventListener("click", () => {
  dialogBox.showModal();
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});
