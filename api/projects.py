from http.server import BaseHTTPRequestHandler
import json
import sys
import os

# Add the backend directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'backend'))

# Import project configurations
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

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        response = {
            "projects": PROJECTS_CONFIG,
            "total": len(PROJECTS_CONFIG)
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