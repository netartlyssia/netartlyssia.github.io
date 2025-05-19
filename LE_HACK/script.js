window.onload = () => {
  // Récupération des éléments du DOM
  const cadeau = document.getElementById("cadeau");
  const etoile = document.getElementById("etoile");
  const etoileClone = document.getElementById("etoileClone");
  const scene1 = document.getElementById("scene1");
  const scene2 = document.getElementById("scene2");
  const scene3 = document.getElementById("scene3");
  const scene4 = document.getElementById("scene4");
  const bugText = document.getElementById("bugText");
  const starsContainer = document.getElementById("starsContainer");
  const errorsContainer = document.getElementById("errorsContainer");
  const restart = document.getElementById("restart");
  const glitchSound = document.getElementById("glitchSound");
  const playButton = document.getElementById("playButton");
  
  // Vérifier si l'audio est bien chargé
  let audioLoaded = false;
  glitchSound.addEventListener('canplaythrough', () => {
    audioLoaded = true;
    console.log("Son préchargé et prêt à être joué");
  });
  
  // Fonction pour jouer le son avec fallback
  function playGlitchSound() {
    // Réinitialiser le son
    glitchSound.currentTime = 0;
    
    // Tentative de lecture du son
    const playPromise = glitchSound.play();
    
    // Gérer les cas d'erreur
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Son joué avec succès");
        })
        .catch(error => {
          console.warn("Échec de lecture audio:", error.message);
          // Afficher brièvement le bouton pour permettre une interaction directe
          playButton.style.display = "block";
          setTimeout(() => {
            playButton.style.display = "none";
          }, 100);
        });
    }
  }
  
  // Transition de la scène 1 à la scène 2
  cadeau.addEventListener("click", () => {
    scene1.classList.add("hidden");
    scene2.classList.remove("hidden");
  });
  
  // Bouton de secours pour jouer le son directement
  playButton.addEventListener("click", () => {
    glitchSound.play();
  });
  
  // Transition de la scène 2 à la scène 3 avec effet sonore
  etoile.addEventListener("click", () => {
    // Tentative de lecture du son (maintenant directement dans l'événement click)
    playGlitchSound();
    
    // Transition vers la scène 3
    scene2.classList.add("hidden");
    scene3.classList.remove("hidden");
    
    // Premier changement après délai
    setTimeout(() => {
      bugText.textContent = "Oh non.";
      
      // Ajout de l'effet glitch sur l'étoile
      etoileClone.classList.add("glitch");
      
      // Création d'étoiles aléatoires
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("img");
        star.src = "img/etoile.png";
        star.classList.add("star");
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = Math.random() * window.innerHeight + "px";
        starsContainer.appendChild(star);
      }
      
      // Création des images d'erreur
      for (let i = 0; i < 30; i++) {
        const err = document.createElement("img");
        err.src = "img/error404.png";
        err.classList.add("error-img");
        err.style.left = Math.random() * window.innerWidth + "px";
        err.style.top = Math.random() * window.innerHeight + "px";
        errorsContainer.appendChild(err);
      }
      
      // Transition finale vers la scène 4
      setTimeout(() => {
        scene3.classList.add("hidden");
        scene4.classList.remove("hidden");
      }, 4000);
    }, 2000);
  });
  
  // Bouton de redémarrage
  restart.addEventListener("click", () => {
    // Nettoyage
    starsContainer.innerHTML = "";
    errorsContainer.innerHTML = "";
    bugText.textContent = "Tu devrais la jeter...";
    etoileClone.classList.remove("glitch");
    
    // Retour à la scène 1
    scene4.classList.add("hidden");
    scene1.classList.remove("hidden");
  });
  
  // Préchargement du son pour une meilleure performance
  try {
    glitchSound.load();
  } catch (e) {
    console.warn("Impossible de précharger le son:", e);
  }
};