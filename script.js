// Game state
let gameState = {
    tokens: 50, // Start with some tokens for testing
    circulets: [],
    ownedCirculets: new Set(),
    currentPack: null,
    currentCirculet: null,
    packOpened: false
};

// Circulets data
const circuletsData = {
    "emoji": {
        "common": [
            { id: "happy", name: "Happy Face", image: "src/assets/circulets/emoji-pack/common/happy.svg" },
            { id: "sad", name: "Sad Face", image: "src/assets/circulets/emoji-pack/common/sad.svg" },
            { id: "neutral", name: "Neutral Face", image: "src/assets/circulets/emoji-pack/common/neutral.svg" }
        ],
        "uncommon": [
            { id: "wink", name: "Winking Face", image: "src/assets/circulets/emoji-pack/uncommon/wink.svg" },
            { id: "surprised", name: "Surprised Face", image: "src/assets/circulets/emoji-pack/uncommon/surprised.svg" }
        ],
        "rare": [
            { id: "cool", name: "Cool Face", image: "src/assets/circulets/emoji-pack/rare/cool.svg" },
            { id: "angry", name: "Angry Face", image: "src/assets/circulets/emoji-pack/rare/angry.svg" }
        ],
        "epic": [
            { id: "love", name: "Love Face", image: "src/assets/circulets/emoji-pack/epic/love.svg" }
        ],
        "legendary": [
            { id: "rainbow", name: "Rainbow Face", image: "src/assets/circulets/emoji-pack/legendary/rainbow.svg" }
        ]
    },
    "food": {
        "common": [
            { id: "apple", name: "Red Apple", image: "src/assets/circulets/food-pack/common/apple.svg" },
            { id: "banana", name: "Banana", image: "src/assets/circulets/food-pack/common/banana.svg" },
            { id: "orange", name: "Orange", image: "src/assets/circulets/food-pack/common/orange.svg" }
        ],
        "uncommon": [
            { id: "pizza", name: "Pizza Slice", image: "src/assets/circulets/food-pack/uncommon/pizza.svg" },
            { id: "burger", name: "Burger", image: "src/assets/circulets/food-pack/uncommon/burger.svg" }
        ],
        "rare": [
            { id: "cake", name: "Birthday Cake", image: "src/assets/circulets/food-pack/rare/cake.svg" },
            { id: "icecream", name: "Ice Cream", image: "src/assets/circulets/food-pack/rare/icecream.svg" }
        ],
        "epic": [
            { id: "donut", name: "Sprinkled Donut", image: "src/assets/circulets/food-pack/epic/donut.svg" }
        ],
        "legendary": [
            { id: "golden-apple", name: "Golden Apple", image: "src/assets/circulets/food-pack/legendary/golden-apple.svg" }
        ]
    }
};

// Update UI
function updateUI() {
    document.getElementById('token-count').textContent = gameState.tokens;
    document.getElementById('circulets-count').textContent = gameState.ownedCirculets.size;
}

// Show page
function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageName).classList.add('active');
    event.target.closest('.nav-item').classList.add('active');
}

// Get random circulet (equal chances for testing)
function getRandomCirculet(packType) {
    const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];
    const circuletsOfRarity = circuletsData[packType][randomRarity];
    
    if (circuletsOfRarity && circuletsOfRarity.length > 0) {
        const randomCirculet = circuletsOfRarity[Math.floor(Math.random() * circuletsOfRarity.length)];
        return { ...randomCirculet, rarity: randomRarity };
    }
    
    // Fallback to common
    const commonCirculets = circuletsData[packType]['common'];
    const randomCirculet = commonCirculets[Math.floor(Math.random() * commonCirculets.length)];
    return { ...randomCirculet, rarity: 'common' };
}

// Create enhanced confetti like Blooket/Trianglet
function createConfetti(rarity) {
    const colors = {
        'uncommon': ['#2ecc71', '#27ae60', '#16a085'],
        'rare': ['#3498db', '#2980b9', '#1abc9c'], 
        'epic': ['#9b59b6', '#8e44ad', '#e74c3c'],
        'legendary': ['#f1c40f', '#f39c12', '#e67e22'],
        'chroma': ['#74b9ff', '#0984e3', '#6c5ce7']
    };
    
    const shapes = ['square', 'circle', 'triangle', 'rectangle'];
    const confettiColors = colors[rarity] || ['#95a5a6'];
    const confettiCount = rarity === 'legendary' ? 80 : rarity === 'epic' ? 60 : 40;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        
        confetti.className = `confetti confetti-${shape}`;
        confetti.style.backgroundColor = color;
        confetti.style.color = color; // For triangles
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '1002';
        
        // Start from different positions based on rarity
        let startX, startY, directionX, directionY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        switch (rarity) {
            case 'uncommon': // Green from top
                startX = centerX + (Math.random() - 0.5) * 300;
                startY = -20;
                directionX = (Math.random() - 0.5) * 6;
                directionY = Math.random() * 4 + 3;
                break;
            case 'rare': // Blue from bottom corners
                const isLeft = Math.random() < 0.5;
                startX = isLeft ? 0 : window.innerWidth;
                startY = window.innerHeight;
                directionX = isLeft ? Math.random() * 6 + 2 : -(Math.random() * 6 + 2);
                directionY = -(Math.random() * 8 + 5);
                break;
            case 'epic': // Purple from left and right sides
                const isLeftSide = Math.random() < 0.5;
                startX = isLeftSide ? -20 : window.innerWidth + 20;
                startY = centerY + (Math.random() - 0.5) * 200;
                directionX = isLeftSide ? Math.random() * 8 + 4 : -(Math.random() * 8 + 4);
                directionY = (Math.random() - 0.5) * 6;
                break;
            case 'legendary': // Gold from all edges
                const edge = Math.floor(Math.random() * 4);
                switch (edge) {
                    case 0: // Top
                        startX = Math.random() * window.innerWidth;
                        startY = -20;
                        directionX = (Math.random() - 0.5) * 4;
                        directionY = Math.random() * 6 + 4;
                        break;
                    case 1: // Right
                        startX = window.innerWidth + 20;
                        startY = Math.random() * window.innerHeight;
                        directionX = -(Math.random() * 6 + 4);
                        directionY = (Math.random() - 0.5) * 4;
                        break;
                    case 2: // Bottom
                        startX = Math.random() * window.innerWidth;
                        startY = window.innerHeight + 20;
                        directionX = (Math.random() - 0.5) * 4;
                        directionY = -(Math.random() * 6 + 4);
                        break;
                    case 3: // Left
                        startX = -20;
                        startY = Math.random() * window.innerHeight;
                        directionX = Math.random() * 6 + 4;
                        directionY = (Math.random() - 0.5) * 4;
                        break;
                }
                break;
            case 'chroma': // Light blue from all corners
                const corner = Math.floor(Math.random() * 4);
                switch (corner) {
                    case 0: // Top-left
                        startX = 0;
                        startY = 0;
                        directionX = Math.random() * 8 + 3;
                        directionY = Math.random() * 8 + 3;
                        break;
                    case 1: // Top-right
                        startX = window.innerWidth;
                        startY = 0;
                        directionX = -(Math.random() * 8 + 3);
                        directionY = Math.random() * 8 + 3;
                        break;
                    case 2: // Bottom-left
                        startX = 0;
                        startY = window.innerHeight;
                        directionX = Math.random() * 8 + 3;
                        directionY = -(Math.random() * 8 + 3);
                        break;
                    case 3: // Bottom-right
                        startX = window.innerWidth;
                        startY = window.innerHeight;
                        directionX = -(Math.random() * 8 + 3);
                        directionY = -(Math.random() * 8 + 3);
                        break;
                }
                break;
        }
        
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        
        document.body.appendChild(confetti);
        
        // Animate confetti with physics
        let x = startX;
        let y = startY;
        let velX = directionX;
        let velY = directionY;
        let gravity = 0.15;
        let friction = 0.99;
        let rotation = Math.random() * 360;
        let rotationSpeed = (Math.random() - 0.5) * 20;
        let life = 150;
        
        function animateConfetti() {
            x += velX;
            y += velY;
            velY += gravity;
            velX *= friction;
            rotation += rotationSpeed;
            life--;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = Math.max(0, life / 150);
            
            if (life > 0 && y < window.innerHeight + 100) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        setTimeout(() => animateConfetti(), i * 20);
    }
}

// Open pack - show full screen gradient
function openPack(packType) {
    if (gameState.tokens < 25) {
        alert('Not enough tokens!');
        return;
    }
    
    gameState.tokens -= 25;
    updateUI();
    
    gameState.currentPack = packType;
    gameState.currentCirculet = getRandomCirculet(packType);
    gameState.ownedCirculets.add(gameState.currentCirculet.id);
    gameState.packOpened = false;
    
    // Set up pack images
    const packImageSrc = `src/assets/packs/${packType}-pack.svg`;
    document.getElementById('capsule-top-image').src = packImageSrc;
    document.getElementById('capsule-bottom-image').src = packImageSrc;
    
    // Set up circulet
    document.getElementById('circulet-image').src = gameState.currentCirculet.image;
    
    // Show full screen with appropriate gradient
    const screen = document.getElementById('pack-opening-screen');
    screen.className = `pack-opening-screen show ${packType}-pack`;
    
    // Reset capsule state
    const capsule = document.getElementById('single-pack-capsule');
    const reveal = document.getElementById('circulet-reveal');
    capsule.className = 'single-pack-capsule';
    reveal.className = 'circulet-reveal';
}

// Open capsule when clicked
function openCapsule() {
    if (gameState.packOpened) return;
    
    gameState.packOpened = true;
    
    const capsule = document.getElementById('single-pack-capsule');
    const reveal = document.getElementById('circulet-reveal');
    
    // Start opening animation
    capsule.classList.add('opening');
    
    setTimeout(() => {
        // Fade out capsule
        capsule.classList.add('fading');
    }, 1000);
    
    setTimeout(() => {
        // Show circulet
        reveal.classList.add('show');
        
        // Create confetti if not common
        if (gameState.currentCirculet.rarity !== 'common') {
            createConfetti(gameState.currentCirculet.rarity);
        }
    }, 1500);
}

// Return to packs page when circulet is clicked
function returnToPacks() {
    if (!gameState.packOpened) return;
    
    const screen = document.getElementById('pack-opening-screen');
    screen.classList.remove('show');
    
    // Reset state
    gameState.currentPack = null;
    gameState.currentCirculet = null;
    gameState.packOpened = false;
    
    updateUI();
}

// Initialize
updateUI();