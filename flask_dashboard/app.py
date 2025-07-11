import os
import subprocess
import json
import tempfile
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_file, url_for
from werkzeug.utils import secure_filename
import threading
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Directories
UPLOAD_FOLDER = 'uploads'
OUTPUT_FOLDER = 'outputs'
SCRIPTS_FOLDER = '../project/backend'  # Path to your Python scripts

# Ensure directories exist
for folder in [UPLOAD_FOLDER, OUTPUT_FOLDER]:
    os.makedirs(folder, exist_ok=True)

# Script categories and configurations
SCRIPT_CATEGORIES = {
    "File Operations": {
        "pdf_converter.py": {
            "name": "PDF Converter",
            "description": "Convert between PDF and various file formats",
            "inputs": [
                {"name": "conversion_type", "type": "select", "options": ["image_to_pdf", "pdf_to_images", "text_to_pdf"], "label": "Conversion Type"},
                {"name": "input_file", "type": "file", "label": "Input File", "accept": ".pdf,.png,.jpg,.jpeg,.txt"}
            ]
        },
        "JPGtoPNG.py": {
            "name": "JPG to PNG Converter",
            "description": "Convert JPEG images to PNG format",
            "inputs": [
                {"name": "input_file", "type": "file", "label": "JPEG File", "accept": ".jpg,.jpeg"}
            ]
        },
        "PNGtoJPG.py": {
            "name": "PNG to JPG Converter", 
            "description": "Convert PNG images to JPEG format",
            "inputs": [
                {"name": "input_file", "type": "file", "label": "PNG File", "accept": ".png"}
            ]
        },
        "converter_GUI.py": {
            "name": "File Converter (GUI)",
            "description": "Convert files between different formats",
            "inputs": [
                {"name": "input_file", "type": "file", "label": "Input File"},
                {"name": "output_format", "type": "text", "label": "Output Format"}
            ]
        }
    },
    "Utilities": {
        "calculator.py": {
            "name": "Calculator",
            "description": "Perform mathematical calculations",
            "inputs": [
                {"name": "expression", "type": "text", "label": "Mathematical Expression", "placeholder": "e.g., 2 + 3 * 4"}
            ]
        },
        "stopwatch.py": {
            "name": "Stopwatch",
            "description": "Precise timing tool with lap recording",
            "inputs": [
                {"name": "action", "type": "select", "options": ["start", "lap", "stop"], "label": "Action"}
            ]
        },
        "todo.py": {
            "name": "Todo List Manager",
            "description": "Manage your tasks and to-do items",
            "inputs": [
                {"name": "action", "type": "select", "options": ["add", "list", "complete", "delete"], "label": "Action"},
                {"name": "task", "type": "text", "label": "Task Description"}
            ]
        },
        "battery.py": {
            "name": "Battery Monitor",
            "description": "Monitor system battery status",
            "inputs": []
        },
        "birthDateToCurrentAge.py": {
            "name": "Age Calculator",
            "description": "Calculate age from birth date",
            "inputs": [
                {"name": "birth_date", "type": "date", "label": "Birth Date"}
            ]
        }
    },
    "Security": {
        "encrypt.py": {
            "name": "File Encryptor",
            "description": "Encrypt and decrypt files securely",
            "inputs": [
                {"name": "input_file", "type": "file", "label": "File to Encrypt/Decrypt"},
                {"name": "password", "type": "password", "label": "Password"},
                {"name": "action", "type": "select", "options": ["encrypt", "decrypt"], "label": "Action"}
            ]
        }
    },
    "Web Tools": {
        "get_links.py": {
            "name": "Link Extractor",
            "description": "Extract links from web pages",
            "inputs": [
                {"name": "url", "type": "url", "label": "Website URL", "placeholder": "https://example.com"}
            ]
        },
        "check_connectivity.py": {
            "name": "Connectivity Checker",
            "description": "Check website connectivity and response times",
            "inputs": [
                {"name": "url", "type": "url", "label": "Website URL", "placeholder": "https://example.com"}
            ]
        }
    },
    "Multimedia": {
        "capture_video_frames.py": {
            "name": "Video Frame Extractor",
            "description": "Extract frames from video files",
            "inputs": [
                {"name": "input_file", "type": "file", "label": "Video File", "accept": ".mp4,.avi,.mov,.mkv"},
                {"name": "frame_interval", "type": "number", "label": "Frame Interval (seconds)", "value": "1"}
            ]
        },
        "make_art.py": {
            "name": "ASCII Art Generator",
            "description": "Generate ASCII art from text or images",
            "inputs": [
                {"name": "text", "type": "text", "label": "Text to Convert"},
                {"name": "input_file", "type": "file", "label": "Or Upload Image", "accept": ".png,.jpg,.jpeg"}
            ]
        }
    }
}

# Store running processes
running_processes = {}

@app.route('/')
def index():
    return render_template('index.html', categories=SCRIPT_CATEGORIES)

@app.route('/run_script', methods=['POST'])
def run_script():
    try:
        script_name = request.form.get('script_name')
        category = request.form.get('category')
        
        if not script_name or category not in SCRIPT_CATEGORIES:
            return jsonify({'error': 'Invalid script or category'}), 400
            
        if script_name not in SCRIPT_CATEGORIES[category]:
            return jsonify({'error': 'Script not found in category'}), 400
            
        script_config = SCRIPT_CATEGORIES[category][script_name]
        
        # Create unique execution ID
        execution_id = f"{script_name}_{int(time.time())}"
        
        # Prepare arguments
        args = []
        script_path = os.path.join(SCRIPTS_FOLDER, script_name)
        
        # Handle file uploads
        uploaded_files = []
        for input_config in script_config['inputs']:
            if input_config['type'] == 'file':
                file_key = input_config['name']
                if file_key in request.files:
                    file = request.files[file_key]
                    if file and file.filename:
                        filename = secure_filename(file.filename)
                        filepath = os.path.join(UPLOAD_FOLDER, f"{execution_id}_{filename}")
                        file.save(filepath)
                        uploaded_files.append(filepath)
                        args.append(filepath)
            else:
                value = request.form.get(input_config['name'])
                if value:
                    args.append(value)
        
        # Execute script in a separate thread
        def execute_script():
            try:
                # Run the Python script
                cmd = ['python', script_path] + args
                result = subprocess.run(
                    cmd,
                    capture_output=True,
                    text=True,
                    timeout=300,  # 5 minute timeout
                    cwd=SCRIPTS_FOLDER
                )
                
                # Store results
                running_processes[execution_id] = {
                    'status': 'completed',
                    'stdout': result.stdout,
                    'stderr': result.stderr,
                    'return_code': result.returncode,
                    'timestamp': datetime.now().isoformat()
                }
                
                # Clean up uploaded files
                for filepath in uploaded_files:
                    try:
                        os.remove(filepath)
                    except:
                        pass
                        
            except subprocess.TimeoutExpired:
                running_processes[execution_id] = {
                    'status': 'timeout',
                    'error': 'Script execution timed out',
                    'timestamp': datetime.now().isoformat()
                }
            except Exception as e:
                running_processes[execution_id] = {
                    'status': 'error',
                    'error': str(e),
                    'timestamp': datetime.now().isoformat()
                }
        
        # Mark as running
        running_processes[execution_id] = {
            'status': 'running',
            'timestamp': datetime.now().isoformat()
        }
        
        # Start execution thread
        thread = threading.Thread(target=execute_script)
        thread.daemon = True
        thread.start()
        
        return jsonify({
            'execution_id': execution_id,
            'status': 'started',
            'message': 'Script execution started'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/check_status/<execution_id>')
def check_status(execution_id):
    if execution_id in running_processes:
        return jsonify(running_processes[execution_id])
    else:
        return jsonify({'error': 'Execution ID not found'}), 404

@app.route('/download/<filename>')
def download_file(filename):
    try:
        return send_file(os.path.join(OUTPUT_FOLDER, filename), as_attachment=True)
    except FileNotFoundError:
        return jsonify({'error': 'File not found'}), 404

@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'File too large'}), 413

if __name__ == '__main__':
    app.run(debug=True, port=5000) 