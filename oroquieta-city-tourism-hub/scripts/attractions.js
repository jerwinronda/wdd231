const container = document.querySelector("#attractions");

async function loadAttractions() {
  try {
    const response = await fetch("data/attractions.json");
    const data = await response.json();

    data.forEach((item) => {
      container.innerHTML += `
        <article class="card">
          <h3>${item.name}</h3>
          <p><strong>Type:</strong> ${item.type}</p>
          <p><strong>Location:</strong> ${item.location}</p>
          <p>${item.description}</p>
        </article>
      `;
    });
  } catch (error) {
    container.textContent = "Failed to load attractions.";
  }
}

loadAttractions();
