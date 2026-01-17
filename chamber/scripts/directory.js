// Navigation menu
const hamButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("show");
  navBar.classList.toggle("show");
});

const membersContainer = document.querySelector("#members");

// Add toggle buttons dynamically or in HTML
const toggleContainer = document.createElement("div");
toggleContainer.classList.add("view-toggle");
// toggleContainer.innerHTML = `
//   <button id="grid-view">Grid View</button>
//   <button id="list-view">List View</button>
// `;
document.querySelector("main").insertBefore(toggleContainer, membersContainer);

document.querySelector("#grid-view").addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

document.querySelector("#list-view").addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

// Existing fetch code
async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = ""; // clear previous content

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <div class="image-container">
        <img src="${member.image}" alt="${member.name} Logo" />
      </div>
      <div>
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Membership Level:</strong> ${getMembershipLevel(
          member.membership
        )}</p>
        <p>${member.description}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      </div>
    `;

    membersContainer.appendChild(card);
  });
}

// Convert membership number to label
function getMembershipLevel(level) {
  switch (level) {
    case 1:
      return "Bronze";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Unknown";
  }
}

getMembers();

// Footer copyright & last modified
const copyright = document.querySelector("#copyright");
const lastModified = document.querySelector("#last-modified");

// Current year
const year = new Date().getFullYear();
copyright.textContent = `© ${year} Oroquieta City Chamber of Commerce`;

// Last modified date
const modifiedDate = new Date(document.lastModified);
lastModified.textContent = `Last updated: ${modifiedDate.toLocaleDateString()} ${modifiedDate.toLocaleTimeString()}`;
