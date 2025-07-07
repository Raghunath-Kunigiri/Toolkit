"""
Project configurations and utilities.
"""

PROJECTS_CONFIG = {
    # Utility Tools
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
    "stopwatch": {
        "name": "Stopwatch",
        "description": "A simple stopwatch application",
        "category": "Utility",
        "parameters": [],
        "module": "stopwatch",
        "function": "start_stopwatch"
    },
    "digital_clock": {
        "name": "Digital Clock",
        "description": "Display current time in digital format",
        "category": "Utility",
        "parameters": [],
        "module": "digital_clock",
        "function": "show_time"
    },

    # File Operations
    "pdf_merger": {
        "name": "PDF Merger",
        "description": "Merge multiple PDF files into one",
        "category": "File Operations",
        "parameters": [
            {"name": "pdf_files", "type": "array", "description": "List of PDF files to merge"}
        ],
        "module": "merge_pdfs",
        "function": "merge_pdfs"
    },
    "file_organizer": {
        "name": "File Organizer",
        "description": "Organize files into folders by type",
        "category": "File Operations",
        "parameters": [
            {"name": "directory", "type": "string", "description": "Directory to organize"}
        ],
        "module": "organized_download_folder",
        "function": "organize_files"
    },
    "duplicate_remover": {
        "name": "Duplicate File Remover",
        "description": "Find and remove duplicate files",
        "category": "File Operations",
        "parameters": [
            {"name": "directory", "type": "string", "description": "Directory to scan"}
        ],
        "module": "duplicate_files_remover",
        "function": "remove_duplicates"
    },

    # Security Tools
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
    "text_encryptor": {
        "name": "Text Encryptor",
        "description": "Encrypt and decrypt text messages",
        "category": "Security",
        "parameters": [
            {"name": "text", "type": "string", "description": "Text to encrypt/decrypt"},
            {"name": "key", "type": "string", "description": "Encryption key"},
            {"name": "mode", "type": "string", "description": "encrypt or decrypt", "default": "encrypt"}
        ],
        "module": "encrypt_and_decrypt_text",
        "function": "process_text"
    },

    # Web Tools
    "web_link_extractor": {
        "name": "Web Link Extractor",
        "description": "Extract all links from any webpage",
        "category": "Web",
        "parameters": [
            {"name": "url", "type": "string", "description": "URL to extract links from"}
        ],
        "module": "get_links",
        "function": "extract_links"
    },
    "website_screenshot": {
        "name": "Website Screenshot",
        "description": "Take screenshot of any website",
        "category": "Web",
        "parameters": [
            {"name": "url", "type": "string", "description": "Website URL"}
        ],
        "module": "snapshot_of_given_website",
        "function": "take_screenshot"
    },

    # Image Processing
    "image_watermark": {
        "name": "Image Watermark",
        "description": "Add watermark to images",
        "category": "Image Processing",
        "parameters": [
            {"name": "image", "type": "file", "description": "Image to watermark"},
            {"name": "watermark_text", "type": "string", "description": "Watermark text"}
        ],
        "module": "image_watermark",
        "function": "add_watermark"
    },
    "image_converter": {
        "name": "Image Converter",
        "description": "Convert images between formats",
        "category": "Image Processing",
        "parameters": [
            {"name": "image", "type": "file", "description": "Image to convert"},
            {"name": "output_format", "type": "string", "description": "Target format (png, jpg, etc)"}
        ],
        "module": "convert_Imgs",
        "function": "convert_image"
    },

    # Games
    "number_guessing": {
        "name": "Number Guessing Game",
        "description": "Try to guess the number",
        "category": "Games",
        "parameters": [
            {"name": "max_number", "type": "number", "description": "Maximum number to guess", "default": 100}
        ],
        "module": "number_guessing_game",
        "function": "play_game"
    },
    "tic_tac_toe": {
        "name": "Tic Tac Toe",
        "description": "Classic Tic Tac Toe game",
        "category": "Games",
        "parameters": [
            {"name": "vs_ai", "type": "boolean", "description": "Play against AI", "default": False}
        ],
        "module": "tic_tac_toe",
        "function": "start_game"
    }
}

def get_projects():
    """Return the projects configuration."""
    return PROJECTS_CONFIG

def get_project(project_id):
    """Get a specific project configuration."""
    return PROJECTS_CONFIG.get(project_id)

def get_categories():
    """Get list of unique categories."""
    return list(set(project["category"] for project in PROJECTS_CONFIG.values())) 