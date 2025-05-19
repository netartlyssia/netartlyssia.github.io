let clicks = 0;
const revealButton = document.getElementById("revealButton");

const sections = {
  artiste: document.getElementById("artiste"),
  oeuvre: document.getElementById("oeuvre"),
  spectateur: document.getElementById("spectateur"),
  error: document.getElementById("error404")
};

function showSection(name) {
  Object.values(sections).forEach(sec => sec.classList.add("hidden"));
  sections[name].classList.remove("hidden");
}

function startAnimation() {
  const creation = document.getElementById("creation");
  // Nettoyer les points existants
  creation.innerHTML = '';
  
  for (let i = 0; i < 20; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.style.left = Math.random() * 100 + "%";
    dot.style.top = Math.random() * 100 + "px";
    creation.appendChild(dot);
  }

  setTimeout(() => {
    showSection("oeuvre");
    animateGlitchImages();
    setTimeout(() => showSection("spectateur"), 3000);
  }, 3000);
}

function animateGlitchImages() {
  const images = document.querySelectorAll("#oeuvreDisplay img");
  let currentIndex = 0;
  
  // Activer la première image
  images[0].classList.add("active");
  
  setInterval(() => {
    // Désactiver toutes les images
    images.forEach(img => img.classList.remove("active"));
    
    // Choisir aléatoirement un index différent du précédent
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * images.length);
    } while (newIndex === currentIndex && images.length > 1);
    
    currentIndex = newIndex;
    images[currentIndex].classList.add("active");
  }, 400);
}

revealButton.addEventListener("click", () => {
  clicks++;
  if (clicks >= 5) {
    showSection("error");
  } else {
    const phrases = [
      "Regarde bien.",
      "C'est sûrement la dernière fois que tu me vois",
      "Ce site est-il réel ?",
      "Qu'est-ce qu'est réel ?",
      "Tu cliques encore ?",
      "Suis-je réel ?"
    ];
    revealButton.textContent = phrases[clicks % phrases.length];
  }
});

window.onload = () => {
  showSection("artiste");
  startAnimation();
};