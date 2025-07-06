# PythonToolkit - Mini Projects Web Platform

A comprehensive web platform to run and showcase Python mini projects with an interactive React frontend and FastAPI backend.

## 🚀 Features

- **Interactive Web Interface**: Beautiful React.js frontend with Tailwind CSS
- **Real-time Execution**: Run Python scripts instantly through the web interface
- **Project Categories**: Organized tools across multiple categories (Utility, Security, Web, etc.)
- **Dynamic Parameter Input**: Customizable inputs for each project
- **Result Visualization**: Smart rendering of results (QR codes, images, JSON, etc.)
- **Search & Filter**: Find projects quickly with advanced filtering
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices
- **Production Ready**: Dockerized and deployment-ready

## 📦 Project Structure

```
python-mini-projects-web/
├── backend/
│   ├── app.py                 # FastAPI server
│   ├── projects/              # Python mini-projects
│   │   ├── __init__.py
│   │   ├── calculator.py
│   │   ├── password_generator.py
│   │   ├── qr_generator.py
│   │   └── ...
│   ├── utils/
│   │   └── runner.py          # Project execution utilities
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── ProjectRunner.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── docker-compose.yml
├── Dockerfile
├── README.md
└── run.sh
```

## 🛠️ Available Projects

### Utility Tools
- **Calculator**: Advanced mathematical expression evaluator
- **Password Generator**: Secure password creation with customizable options
- **QR Code Generator**: Generate QR codes from text
- **File Organizer**: Organize files by type and category

### Security Tools
- **Password Generator**: Create strong, secure passwords
- **Text Encryption**: Encrypt and decrypt text securely

### Web Tools
- **URL Shortener**: Create shortened URLs
- **Weather Checker**: Get current weather information
- **Website Connectivity**: Check website availability

### Image Processing
- **Image Converter**: Convert between different image formats
- **Image Resizer**: Resize images while maintaining quality

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd python-mini-projects-web
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Start the development servers**
   
   Backend (Terminal 1):
   ```bash
   cd backend
   python app.py
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Using Docker

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

## 📚 API Documentation

### Endpoints

#### Get All Projects
```
GET /projects
```

#### Get Project Details
```
GET /projects/{project_id}
```

#### Run Project
```
POST /projects/{project_id}/run
```

#### Get Job Status
```
GET /jobs/{job_id}
```

### Example API Usage

```javascript
// Get all projects
const response = await fetch('/api/projects');
const data = await response.json();

// Run a project
const result = await fetch('/api/projects/calculator/run', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    project_id: 'calculator',
    parameters: {
      expression: '2 + 2 * 3'
    }
  })
});
```

## 🔧 Adding New Projects

1. **Create a new Python module** in `backend/projects/`
   ```python
   # backend/projects/my_project.py
   def my_function(param1: str, param2: int) -> dict:
       """
       Your project implementation
       """
       return {
           "result": f"Processed {param1} with {param2}"
       }
   ```

2. **Add project configuration** in `backend/app.py`
   ```python
   "my_project": {
       "name": "My Project",
       "description": "Description of what it does",
       "category": "Utility",
       "parameters": [
           {"name": "param1", "type": "string", "description": "First parameter"},
           {"name": "param2", "type": "number", "description": "Second parameter", "default": 10}
       ],
       "module": "my_project",
       "function": "my_function"
   }
   ```

3. **Test your project** through the web interface

## 🚀 Deployment

### Deploy to Railway/Render

1. **Backend**: Deploy the `backend/` directory
2. **Frontend**: Deploy the `frontend/` directory
3. **Environment Variables**: Set `BACKEND_URL` in frontend

### Deploy to Vercel + Railway

1. **Frontend on Vercel**:
   ```bash
   cd frontend
   vercel --prod
   ```

2. **Backend on Railway**:
   - Connect your GitHub repository
   - Set root directory to `backend/`
   - Deploy

### Deploy to AWS EC2

1. **Set up EC2 instance**
2. **Install dependencies**
3. **Use Docker Compose**
4. **Set up reverse proxy** (nginx)

## 🎨 Customization

### Styling
- Edit `frontend/src/index.css` for global styles
- Modify `frontend/tailwind.config.js` for theme customization
- Update components in `frontend/src/components/`

### Adding Categories
- Add new categories in the project configuration
- Update the category icons in `ProjectCard.jsx`

### Custom Result Renderers
- Extend the `renderResult()` function in `ProjectRunner.jsx`
- Add specific handlers for different result types

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js for the frontend framework
- FastAPI for the backend framework
- Tailwind CSS for styling
- Lucide React for icons
- All the Python libraries used in the mini projects

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub or contact the maintainers.

---

**Made with ❤️ and ☕ by the Python community**
