import { attractions } from "../data/place.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".hambutton");
  const nav = document.getElementById("main-nav");

  menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");
    menuButton.classList.toggle("show");
  });
});

const containerSpotlight = document.getElementById("spotlight-container");
if (containerSpotlight) {
  const spotlightAttractions = attractions.slice(0, 3);
  spotlightAttractions.forEach((attraction) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");
    card.innerHTML = `
      <img src="${attraction.image}" alt="${attraction.name}" class="spotlight-image" loading="lazy" />
      <h3 class="spotlight-name">${attraction.name}</h3>
      <p class="spotlight-address">${attraction.address}</p>
      <p class="spotlight-description">${attraction.description}</p>
    `;
    containerSpotlight.appendChild(card);
  });
}

const containerAttractions = document.getElementById("attractions-container");
if (containerAttractions) {
  attractions.forEach((attraction) => {
    const card = document.createElement("div");
    card.classList.add("attraction-card");
    card.innerHTML = `
      <img data-src="${attraction.image}" alt="${attraction.name}" class="lazy" />
      <h3 class="attraction-name">${attraction.name}</h3>
      <p class="attraction-address">${attraction.address}</p>
      <p class="attraction-description">${attraction.description}</p>
    `;
    containerAttractions.appendChild(card);
  });

  // Lazy-load images
  const lazyImages = containerAttractions.querySelectorAll("img.lazy");
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "0px 0px 200px 0px" },
  );

  lazyImages.forEach((img) => imageObserver.observe(img));
}

// Footer Section
const currentyear = document.querySelector("#currentYear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span> `;

document.getElementById("lastModified").innerHTML = document.lastModified;
