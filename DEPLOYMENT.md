# JANDED Backend - Deployment Guide

This guide covers deploying the JANDED backend API to various platforms.

## Table of Contents
- [Docker Deployment](#docker-deployment)
- [Heroku Deployment](#heroku-deployment)
- [AWS Deployment](#aws-deployment)
- [Render Deployment](#render-deployment)
- [Railway Deployment](#railway-deployment)
- [DigitalOcean Deployment](#digitalocean-deployment)

---

## Docker Deployment

### Local Development with Docker Compose

1. **Build and start containers:**
```bash
docker-compose up -d
```

2. **Run migrations:**
```bash
docker exec janded-api npm run migrate
```

3. **Seed database (optional):**
```bash
docker exec janded-api npm run seed
```

4. **View logs:**
```bash
docker-compose logs -f api
```

5. **Stop containers:**
```bash
docker-compose down
```

### Production Docker Deployment

1. **Build image:**
```bash
docker build -t janded-api .
```

2. **Run container:**
```bash
docker run -d \
  --name janded-api \
  -p 5000:5000 \
  -e DB_HOST=your-db-host \
  -e DB_PASSWORD=your-db-password \
  -e JWT_SECRET=your-secret \
  janded-api
```

---

## Heroku Deployment

### Prerequisites
- Heroku CLI installed
- Heroku account

### Steps

1. **Login to Heroku:**
```bash
heroku login
```

2. **Create new app:**
```bash
heroku create janded-api
```

3. **Add PostgreSQL addon:**
```bash
heroku addons:create heroku-postgresql:mini
```

4. **Set environment variables:**
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your-super-secret-key
heroku config:set FRONTEND_URL=https://your-frontend.com
```

5. **Deploy:**
```bash
git push heroku main
```

6. **Run migrations:**
```bash
heroku run npm run migrate
```

7. **Seed database (optional):**
```bash
heroku run npm run seed
```

8. **Open app:**
```bash
heroku open
```

### Procfile
Create a `Procfile` in the root directory:
```
web: node src/server.js
```

---

## AWS Deployment (Elastic Beanstalk)

### Prerequisites
- AWS CLI installed
- EB CLI installed
- AWS account

### Steps

1. **Initialize EB:**
```bash
eb init -p node.js janded-api
```

2. **Create environment:**
```bash
eb create janded-production
```

3. **Set environment variables:**
```bash
eb setenv NODE_ENV=production \
  JWT_SECRET=your-secret \
  DB_HOST=your-rds-endpoint \
  DB_PASSWORD=your-password
```

4. **Deploy:**
```bash
eb deploy
```

5. **Open app:**
```bash
eb open
```

### RDS Database Setup

1. Create RDS PostgreSQL instance in AWS Console
2. Configure security groups to allow EB access
3. Set DB_HOST to RDS endpoint
4. Run migrations via SSH to EB instance

---

## Render Deployment

### Steps

1. **Sign up at Render.com**

2. **Create PostgreSQL database:**
   - Click "New +" → "PostgreSQL"
   - Name: janded-db
   - Note the Internal Database URL

3. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Configure:
     - Name: janded-api
     - Environment: Node
     - Build Command: `npm install`
     - Start Command: `npm start`

4. **Add environment variables:**
   - Go to Environment tab
   - Add all variables from `.env.example`
   - Use Internal Database URL for DB connection

5. **Deploy:**
   - Click "Manual Deploy" or push to GitHub

6. **Run migrations:**
   - Use Render Shell to run: `npm run migrate`

---

## Railway Deployment

### Steps

1. **Sign up at Railway.app**

2. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add PostgreSQL:**
   - Click "New" → "Database" → "PostgreSQL"

4. **Configure environment variables:**
   - Go to Variables tab
   - Add all environment variables
   - Railway auto-injects DATABASE_URL

5. **Deploy:**
   - Railway automatically deploys on git push

6. **Run migrations:**
   - Use Railway CLI or Dashboard shell
   - Run: `npm run migrate`

### railway.json (optional)
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## DigitalOcean App Platform

### Steps

1. **Sign up at DigitalOcean**

2. **Create new app:**
   - Go to Apps
   - Click "Create App"
   - Connect GitHub repository

3. **Add database:**
   - Add Component → Database
   - Choose PostgreSQL
   - Select plan

4. **Configure app:**
   - Edit app spec:
```yaml
name: janded-api
services:
- name: api
  github:
    repo: your-username/janded-backend
    branch: main
  run_command: npm start
  environment_slug: node-js
  envs:
  - key: NODE_ENV
    value: production
  - key: JWT_SECRET
    value: ${JWT_SECRET}
  databases:
  - name: janded-db
```

5. **Deploy:**
   - Click "Create Resources"

6. **Run migrations:**
   - Use Console in App Platform
   - Run: `npm run migrate`

---

## Environment Variables Checklist

For all platforms, ensure these variables are set:

```env
# Required
NODE_ENV=production
PORT=5000
DB_HOST=<database-host>
DB_PORT=5432
DB_NAME=<database-name>
DB_USER=<database-user>
DB_PASSWORD=<database-password>
JWT_SECRET=<strong-random-secret>
JWT_EXPIRES_IN=7d

# Optional
FRONTEND_URL=<your-frontend-url>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-email>
EMAIL_PASSWORD=<your-email-password>
```

---

## SSL/HTTPS Configuration

Most platforms (Heroku, Render, Railway, DO) provide automatic SSL.

For custom domains:
1. Add custom domain in platform settings
2. Update DNS records as instructed
3. SSL certificate is auto-provisioned

---

## Database Migrations

After deployment, always run migrations:

### Via Platform CLI
```bash
# Heroku
heroku run npm run migrate

# Railway
railway run npm run migrate

# Render (use Shell from dashboard)
npm run migrate
```

### Via SSH (if available)
```bash
ssh user@your-server
cd /app
npm run migrate
```

---

## Monitoring & Logs

### View Logs

**Heroku:**
```bash
heroku logs --tail
```

**Railway:**
```bash
railway logs
```

**Render:**
- View from Dashboard → Logs tab

**DigitalOcean:**
- View from App Platform → Runtime Logs

### Health Check Endpoint
All platforms should monitor: `GET /health`

---

## Scaling

### Horizontal Scaling
Most platforms support auto-scaling:

**Heroku:**
```bash
heroku ps:scale web=2
```

**Render/Railway/DO:**
- Configure in dashboard settings

### Database Connection Pooling
For high traffic, consider:
- PgBouncer for connection pooling
- Read replicas for heavy read loads
- Caching layer (Redis) for frequently accessed data

---

## Troubleshooting

### Database Connection Issues
1. Check security groups/firewall rules
2. Verify connection string format
3. Ensure SSL mode is correct (often required in production)

### Migration Failures
1. Check database user has proper permissions
2. Verify database exists
3. Check migration script syntax

### Port Binding Issues
Most platforms set PORT dynamically. Ensure server uses:
```javascript
const PORT = process.env.PORT || 5000;
```

---

## Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random value
- [ ] Enable CORS only for your frontend domain
- [ ] Set NODE_ENV=production
- [ ] Use strong database passwords
- [ ] Enable SSL/HTTPS
- [ ] Set up rate limiting (already configured)
- [ ] Review and remove debug logs
- [ ] Set up monitoring and alerts
- [ ] Configure backup strategy for database
- [ ] Document environment variables

---

## Backup Strategy

### Database Backups

**Automated (Recommended):**
- Most platforms provide automatic backups
- Enable and configure in platform settings

**Manual:**
```bash
# Create backup
pg_dump -h host -U user -d database > backup.sql

# Restore backup
psql -h host -U user -d database < backup.sql
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "janded-api"
          heroku_email: "your-email@example.com"
```

---

## Support

For deployment issues:
- Check platform-specific documentation
- Review application logs
- Verify environment variables
- Test database connectivity

---

**Happy Deploying! 🚀**
