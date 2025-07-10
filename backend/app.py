from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import asyncio
import json
import importlib.util
import os
import sys
from pathlib import Path
import traceback
from datetime import datetime
import uuid

# Add the projects directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'projects'))

app = FastAPI(title="Python Mini Projects API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store for active jobs
active_jobs: Dict[str, Dict] = {}

class ProjectRequest(BaseModel):
    project_id: str
    parameters: Dict[str, Any] = {}

class ProjectResponse(BaseModel):
    success: bool
    result: Any = None
    error: str = None
    job_id: str = None

# Sample projects configuration
PROJECTS_CONFIG = {
    "calculator": {
        "name": "Calculator",
        "description": "A simple calculator application",
        "category": "Utility",
        "parameters": [
            {"name": "expression", "type": "string", "description": "Mathematical expression to evaluate"}
        ],
        "module": "calculator",
        "function": "calculate"
    },
    "password_generator": {
        "name": "Password Generator",
        "description": "Generate secure random passwords",
        "category": "Security",
        "parameters": [
            {"name": "length", "type": "number", "description": "Password length", "default": 12},
            {"name": "include_symbols", "type": "boolean", "description": "Include symbols", "default": True}
        ],
        "module": "password_generator",
        "function": "generate_password"
    },
    "qr_generator": {
        "name": "QR Code Generator",
        "description": "Generate QR codes from text",
        "category": "Utility",
        "parameters": [
            {"name": "text", "type": "string", "description": "Text to encode in QR code"}
        ],
        "module": "qr_generator",
        "function": "generate_qr"
    },
    "weather": {
        "name": "Weather Checker",
        "description": "Get current weather information",
        "category": "API",
        "parameters": [
            {"name": "city", "type": "string", "description": "City name"}
        ],
        "module": "weather",
        "function": "get_weather"
    },
    "text_to_speech": {
        "name": "Text to Speech",
        "description": "Convert text to speech",
        "category": "Audio",
        "parameters": [
            {"name": "text", "type": "string", "description": "Text to convert to speech"}
        ],
        "module": "text_to_speech",
        "function": "speak_text"
    },
    "image_converter": {
        "name": "Image Converter",
        "description": "Convert images between formats",
        "category": "Image",
        "parameters": [
            {"name": "input_format", "type": "string", "description": "Input format (jpg, png, etc.)"},
            {"name": "output_format", "type": "string", "description": "Output format (jpg, png, etc.)"}
        ],
        "module": "image_converter",
        "function": "convert_image"
    },
    "url_shortener": {
        "name": "URL Shortener",
        "description": "Shorten long URLs",
        "category": "Web",
        "parameters": [
            {"name": "url", "type": "string", "description": "URL to shorten"}
        ],
        "module": "url_shortener",
        "function": "shorten_url"
    },
    "file_organizer": {
        "name": "File Organizer",
        "description": "Organize files by type",
        "category": "Utility",
        "parameters": [
            {"name": "directory", "type": "string", "description": "Directory to organize"}
        ],
        "module": "file_organizer",
        "function": "organize_files"
    },
    "web_link_extractor": {
        "name": "Web Link Extractor",
        "description": "Extract all links from any webpage with filtering options",
        "category": "Web",
        "parameters": [
            {"name": "url", "type": "string", "description": "URL of the webpage to extract links from"},
            {"name": "max_links", "type": "number", "description": "Maximum number of links to return", "default": 50},
            {"name": "filter_internal", "type": "boolean", "description": "Only show internal links (same domain)", "default": False},
            {"name": "filter_external", "type": "boolean", "description": "Only show external links (different domain)", "default": False},
            {"name": "include_emails", "type": "boolean", "description": "Include email links (mailto:)", "default": True}
        ],
        "module": "web_link_extractor",
        "function": "extract_links"
    }
}

@app.get("/")
async def root():
    return {"message": "Python Mini Projects API", "version": "1.0.0"}

@app.get("/projects")
async def get_projects():
    """Get all available projects"""
    return {
        "projects": PROJECTS_CONFIG,
        "total": len(PROJECTS_CONFIG)
    }

@app.get("/api/projects")
async def get_projects_api():
    """Get all available projects (API endpoint)"""
    return {
        "projects": PROJECTS_CONFIG,
        "total": len(PROJECTS_CONFIG)
    }

@app.get("/projects/{project_id}")
async def get_project(project_id: str):
    """Get specific project details"""
    if project_id not in PROJECTS_CONFIG:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return PROJECTS_CONFIG[project_id]

@app.get("/api/projects/{project_id}")
async def get_project_api(project_id: str):
    """Get specific project details (API endpoint)"""
    if project_id not in PROJECTS_CONFIG:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return PROJECTS_CONFIG[project_id]

@app.post("/projects/{project_id}/run")
async def run_project(project_id: str, request: ProjectRequest, background_tasks: BackgroundTasks):
    """Run a specific project"""
    if project_id not in PROJECTS_CONFIG:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project_config = PROJECTS_CONFIG[project_id]
    job_id = str(uuid.uuid4())
    
    # Store job info
    active_jobs[job_id] = {
        "project_id": project_id,
        "status": "running",
        "created_at": datetime.now().isoformat(),
        "result": None,
        "error": None
    }
    
    try:
        # Dynamically import and run the project
        module_name = project_config["module"]
        function_name = project_config["function"]
        
        # Import the module
        module_path = os.path.join("projects", f"{module_name}.py")
        if not os.path.exists(module_path):
            raise HTTPException(status_code=500, detail=f"Module {module_name} not found")
        
        spec = importlib.util.spec_from_file_location(module_name, module_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # Get the function
        if not hasattr(module, function_name):
            raise HTTPException(status_code=500, detail=f"Function {function_name} not found in module")
        
        func = getattr(module, function_name)
        
        # Call the function with parameters
        result = func(**request.parameters)
        
        # Update job status
        active_jobs[job_id]["status"] = "completed"
        active_jobs[job_id]["result"] = result
        
        return ProjectResponse(success=True, result=result, job_id=job_id)
        
    except Exception as e:
        # Update job status with error
        active_jobs[job_id]["status"] = "failed"
        active_jobs[job_id]["error"] = str(e)
        
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/projects/{project_id}/run")
async def run_project_api(project_id: str, request: ProjectRequest, background_tasks: BackgroundTasks):
    """Run a specific project (API endpoint)"""
    if project_id not in PROJECTS_CONFIG:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project_config = PROJECTS_CONFIG[project_id]
    job_id = str(uuid.uuid4())
    
    # Store job info
    active_jobs[job_id] = {
        "project_id": project_id,
        "status": "running",
        "created_at": datetime.now().isoformat(),
        "result": None,
        "error": None
    }
    
    try:
        # Dynamically import and run the project
        module_name = project_config["module"]
        function_name = project_config["function"]
        
        # Import the module
        module_path = os.path.join("projects", f"{module_name}.py")
        if not os.path.exists(module_path):
            raise HTTPException(status_code=500, detail=f"Module {module_name} not found")
        
        spec = importlib.util.spec_from_file_location(module_name, module_path)
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        
        # Get the function
        if not hasattr(module, function_name):
            raise HTTPException(status_code=500, detail=f"Function {function_name} not found in module")
        
        func = getattr(module, function_name)
        
        # Call the function with parameters
        result = func(**request.parameters)
        
        # Update job status
        active_jobs[job_id]["status"] = "completed"
        active_jobs[job_id]["result"] = result
        
        return ProjectResponse(success=True, result=result, job_id=job_id)
        
    except Exception as e:
        # Update job status with error
        active_jobs[job_id]["status"] = "failed"
        active_jobs[job_id]["error"] = str(e)
        
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/jobs/{job_id}")
async def get_job_status(job_id: str):
    """Get job status"""
    if job_id not in active_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return active_jobs[job_id]

@app.get("/jobs")
async def get_all_jobs():
    """Get all jobs"""
    return active_jobs

@app.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    """Delete a job"""
    if job_id not in active_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    del active_jobs[job_id]
    return {"message": "Job deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 