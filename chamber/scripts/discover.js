import { places } from "../data/discover.mjs";

const hamButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".navigation");

if (hamButton && navBar) {
  hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });
}

const container = document.querySelector(".discover-grid");

places.forEach((place) => {
  const card = document.createElement("section");

  card.innerHTML = `
    <h2>${place.name}</h2>
    <figure>
      <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button>Learn More</button>
  `;

  container.appendChild(card);
});

const messageContainer = document.getElementById("visitor-message");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  messageContainer.textContent =
    "Welcome! Let us know if you have any questions.";
} else {
  const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

  if (daysBetween < 1) {
    messageContainer.textContent = "Back so soon! Awesome!";
  } else if (daysBetween === 1) {
    messageContainer.textContent = "You last visited 1 day ago.";
  } else {
    messageContainer.textContent = `You last visited ${daysBetween} days ago.`;
  }
}

localStorage.setItem("lastVisit", now);

// ================= Footer Section =================
const currentyear = document.querySelector("#currentYear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span> `;

document.getElementById("lastModified").innerHTML = document.lastModified;
