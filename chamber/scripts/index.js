const hamButton = document.querySelector("#menu-button");
const navBar = document.querySelector(".navigation");

if (hamButton && navBar) {
  hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("show");
    navBar.classList.toggle("show");
  });
}

const weatherIcon = document.querySelector("#weather-icon");
const currentTemp = document.querySelector("#current-temp");
const iconDesc = document.querySelector("#weather-desc");

const myKey = "0fac8aa6f2432b5aeb63a1323a57ef0a";
const oroqLat = "8.49";
const oroqLong = "123.80";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${oroqLat}&lon=${oroqLong}&appid=${myKey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${oroqLat}&lon=${oroqLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;F`;

  const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute("src", iconSrc);
  weatherIcon.setAttribute("alt", desc);
  iconDesc.textContent = `${desc}`;
}

// ================= Forecast Section =================
async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

getForecast();
function displayForecast(data) {
  const forecastDiv = document.querySelector("#forecast");
  forecastDiv.innerHTML = "";

  const dailyForecasts = data.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

  dailyForecasts.forEach((day) => {
    const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    const temp = Math.round(day.main.temp);
    const icon = day.weather[0].icon;
    const desc = day.weather[0].description;

    const forecastHTML = `
      <div class="forecast-day">
        <p><strong>${date}</strong></p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${desc}">
        <p>${temp}&deg;F</p>
      </div>
    `;

    forecastDiv.innerHTML += forecastHTML;
  });
}

// ================= Spotlights Section =================
const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json"; // adjust path if needed

async function getSpotlights() {
  try {
    const response = await fetch(membersURL);
    if (response.ok) {
      const data = await response.json();
      displaySpotlights(data.members);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

getSpotlights();

function displaySpotlights(members) {
  // Filter silver & gold members only
  const qualifiedMembers = members.filter((member) => member.membership >= 2);

  // Shuffle array randomly
  const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

  // Choose 2 or 3 members randomly
  const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
  const selectedMembers = shuffled.slice(0, spotlightCount);

  spotlightContainer.innerHTML = "";

  selectedMembers.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <h3>${member.name}</h3>
      <img src="${member.image}" alt="${member.name} logo" loading="lazy">
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    spotlightContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 3:
      return "Gold";
    case 2:
      return "Silver";
    default:
      return "Bronze";
  }
}

// ================= Footer Section =================
const currentyear = document.querySelector("#currentYear");
const today = new Date();

currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span> `;

document.getElementById("lastModified").innerHTML = document.lastModified;
