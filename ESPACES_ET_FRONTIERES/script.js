document.addEventListener('DOMContentLoaded', function() {
    // Récupération des éléments du DOM
    const startScreen = document.getElementById('start-screen');
    const earthScreen = document.getElementById('earth-screen');
    const mapScreen = document.getElementById('map-screen');
    const voidScreen = document.getElementById('void-screen');
    const startButton = document.getElementById('start-button');
    const earthContainer = document.querySelector('.earth-container');
    const mapWrapper = document.querySelector('.map-wrapper');
    const matrixCode = document.getElementById('matrix-code');
    const modal = document.getElementById('modal');
    
    // Éléments pour la carte interactive
    const mapBackground = document.getElementById('map-background');
    const infoDisplay = document.getElementById('info-display');
    const regions = document.querySelectorAll('.region');
    const mapTitle = document.getElementById('map-title');
    const mapStatus = document.getElementById('map-status');
    const noiseOverlay = document.getElementById('noise-overlay');
    
    // Variables globales
    let activeRegion = null;
    let glitchInterval = null;
    let infoCycleInterval = null;
    
    // Données pour chaque région
    const regionData = {
        northAmerica: [
            "POPULATION: ERR0R//578.3M",
            "CLIMAT: INSTABLE-[DÉTÉRIORANT]",
            "RESSOURCES: 42% ÉPUISÉES",
            "ANOMALIE DÉTECTÉE: COORDONNÉES 37°N 119°W",
            "MENACE NIVEAU: ORANGE-442",
            "FRÉQUENCE SIGNES DE VIE: INDÉTERMINÉE"
        ],
        greenland: [
            "COUCHE DE GLACE: -28% [CRITIQUE]",
            "TEMPÉRATURE: -19°C [ANOMALIE +8°C]",
            "POPULATION: DÉCROISSANCE CRITIQUE",
            "ACTIVITÉ SOUTERRAINE: INEXPLIQUÉE",
            "RADIATIONS INHABITUELLES: CONCENTRÉES",
            "ÉMISSIONS ÉLECTROMAGNÉTIQUES: ANORMALES"
        ],
        southAmerica: [
            "SURVEILLANCE: ACTIVE [84%]",
            "BIOMASSE: CRITIQUE//DÉCROISSANTE",
            "ZONE INEXPLOITÉE: 43.2% [DÉCROISSANT]",
            "DERNIER CONTACT: 2023-07-12",
            "DÉFORESTATION: IRRÉVERSIBLE",
            "SIGNAL INCONNU CAPTÉ: FRÉQUENCE 103.7"
        ],
        europe: [
            "DENSITÉ: SURPEUPLÉE [ERR0R]",
            "EMPREINTE DIGITALE QUANTIQUE: DÉTECTÉE",
            "INFRASTRUCTURES CLÉS: COMPROMISES",
            "ACTIVITÉ SOUTERRAINE: +278% [INEXPLIQUÉE]",
            "INSTABILITÉ POLITIQUE: IMMINENTE",
            "TAUX DE SURVEILLANCE: 98.7%"
        ],
        africa: [
            "RESSOURCES INEXPLOITÉES: VALEUR INCALCULABLE",
            "TEMPÉRATURE: +3.2°C [CROISSANTE]",
            "SIGNAL ANCESTRAL: ORIGINE INCONNUE",
            "ACTIVITÉ TECTONIQUE: ANORMALE",
            "BIODIVERSITÉ: CRITIQUE [327 ESPÈCES NON CATALOGUÉES]",
            "EMPREINTE ÉNERGÉTIQUE: FLUCTUANTE"
        ],
        asia: [
            "DENSITÉ DE POPULATION: ERREUR-CRITIQUE",
            "ACTIVITÉ TECHNOLOGIQUE: SUPÉRIEURE AUX PRÉVISIONS",
            "ANOMALIES DÉTECTÉES: 27 SITES ACTIFS",
            "SCHÉMA DE COMMUNICATION: INDÉCHIFFRABLE",
            "POLLUTION: 89% [IRRÉVERSIBLE]",
            "ÉVÉNEMENT IMMINENT: PROBABILITÉ 78.3%"
        ],
        oceania: [
            "ISOLEMENT: STRATÉGIQUE [CONFIRMÉ]",
            "NIVEAU MARITIME: +33CM [ACCÉLÉRANT]",
            "ESPÈCES NON RÉPERTORIÉES: 129+",
            "SIGNAL SOUS-MARIN: ORIGINE ARTIFICIELLE?",
            "ACTIVITÉ VOLCANIQUE: IMPRÉVUE",
            "DÉFENSE: VULNÉRABILITÉ 62%"
        ]
    };
    
    // ===== NAVIGATION ENTRE LES ÉCRANS =====
    
    // Fonction pour changer d'écran
    function switchScreen(fromScreen, toScreen) {
        fromScreen.classList.remove('active');
        toScreen.classList.add('active');
    }
    
    // 1. Bouton START -> Écran de la Terre
    startButton.addEventListener('click', function() {
        switchScreen(startScreen, earthScreen);
    });
    
    // 2. Écran de la Terre -> Carte interactive
    earthContainer.addEventListener('click', function() {
        switchScreen(earthScreen, mapScreen);
        // Activer les effets de la carte interactive
        initMapInteractions();
    });
    
    // 3. Carte interactive -> Écran final (code matrix)
    mapWrapper.addEventListener('click', function() {
        switchScreen(mapScreen, voidScreen);
        // Arrêter les intervalles de la carte
        if (glitchInterval) clearInterval(glitchInterval);
        if (infoCycleInterval) clearInterval(infoCycleInterval);
        // Démarrer l'effet matrix
        initMatrixEffect();
        // Afficher la modal après un court délai
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 1000);
    });
    
    // ===== ÉCRAN 3: CARTE INTERACTIVE =====
    
    function initMapInteractions() {
        // Gestionnaire d'événements pour le survol des régions
        regions.forEach(region => {
            region.addEventListener('mouseenter', function() {
                const regionName = this.getAttribute('data-region');
                activateRegion(regionName, this);
            });
            
            region.addEventListener('mouseleave', function() {
                deactivateRegion();
            });
        });
    }
    
    // Fonction pour activer une région
    function activateRegion(regionName, element) {
        // Nettoyer les intervalles précédents si existants
        if (glitchInterval) clearInterval(glitchInterval);
        if (infoCycleInterval) clearInterval(infoCycleInterval);
        
        // Mettre à jour l'état actif
        activeRegion = regionName;
        
        // Activer les classes CSS
        regions.forEach(r => r.classList.remove('active', 'pulse'));
        element.classList.add('active');
        
        // Mettre à jour le statut
        mapStatus.textContent = "ANALYSE EN COURS // DONNÉES INSTABLES // INTERFÉRENCE DÉTECTÉE";
        mapStatus.classList.add('pulse');
        
        // Déclencher le premier affichage d'informations
        displayRandomInfo(regionName);
        
        // Créer l'intervalle pour l'effet de glitch
        glitchInterval = setInterval(function() {
            // Effet de bruit statique aléatoire
            noiseOverlay.classList.toggle('active');
            
            // Effet de glitch sur le titre et la région
            mapTitle.classList.toggle('glitch');
            element.classList.toggle('pulse');
            
            // Effet de glitch sur les infos
            infoDisplay.classList.toggle('glitch');
            
            // Changer les informations affichées
            displayRandomInfo(regionName);
        }, 2000 + Math.random() * 1000);
    }
    
    // Fonction pour désactiver la région
    function deactivateRegion() {
        // Nettoyer les intervalles
        if (glitchInterval) clearInterval(glitchInterval);
        if (infoCycleInterval) clearInterval(infoCycleInterval);
        
        // Réinitialiser l'état
        activeRegion = null;
        
        // Désactiver les classes CSS
        regions.forEach(r => r.classList.remove('active', 'pulse'));
        mapTitle.classList.remove('glitch');
        infoDisplay.classList.remove('active', 'glitch');
        noiseOverlay.classList.remove('active');
        
        // Réinitialiser le statut
        mapStatus.textContent = "EN ATTENTE // SURVOLEZ UNE RÉGION POUR SCANNER // CLIQUEZ N'IMPORTE OÙ POUR CONTINUER";
        mapStatus.classList.remove('pulse');
    }
    
    // Fonction pour afficher des informations aléatoires
    function displayRandomInfo(regionName) {
        if (!regionData[regionName]) return;
        
        const data = regionData[regionName];
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomInfo = data[randomIndex];
        
        // Positionner aléatoirement sur la carte
        const wrapperRect = mapWrapper.getBoundingClientRect();
        
        const randomX = 20 + Math.random() * (wrapperRect.width - 40); // Marge de 20px des bords
        const randomY = 20 + Math.random() * (wrapperRect.height - 40); // Marge de 20px des bords
        
        // Mettre à jour le contenu et la position
        infoDisplay.textContent = randomInfo;
        infoDisplay.style.left = `${randomX}px`;
        infoDisplay.style.top = `${randomY}px`;
        infoDisplay.classList.add('active');
    }
    
    // ===== ÉCRAN 4: EFFET CODE MATRIX =====
    
    function initMatrixEffect() {
        // Créer l'effet de code matrix
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,./<>?";
        const columnCount = Math.floor(window.innerWidth / 20); // Environ 20px par colonne
        
        // Créer les colonnes de caractères
        for (let i = 0; i < columnCount; i++) {
            createMatrixColumn(i, columnCount, chars);
        }
        
        // Empêcher le retour en arrière pour le "point de non-retour"
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', function() {
            window.history.pushState(null, '', window.location.href);
        });
    }
    
    function createMatrixColumn(index, totalColumns, chars) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.position = 'absolute';
        column.style.left = `${(index / totalColumns) * 100}%`;
        column.style.top = `-${Math.random() * 1000}px`; // Position initiale aléatoire
        column.style.color = '#0f0';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'Courier New, monospace';
        column.style.whiteSpace = 'nowrap';
        column.style.textShadow = '0 0 5px #0f0';
        
        // Vitesse aléatoire
        const speed = 50 + Math.random() * 100;
        
        // Créer le contenu initial
        let content = '';
        const length = 10 + Math.floor(Math.random() * 15); // Longueur aléatoire entre 10 et 25
        
        for (let i = 0; i < length; i++) {
            content += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        column.textContent = content;
        matrixCode.appendChild(column);
        
        // Animer la colonne
        let position = parseInt(column.style.top);
        
        function moveColumn() {
            position += 20;
            column.style.top = `${position}px`;
            
            // Si elle sort de l'écran, la replacer en haut
            if (position > window.innerHeight) {
                position = -500 - Math.random() * 500;
                column.style.top = `${position}px`;
                
                // Changer parfois le contenu
                if (Math.random() > 0.5) {
                    let newContent = '';
                    for (let i = 0; i < length; i++) {
                        newContent += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    column.textContent = newContent;
                }
            }
            
            // Changer parfois un caractère
            if (Math.random() > 0.9) {
                let content = column.textContent;
                const randomIndex = Math.floor(Math.random() * content.length);
                const randomChar = chars.charAt(Math.floor(Math.random() * chars.length));
                content = content.substring(0, randomIndex) + randomChar + content.substring(randomIndex + 1);
                column.textContent = content;
            }
            
            requestAnimationFrame(moveColumn);
        }
        
        setTimeout(() => {
            moveColumn();
        }, Math.random() * 2000); // Démarrage décalé
    }
});