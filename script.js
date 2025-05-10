const app = document.getElementById("app");

const pages = {
  home: `
    <section class="fade-in">
      <h2>Welcome to Crazy Academy</h2>
      <p>Apprenez à déployer les meilleurs bots WhatsApp du moment avec des tutos vidéo, des fichiers prêts à l’emploi et une interface moderne.</p>
      <button onclick="loadPage('bots')">Voir les Bots</button>
    </section>
  `,
  bots: `
    <section class="fade-in">
      <h2>Bots Disponibles</h2>
      <div id="bot-list">Chargement...</div>
    </section>
  `,
  tools: `
    <section class="fade-in">
      <h2>Outils</h2>
      <p>Bientôt : générateur de fichiers .env, configurations automatiques Termux et plus.</p>
    </section>
  `,
  support: `
    <section class="fade-in">
      <h2>Support / FAQ</h2>
      <ul>
        <li><strong>Déployer un bot ?</strong> Cliquez sur "Bots" et suivez le guide.</li>
        <li><strong>Une erreur ?</strong> Consultez notre FAQ ou rejoignez le support WhatsApp.</li>
        <li><strong>Besoin d’aide ?</strong> Rejoignez notre <a href="https://chat.whatsapp.com/" target="_blank">groupe WhatsApp</a>.</li>
      </ul>
    </section>
  `
};

function loadPage(page) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.dataset.page === page) link.classList.add("active");
  });

  app.innerHTML = pages[page] || "<h2>Page introuvable</h2>";
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
          <p><strong>Difficulté :</strong> ${bot.level}</p>
          <p><strong>Déploiement :</strong> ${bot.deployment}</p>
          <button onclick="showVideo('${bot.video}')">Voir Tutoriel</button>
          <button onclick="showGuide(\`${bot.guide.replace(/\n/g, '<br>')}\`)">Voir Instructions</button>
        </div>
      `).join('');
    })
    .catch(() => {
      document.getElementById("bot-list").innerHTML = "<p>Impossible de charger les bots.</p>";
    });
}

function showVideo(videoUrl) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
      <iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  document.body.appendChild(modal);
}

function showGuide(guide) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="this.parentElement.parentElement.remove()">×</span>
      <h3>Instructions</h3>
      <p>${guide}</p>
    </div>
  `;
  document.body.appendChild(modal);
}

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const page = e.target.dataset.page;
    loadPage(page);
  });
});

loadPage("home");
