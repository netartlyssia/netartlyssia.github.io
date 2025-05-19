const mainImage = document.getElementById("mainImage");
const nextButton = document.getElementById("nextButton");
const music = document.getElementById("bgMusic");

let currentIndex = 1;
const totalImages = 12;

// Déclencher la musique si le navigateur bloque l'autoplay
window.addEventListener("click", () => {
  if (music.paused) {
    music.play();
  }
}, { once: true });

// Positions du personnage blanc pour chaque image
const characterPositions = [
  { top: '850px', left: '1500px', width: '100px', height: '850px' }, // Image 1: "Hey"
  { top: '1300px', left: '1750px', width: '100px', height: '850px' }, // Image 2: "Évite de me toucher..."
  { top: '1400px', left: '1850px', width: '100px', height: '850px' }, // Image 3: "Parce que je suis fragile"
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 4: "Ah..."
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 5: "Je suppose que c'est la fin pour moi"
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 6: "Je ne t'en veux pas..."
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 7: "Pardonne toi" (plus large car personnage commence à se fragmenter)
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 8: Particules du personnage
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 9: "Cette douce lumière..."
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 10: "C'est apaisant..."
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }, // Image 11: (sans texte visible)
  { top: '1500px', left: '2100px', width: '100px', height: '850px' }  // Image 12: (sans texte visible)
];

// Positionner le bouton sur le personnage pour la première image
updateButtonPosition();

nextButton.addEventListener("click", () => {
  if (currentIndex < totalImages) {
    currentIndex++;
    mainImage.src = `img/${currentIndex}.jpeg`;
    updateButtonPosition();
  }

  // Cacher le bouton à la dernière image
  if (currentIndex === totalImages) {
    nextButton.style.display = "none";
  }
});

// Fonction pour mettre à jour la position du bouton
function updateButtonPosition() {
  const position = characterPositions[currentIndex - 1];
  nextButton.style.top = position.top;
  nextButton.style.left = position.left;
  nextButton.style.width = position.width;
  nextButton.style.height = position.height;
  
  // Pour les dernières images où le personnage se désintègre,
  // on applique la classe spéciale pour les particules
  if (currentIndex >= 7) {
    document.getElementById("imageContainer").classList.add("particles");
  } else {
    document.getElementById("imageContainer").classList.remove("particles");
  }
}