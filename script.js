const app = document.getElementById("app");

const pages = {
  home: `
    <section class="fade-in">
      <h2>Welcome to Crazy Academy</h2>
      <p>Learn how to deploy the best WhatsApp bots with video tutorials, ready-to-use files, and a modern interface.</p>
      <button onclick="loadPage('bots')">View Bots</button>
    </section>
  `,
  bots: `
    <section class="fade-in">
      <h2>Available Bots</h2>
      <div id="bot-list">Loading...</div>
    </section>
  `,
  tools: `
    <section class="fade-in">
      <h2>Tools</h2>
      <p>Coming soon: .env file generator, automatic Termux configurations, and more.</p>
    </section>
  `,
  support: `
    <section class="fade-in">
      <h2>Support / FAQ</h2>
      <ul>
        <li><strong>How to deploy a bot?</strong> Click "Bots" and follow the guide.</li>
        <li><strong>Got an error?</strong> Check our FAQ or join WhatsApp support.</li>
        <li><strong>Need help?</strong> Join our <a href="https://chat.whatsapp.com/" target="_blank">WhatsApp group</a>.</li>
      </ul>
    </section>
  `
};

function loadPage(page) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.dataset.page === page) link.classList.add("active");
  });

  app.innerHTML = pages[page] || "<h2>Page not found</h2>";
  if (page === "bots") loadBots();
}

function loadBots() {
  fetch("bots.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("bot-list");
      container.innerHTML = data.map(bot => `
        <div class="bot-card">
          <h3>${bot.name}</h3>
          <p>${bot.desc}</p>
          <p><strong>Difficulty:</strong> ${bot.level}</p>
          <p><strong>Deployment:</strong> ${bot.deployment}</p>
          <button onclick="goToTutorial('${encodeURIComponent(bot.name)}')">View Tutorial</button>
        </div>
      `).join('');
    })
    .catch(() => {
      document.getElementById("bot-list").innerHTML = "<p>Failed to load bots.</p>";
    });
}

function goToTutorial(botName) {
  // Redirect to tutorial.html with the bot name in the query string
  window.location.href = `tutorial.html?bot=${botName}`;
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = e.target.dataset.page;
    loadPage(page);
  });
});

loadPage("home");
