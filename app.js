const smes = [
  {
    id: 1,
    name: "SecureNet Solutions",
    category: "Cybersecurity",
    description: "Enterprise cybersecurity and risk management specialists.",
    services: "Pen Testing, Firewall Setup, SOC Monitoring",
    leads: 0
  },
  {
    id: 2,
    name: "CableTech Installations",
    category: "Network Cabling",
    description: "Structured cabling and infrastructure installation experts.",
    services: "LAN Cabling, Server Rooms, Fiber Installation",
    leads: 0
  },
  {
    id: 3,
    name: "AI Nexus Africa",
    category: "AI Services",
    description: "AI and GenAI implementation for SMEs.",
    services: "Chatbots, AI Automation, Data Intelligence",
    leads: 0
  },
  {
    id: 4,
    name: "CloudScale Systems",
    category: "Cloud Solutions",
    description: "Cloud migration and hybrid infrastructure specialists.",
    services: "Azure Migration, AWS Setup, DevOps",
    leads: 0
  }
];

let selectedSME = null;
let leads = [];

function renderSMEs() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const container = document.getElementById("smeList");
  container.innerHTML = "";

  smes
    .filter(sme =>
      (sme.name.toLowerCase().includes(search) ||
       sme.category.toLowerCase().includes(search)) &&
      (category === "" || sme.category === category)
    )
    .forEach(sme => {
      container.innerHTML += `
        <div class="col-md-4 mb-3">
          <div class="card p-3">
            <h5>${sme.name}</h5>
            <p>${sme.category}</p>
            <button class="btn btn-dark w-100" onclick="openSME(${sme.id})">View Profile</button>
          </div>
        </div>
      `;
    });
}

function openSME(id) {
  selectedSME = smes.find(s => s.id === id);
  document.getElementById("modalTitle").innerText = selectedSME.name;
  document.getElementById("modalDescription").innerText = selectedSME.description;
  document.getElementById("modalServices").innerText = selectedSME.services;
  new bootstrap.Modal(document.getElementById("smeModal")).show();
}

function submitLead() {
  const company = document.getElementById("leadCompany").value;
  const email = document.getElementById("leadEmail").value;
  const message = document.getElementById("leadMessage").value;

  if (!company || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  leads.push({
    sme: selectedSME.name,
    company,
    email,
    message
  });

  selectedSME.leads++;
  alert("Inquiry submitted successfully!");
  renderDashboard();
}

function showMarketplace() {
  document.getElementById("marketplaceSection").classList.remove("d-none");
  document.getElementById("dashboardSection").classList.add("d-none");
}

function showDashboard() {
  document.getElementById("marketplaceSection").classList.add("d-none");
  document.getElementById("dashboardSection").classList.remove("d-none");
  renderDashboard();
}

function renderDashboard() {
  document.getElementById("totalSMEs").innerText = smes.length;
  document.getElementById("totalLeads").innerText = leads.length;

  const top = smes.reduce((prev, current) => (prev.leads > current.leads) ? prev : current);
  document.getElementById("topSME").innerText = top.name;

  const table = document.getElementById("leadTable");
  table.innerHTML = "";
  leads.forEach(l => {
    table.innerHTML += `
      <tr>
        <td>${l.sme}</td>
        <td>${l.company}</td>
        <td>${l.email}</td>
        <td>${l.message}</td>
      </tr>
    `;
  });
}

renderSMEs();
