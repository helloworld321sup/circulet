// Game state
let gameState = {
    tokens: 50, // Start with some tokens for testing
    circulets: [],
    ownedCirculets: new Set()
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

// Create confetti
function createConfetti(rarity, circuletElement) {
    const colors = {
        'uncommon': '#2ecc71',
        'rare': '#3498db', 
        'epic': '#9b59b6',
        'legendary': '#f1c40f',
        'chroma': '#74b9ff'
    };
    
    const confettiCount = rarity === 'epic' ? 15 : 20;
    const color = colors[rarity] || '#95a5a6';
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = color;
        confetti.style.position = 'absolute';
        confetti.style.zIndex = '1001';
        
        const rect = circuletElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        let startX, startY, directionX, directionY;
        
        switch (rarity) {
            case 'uncommon': // Green from top
                startX = centerX + (Math.random() - 0.5) * 100;
                startY = centerY - 100;
                directionX = (Math.random() - 0.5) * 4;
                directionY = Math.random() * 3 + 2;
                break;
            case 'rare': // Blue from bottom corners
                const isLeft = Math.random() < 0.5;
                startX = isLeft ? centerX - 80 : centerX + 80;
                startY = centerY + 80;
                directionX = isLeft ? Math.random() * 3 + 1 : -(Math.random() * 3 + 1);
                directionY = -(Math.random() * 4 + 3);
                break;
            case 'epic': // Purple from left and right sides with gravity
                const isLeftSide = Math.random() < 0.5;
                startX = isLeftSide ? centerX - 100 : centerX + 100;
                startY = centerY + (Math.random() - 0.5) * 60;
                directionX = isLeftSide ? Math.random() * 4 + 2 : -(Math.random() * 4 + 2);
                directionY = (Math.random() - 0.5) * 4;
                break;
            case 'legendary': // Gold from top
                startX = centerX + (Math.random() - 0.5) * 120;
                startY = centerY - 120;
                directionX = (Math.random() - 0.5) * 3;
                directionY = Math.random() * 4 + 3;
                break;
            case 'chroma': // Light blue from all corners
                const corner = Math.floor(Math.random() * 4);
                switch (corner) {
                    case 0: // Top-left
                        startX = centerX - 100;
                        startY = centerY - 100;
                        directionX = Math.random() * 3 + 1;
                        directionY = Math.random() * 3 + 1;
                        break;
                    case 1: // Top-right
                        startX = centerX + 100;
                        startY = centerY - 100;
                        directionX = -(Math.random() * 3 + 1);
                        directionY = Math.random() * 3 + 1;
                        break;
                    case 2: // Bottom-left
                        startX = centerX - 100;
                        startY = centerY + 100;
                        directionX = Math.random() * 3 + 1;
                        directionY = -(Math.random() * 3 + 1);
                        break;
                    case 3: // Bottom-right
                        startX = centerX + 100;
                        startY = centerY + 100;
                        directionX = -(Math.random() * 3 + 1);
                        directionY = -(Math.random() * 3 + 1);
                        break;
                }
                break;
        }
        
        confetti.style.left = startX + 'px';
        confetti.style.top = startY + 'px';
        
        document.body.appendChild(confetti);
        
        // Animate confetti
        let x = startX;
        let y = startY;
        let velX = directionX;
        let velY = directionY;
        let gravity = rarity === 'epic' ? 0.1 : 0.05;
        let life = 100;
        
        function animateConfetti() {
            x += velX;
            y += velY;
            velY += gravity;
            life--;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.opacity = life / 100;
            
            if (life > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confetti.remove();
            }
        }
        
        setTimeout(() => animateConfetti(), i * 50);
    }
}

// Open pack with dramatic animation sequence
function openPack(packType) {
    if (gameState.tokens < 25) {
        alert('Not enough tokens!');
        return;
    }
    
    gameState.tokens -= 25;
    updateUI();
    
    const circulet = getRandomCirculet(packType);
    gameState.ownedCirculets.add(circulet.id);
    
    // Set up pack images
    const packImageSrc = `src/assets/packs/${packType}-pack.svg`;
    document.getElementById('pack-top-image').src = packImageSrc;
    document.getElementById('pack-bottom-image').src = packImageSrc;
    
    // Set up circulet
    document.getElementById('circulet-image').src = circulet.image;
    document.getElementById('circulet-name').textContent = circulet.name;
    document.getElementById('circulet-rarity').textContent = circulet.rarity.charAt(0).toUpperCase() + circulet.rarity.slice(1);
    document.getElementById('circulet-rarity').className = `circulet-rarity rarity-${circulet.rarity}`;
    
    // Show modal and start animation sequence
    const modal = document.getElementById('reveal-modal');
    const packCapsule = document.getElementById('pack-capsule');
    const openingText = document.getElementById('opening-text');
    const circuletReveal = document.getElementById('circulet-reveal');
    const circuletInfo = document.getElementById('circulet-info');
    
    // Reset all elements
    packCapsule.className = 'pack-capsule';
    openingText.className = 'opening-text';
    circuletReveal.className = 'circulet-reveal';
    circuletInfo.style.opacity = '0';
    
    // Show modal
    modal.classList.add('show');
    
    // Animation sequence
    setTimeout(() => {
        // Show opening text
        openingText.classList.add('show');
    }, 200);
    
    setTimeout(() => {
        // Start glowing
        packCapsule.classList.add('glowing');
    }, 800);
    
    setTimeout(() => {
        // Start shaking
        packCapsule.classList.add('shaking');
    }, 1500);
    
    setTimeout(() => {
        // Change text to "Opening..."
        openingText.textContent = 'Opening...';
    }, 2000);
    
    setTimeout(() => {
        // Start opening animation
        packCapsule.classList.remove('glowing', 'shaking');
        packCapsule.classList.add('opening');
    }, 2500);
    
    setTimeout(() => {
        // Reveal circulet
        circuletReveal.classList.add('show');
        openingText.style.opacity = '0';
    }, 3200);
    
    setTimeout(() => {
        // Create confetti
        if (circulet.rarity !== 'common') {
            createConfetti(circulet.rarity, circuletReveal);
        }
    }, 3500);
    
    setTimeout(() => {
        // Show circulet info
        circuletInfo.style.opacity = '1';
    }, 4000);
}

// Close modal
function closeModal() {
    document.getElementById('reveal-modal').classList.remove('show');
}

// Initialize
updateUI();
