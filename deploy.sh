#!/bin/bash

# Free Hosting Deployment Script
# This script helps you deploy your app to Render + Vercel for FREE

echo "🚀 Free Hosting Deployment Helper"
echo "=================================="
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI not found. Please install it first:"
    echo "   brew install gh"
    exit 1
fi

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "Step 1: Push to GitHub"
echo "----------------------"
read -p "Enter repository name (default: guide-startups): " repo_name
repo_name=${repo_name:-guide-startups}

# Initialize git if not already
if [ ! -d .git ]; then
    git init
    git add .
    git commit -m "Initial commit - AI Startup Ideas Explorer with Web Search"
fi

# Create and push to GitHub
echo "Creating GitHub repository..."
gh repo create $repo_name --public --source=. --push || echo "Repository might already exist, pushing..."
git push -u origin main || git push -u origin master

echo "✅ Code pushed to GitHub!"
echo ""

echo "Step 2: Deploy Backend to Render"
echo "--------------------------------"
echo "1. Go to https://dashboard.render.com/"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repo: $repo_name"
echo "4. Configure:"
echo "   - Name: startup-ideas-backend"
echo "   - Root Directory: backend"
echo "   - Build Command: pip install -r requirements.txt"
echo "   - Start Command: uvicorn main:app --host 0.0.0.0 --port \$PORT"
echo "   - Instance Type: Free"
echo "5. Add Environment Variable:"
echo "   - GROQ_API_KEY = <paste-your-groq-api-key-here>"
echo "6. Click 'Create Web Service'"
echo ""
read -p "Once deployed, enter your Render backend URL (e.g., https://xyz.onrender.com): " backend_url

# Update frontend .env.production
echo "VITE_API_URL=$backend_url" > frontend/.env.production
echo "✅ Updated frontend configuration!"
echo ""

echo "Step 3: Deploy Frontend to Vercel"
echo "---------------------------------"
cd frontend
echo "Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo ""
echo "Your app should now be live!"
echo ""
echo "Important: Update CORS in backend"
echo "After Vercel gives you a URL (e.g., https://guide-startups.vercel.app),"
echo "add it to the CORS origins in backend/main.py and push to GitHub."
echo "Render will auto-deploy the update."
echo ""
echo "Need help? Check DEPLOYMENT.md or free_hosting_guide.md"
