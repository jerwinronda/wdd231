// Navigation menu
const hamButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  hamButton.classList.toggle("show");
  navBar.classList.toggle("show");
});

const membersContainer = document.querySelector("#members");
const url = "data/members.json";

async function getMembers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    displayMembers(data.members); // 👈 IMPORTANT
  } catch (error) {
    console.error("Error:", error);
  }
}

function displayMembers(members) {
  const membersContainer = document.querySelector("#members");

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");

    card.innerHTML = `
      <div class="image-container">
        <img src="${member.image}" alt="${member.name} Logo" />
      </div>
      <h3>${member.name}</h3>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Membership Level:</strong> ${getMembershipLevel(
        member.membership
      )}</p>
      <p>${member.description}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
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

// Call the function
getMembers();
