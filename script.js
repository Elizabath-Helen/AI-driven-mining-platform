// ===============================
// FEATURE 1: REQUEST DEMO MODAL
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const demoBtn = document.querySelector(".demobtn");

  demoBtn.addEventListener("click", openDemoModal);
});

function openDemoModal() {
  // Prevent multiple modals
  if (document.querySelector(".demo-modal-overlay")) return;

  const overlay = document.createElement("div");
  overlay.className = "demo-modal-overlay";

  overlay.innerHTML = `
    <div class="demo-modal">
      <span class="close-demo">&times;</span>
      <h2>Request a Demo</h2>
      <p>See MineOps Pro in action</p>
      <input type="email" placeholder="Enter your email" />
      <button>Submit</button>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close modal
  overlay.querySelector(".close-demo").onclick = () => overlay.remove();

  // Submit handler
  overlay.querySelector("button").onclick = () => {
    alert("Demo request submitted!");
    overlay.remove();
  };
}




//2 Animated Stats Counter

const counters = document.querySelectorAll(".counter");

counters.forEach(function(counter) {

  // Store final value (example: 50+, 99.9%)
  const finalValue = counter.innerText;

  // Extract number only
  let target = parseFloat(finalValue);

  let current = 0;

  // Increase value little by little
  const interval = setInterval(function() {

    current += target / 50; // speed control

    if (current >= target) {
      counter.innerText = finalValue; // stop at final
      clearInterval(interval);
    } else {
      counter.innerText = formatValue(current, finalValue);
    }

  }, 30);
});

//  Format number based on type
function formatValue(value, original) {
  if (original.includes("%")) {
    return value.toFixed(1) + "%";
  }
  if (original.includes("M")) {
    return Math.floor(value) + "M+";
  }
  return Math.floor(value) + "+";
}




// ===============================
// 3 SITE / ASSET REGISTRATION
// ===============================

// ===============================
// SITE / ASSET REGISTRATION + LIVE STATUS
// ===============================

// Global sites array (IMPORTANT)
let sites = JSON.parse(localStorage.getItem("registeredSites")) || [];

// Select form
const assetForm = document.getElementById("assetForm");

if (assetForm) {
  const siteList = document.getElementById("siteList");
  const notesInput = document.getElementById("notes");
  const charCount = document.getElementById("charCount");

  // Show already registered sites
  displaySites();

  // Character count
  notesInput.addEventListener("input", function () {
    charCount.innerText = notesInput.value.length + " / 100";
  });

  // Form submit
  assetForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const siteName = document.getElementById("siteName").value.trim();
    const location = document.getElementById("location").value.trim();
    const equipment = document.getElementById("equipment").value.trim();
    const notes = notesInput.value.trim();

    if (siteName === "" || location === "" || equipment === "") {
      alert("Please fill all required fields");
      return;
    }

    const formattedSiteName =
      siteName.charAt(0).toUpperCase() + siteName.slice(1);

    const site = {
      siteName: formattedSiteName,
      location: location,
      equipment: equipment,
      notes: notes,
      status: "Active"
    };

    sites.push(site);
    localStorage.setItem("registeredSites", JSON.stringify(sites));

    displaySites();

    assetForm.reset();
    charCount.innerText = "0 / 100";
  });
}

// ===============================
// DISPLAY REGISTERED SITES
// ===============================

function displaySites() {
  const siteList = document.getElementById("siteList");
  if (!siteList) return;

  siteList.innerHTML = "";

  sites.forEach(function (site, index) {

    // Backward compatibility
    if (!site.status) {
      site.status = "Active";
    }

    siteList.innerHTML += `
      <div class="site-card">
        <strong>${site.siteName}</strong><br>
        Location: ${site.location}<br>
        Equipment: ${site.equipment}<br>

        <p class="status ${site.status.toLowerCase()}">
          Status: ${site.status}
        </p>

        <button onclick="changeStatus(${index})">
          Change Status
        </button>
      </div>
    `;
  });
}

// ===============================
// LIVE STATUS DASHBOARD
// ===============================

function changeStatus(index) {
  if (sites[index].status === "Active") {
    sites[index].status = "Maintenance";
  } else if (sites[index].status === "Maintenance") {
    sites[index].status = "Alert";
  } else {
    sites[index].status = "Active";
  }

  localStorage.setItem("registeredSites", JSON.stringify(sites));
  displaySites();
}

// ===============================
// LOGIN REDIRECT
// ===============================

function goToRegister() {
  window.location.href = "register.html";
}
