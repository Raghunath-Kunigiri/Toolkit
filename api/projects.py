from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

# Import project configurations
from projects import get_projects, get_categories

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        projects = get_projects()
        categories = get_categories()
        
        # Group projects by category
        projects_by_category = {}
        for project_id, project in projects.items():
            category = project['category']
            if category not in projects_by_category:
                projects_by_category[category] = {}
            projects_by_category[category][project_id] = project
        
        response = {
            "categories": categories,
            "projects": projects_by_category,
            "total_projects": len(projects),
            "total_categories": len(categories)
        }
        
        self.wfile.write(json.dumps(response).encode())
        return

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        return 