# Circulet 🔴

A Blooket-inspired educational gaming platform where players collect circular "circulets" instead of square blooks!

## Features

### ✅ Currently Implemented
- **Profile Page**: View your stats including tokens, circulets unlocked, friends, and leaderboard position
- **Beautiful UI**: Modern glass-morphism design with smooth animations
- **Responsive Design**: Works on desktop and mobile devices
- **Navigation**: Sidebar navigation similar to Blacket/Blooket

### 🚧 Coming Soon
- **Market**: Open packs and collect new circulets
- **Trading System**: Trade circulets with friends
- **Chat**: Global and friend messaging
- **News**: Game updates and announcements
- **Firebase Integration**: Real user data and authentication

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Your Browser**
   Navigate to `http://localhost:3000`

## Firebase Setup (Coming Soon)

To enable real user data storage:

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Firestore Database and Authentication
3. Copy your Firebase config to `src/firebase.js`
4. Update the configuration object with your actual values

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.js       # Main layout wrapper
│   ├── Sidebar.js      # Navigation sidebar
│   └── Header.js       # Top header with user info
├── pages/              # Page components
│   ├── Profile.js      # User profile and stats
│   ├── Market.js       # Marketplace (placeholder)
│   ├── Chat.js         # Chat system (placeholder)
│   └── News.js         # News feed (placeholder)
├── firebase.js         # Firebase configuration
├── App.js             # Main app component
└── index.js           # App entry point
```

## Key Features Explained

### Circulets vs Blooks
- **Blooks** are square collectibles in Blooket
- **Circulets** are circular collectibles in Circulet
- Different rarities: Common, Uncommon, Rare, Epic, Legendary

### Stats System
- **Tokens**: In-game currency for purchasing packs
- **Circulets Unlocked**: Total unique circulets collected
- **Friends**: Connected players for trading
- **Place**: Your position on the global leaderboard

### Trading (Planned)
- Send trade requests to friends
- One active trade request at a time
- Real-time trade negotiations

## Contributing

This is the foundation for Circulet! Future development will include:
- Firebase backend integration
- Real authentication system
- Pack opening mechanics
- Trading system
- Chat functionality
- Leaderboard system

## License

Private project - All rights reserved.
