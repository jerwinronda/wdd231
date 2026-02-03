// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Display submitted form data
document.getElementById("fname").textContent = params.get("firstName");
document.getElementById("lname").textContent = params.get("lastName");
document.getElementById("email").textContent = params.get("emailAddress");
document.getElementById("phone").textContent = params.get("mobileNumber");
document.getElementById("business").textContent = params.get("orgName");
document.getElementById("timestamp").textContent = params.get("timestamp");
