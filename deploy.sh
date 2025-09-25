#!/bin/bash

echo "🚀 Deploying Circulet to GitHub Pages..."

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to gh-pages branch
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://helloworld321sup.github.io/circulet"
echo "⏳ It may take a few minutes to go live."
