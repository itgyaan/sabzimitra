# 🚀 SabziMitra (सब्ज़ी मित्र) - Production Deployment Guide

This guide explains how to deploy the entire SabziMitra platform to the cloud with step-by-step instructions.

---

## 🌟 Method 1: Cloud Deployment (Easiest & Free Tier Available)

```
[ Frontend: Vercel / Netlify ]  --->  [ Backend API: Render / Railway ]  --->  [ Database: Neon / Supabase ]
```

### Step 1: Push Code to GitHub
1. Create a new GitHub repository: `sabzimitra`
2. Push your project:
   ```bash
   git init
   git add .
   git commit -m "Initial SabziMitra Full Stack Platform"
   git remote add origin https://github.com/YOUR_USERNAME/sabzimitra.git
   git push -u origin main
   ```

---

### Step 2: Deploy PostgreSQL Database (Free Managed Cloud DB)
Use **Neon.tech** or **Supabase**:
1. Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com) and create a free project.
2. Go to the **SQL Editor** tab, paste the contents of [`schema.sql`](file:///Users/apple/Downloads/SabjiWala/schema.sql), and click **Run**.
3. Copy your PostgreSQL Connection String URL:
   `postgresql://postgres:password@ep-green-farm-12345.us-east-2.aws.neon.tech/sabzimitra_db?sslmode=require`

---

### Step 3: Deploy Backend API on Render or Railway
1. Sign in to [Render.com](https://render.com) (or [Railway.app](https://railway.app)).
2. Click **New +** ➔ **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `PORT`: `5001`
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: *(Paste your Neon / Supabase connection string)*
6. Click **Deploy**. Render will generate a live URL:  
   👉 `https://sabzimitra-api.onrender.com`

---

### Step 4: Deploy Frontend Client on Vercel
1. Sign in to [Vercel.com](https://vercel.com).
2. Click **Add New...** ➔ **Project**.
3. Import your GitHub repository.
4. Set the following settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://sabzimitra-api.onrender.com`
6. Click **Deploy**.
7. Vercel will give you a production HTTPS URL:  
   👉 `https://sabzimitra.vercel.app` 🎉

---

## 🐳 Method 2: Single-Command Docker Deployment (Any Cloud / VPS)

If you have a VPS (DigitalOcean Droplet, AWS EC2, or Hetzner Server) with Docker installed:

1. Clone your repo onto the server:
   ```bash
   git clone https://github.com/YOUR_USERNAME/sabzimitra.git
   cd sabzimitra
   ```

2. Run Docker Compose:
   ```bash
   docker compose up -d --build
   ```

This will automatically launch:
- 🐘 **PostgreSQL Container** (Database with auto-initialized `schema.sql`) on port `5432`
- 🥬 **Node.js Express API Container** on port `5001`
- 🌐 **Nginx Web Client Container** on port `80` (serving the React SPA)

---

## 🔒 Method 3: Production VPS Setup (Ubuntu 22.04 / 24.04 with PM2 + Nginx + SSL)

### 1. Install Node.js, PM2 & Nginx
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
sudo npm install -g pm2
```

### 2. Start Backend with PM2
```bash
cd /var/www/sabzimitra/server
npm install
pm2 start src/index.js --name "sabzimitra-api"
pm2 save
pm2 startup
```

### 3. Build Frontend
```bash
cd /var/www/sabzimitra/client
npm install
npm run build
```

### 4. Configure Nginx (`/etc/nginx/sites-available/sabzimitra`)
```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    # Frontend Static Build
    location / {
        root /var/www/sabzimitra/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://localhost:5001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site & get Free SSL:
```bash
sudo ln -s /etc/nginx/sites-available/sabzimitra /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 📱 Mobile App Generation (PWA / Flutter)
Because the frontend is responsive and PWA-ready:
- **Android APK via Capacitor**:
  ```bash
  cd client
  npm install @capacitor/core @capacitor/cli @capacitor/android
  npx cap init SabziMitra com.sabzimitra.app
  npm run build
  npx cap add android
  npx cap open android
  ```
  *(Opens Android Studio to generate signed release APK/AAB for Google Play Store!)*
