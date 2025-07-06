# 🚀 Deploying PythonToolkit to Vercel

This guide will walk you through deploying your PythonToolkit web platform to Vercel with both frontend and backend functionality.

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository with your PythonToolkit code

## 🛠️ Project Structure for Vercel

Your project is already configured for Vercel deployment with:

```
your-project/
├── api/                    # Vercel serverless functions
│   ├── projects.py         # GET /api/projects
│   └── run.py             # POST /api/{project_id}/run
├── frontend/              # React application
├── backend/               # Original FastAPI (for reference)
├── vercel.json           # Vercel configuration
├── requirements.txt      # Python dependencies for serverless functions
└── README.md
```

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# If you haven't already, push your code to GitHub
git add .
git commit -m "feat: Add Vercel deployment configuration"
git push origin main
```

### Step 2: Connect to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in**
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Project Name**: `pythontoolkit` (or your preferred name)
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Leave empty (use root)
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `cd frontend && npm install`

### Step 3: Environment Variables (if needed)

If your projects require API keys, add them in Vercel:
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add any required environment variables

### Step 4: Deploy

1. **Click "Deploy"**
2. **Wait for deployment to complete** (usually 2-3 minutes)
3. **Your app will be live at** `https://your-project-name.vercel.app`

## 📡 API Endpoints

After deployment, your API endpoints will be:

- **Get Projects**: `GET https://your-app.vercel.app/api/projects`
- **Run Calculator**: `POST https://your-app.vercel.app/api/calculator/run`
- **Run Password Generator**: `POST https://your-app.vercel.app/api/password_generator/run`
- **Run QR Generator**: `POST https://your-app.vercel.app/api/qr_generator/run`
- **Run Web Link Extractor**: `POST https://your-app.vercel.app/api/web_link_extractor/run`

## 🧪 Testing Your Deployment

### Test API Endpoints

```bash
# Test projects endpoint
curl https://your-app.vercel.app/api/projects

# Test calculator
curl -X POST https://your-app.vercel.app/api/calculator/run \
  -H "Content-Type: application/json" \
  -d '{"parameters": {"expression": "2 + 2 * 3"}}'

# Test password generator
curl -X POST https://your-app.vercel.app/api/password_generator/run \
  -H "Content-Type: application/json" \
  -d '{"parameters": {"length": 16, "include_symbols": true}}'
```

### Test Frontend

1. Visit your deployed URL
2. Search for projects
3. Try running different tools
4. Check if results display properly

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. **Build Failures**
```
Error: Cannot find module 'some-package'
```
**Solution**: Ensure all dependencies are in `frontend/package.json`

#### 2. **API Function Timeouts**
```
Error: Function execution timed out
```
**Solution**: Optimize your Python functions or upgrade to Vercel Pro

#### 3. **Import Errors**
```
ModuleNotFoundError: No module named 'xyz'
```
**Solution**: Add the missing package to `requirements.txt`

#### 4. **CORS Issues**
```
Access-Control-Allow-Origin error
```
**Solution**: CORS headers are already configured in the API functions

### 5. **Python Version Issues**
If you encounter Python compatibility issues:
1. Update `vercel.json` to specify Python version:
```json
{
  "functions": {
    "api/*.py": {
      "runtime": "python3.9"
    }
  }
}
```

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:
- **Main branch**: Production deployment
- **Feature branches**: Preview deployments

Every push triggers a new deployment!

## 📊 Monitoring

Monitor your deployment:
1. **Vercel Dashboard**: Real-time metrics and logs
2. **Function Logs**: Debug serverless function issues
3. **Analytics**: Track usage and performance

## 🚀 Advanced Configuration

### Custom Domain

1. Go to **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS records

### Environment Variables

```bash
# Add via Vercel CLI
vercel env add OPENAI_API_KEY
vercel env add DATABASE_URL
```

### Performance Optimization

1. **Enable Edge Functions** for faster response times
2. **Use Vercel Analytics** for performance monitoring
3. **Implement caching** for expensive operations

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Python Runtime](https://vercel.com/docs/functions/serverless-functions/runtimes/python)
- [Vercel CLI](https://vercel.com/docs/cli)

## 🎉 Success!

Your PythonToolkit is now live on Vercel! Share your deployment URL and start using your Python tools from anywhere.

**Example URL**: `https://pythontoolkit-yourname.vercel.app`

---

**Need help?** Open an issue on GitHub or contact the maintainers. 