from http.server import BaseHTTPRequestHandler
import json
import sys
import os
import importlib.util
from urllib.parse import urlparse, parse_qs

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Parse the URL to get project_id
        parsed_url = urlparse(self.path)
        path_parts = parsed_url.path.strip('/').split('/')
        
        if len(path_parts) < 2:
            self.send_error(400, "Invalid request path")
            return
            
        project_id = path_parts[0]
        
        # Set CORS headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        try:
            # Get request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            parameters = data.get('parameters', {})
            
            # Project configurations
            PROJECTS_CONFIG = {
                "calculator": {"module": "calculator", "function": "calculate"},
                "password_generator": {"module": "password_generator", "function": "generate_password"},
                "qr_generator": {"module": "qr_generator", "function": "generate_qr"},
                "web_link_extractor": {"module": "web_link_extractor", "function": "extract_links"}
            }
            
            if project_id not in PROJECTS_CONFIG:
                self.send_error(404, "Project not found")
                return
                
            project_config = PROJECTS_CONFIG[project_id]
            module_name = project_config["module"]
            function_name = project_config["function"]
            
            # Import the module dynamically
            module_path = os.path.join(os.path.dirname(__file__), '..', 'backend', 'projects', f"{module_name}.py")
            
            if not os.path.exists(module_path):
                self.send_error(500, f"Module {module_name} not found")
                return
                
            spec = importlib.util.spec_from_file_location(module_name, module_path)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            
            # Get the function
            if not hasattr(module, function_name):
                self.send_error(500, f"Function {function_name} not found")
                return
                
            func = getattr(module, function_name)
            
            # Call the function with parameters
            result = func(**parameters)
            
            response = {
                "success": True,
                "result": result,
                "job_id": f"vercel_{project_id}_001"
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        except Exception as e:
            error_response = {
                "success": False,
                "error": str(e)
            }
            self.wfile.write(json.dumps(error_response).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        return 