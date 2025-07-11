# Python Utility Hub - Flask Dashboard

A comprehensive web-based dashboard for running Python utility scripts through an elegant, user-friendly interface.

## 🚀 Features

- **Categorized Script Organization**: Scripts organized into logical categories (File Operations, Utilities, Security, Web Tools, Multimedia)
- **Dynamic Input Forms**: Automatically generated input forms based on script requirements
- **Real-time Execution**: Asynchronous script execution with live status updates
- **File Upload Support**: Handle file uploads for scripts that process files
- **Search & Filter**: Quick search and category filtering functionality
- **Responsive Design**: Bootstrap-based responsive UI that works on all devices
- **Error Handling**: Comprehensive error handling and user-friendly error messages
- **Progress Tracking**: Visual progress indicators and execution status
- **Output Display**: Terminal-style output display with syntax highlighting

## 📁 Project Structure

```
flask_dashboard/
├── app.py                  # Flask backend application
├── static/                 # Static files
│   ├── css/
│   │   └── style.css      # Custom CSS styling
│   └── js/
│       └── scripts.js     # Frontend JavaScript
├── templates/              # HTML templates
│   └── index.html         # Main dashboard template
├── uploads/               # Temporary file uploads (auto-created)
├── outputs/               # Script output files (auto-created)
├── requirements.txt       # Python dependencies
└── README.md             # This file
```

## 🔧 Installation & Setup

### Prerequisites

- Python 3.7 or higher
- Your Python scripts in the `../project/backend/` directory

### Step 1: Clone or Download

Download the Flask dashboard files to your project directory.

### Step 2: Install Dependencies

```bash
cd flask_dashboard
pip install -r requirements.txt
```

### Step 3: Configure Script Paths

Update the `SCRIPTS_FOLDER` path in `app.py` to point to your Python scripts:

```python
SCRIPTS_FOLDER = '../project/backend'  # Adjust this path as needed
```

### Step 4: Run the Application

```bash
python app.py
```

The dashboard will be available at: `http://localhost:5000`

## 📋 Supported Scripts

The dashboard currently supports the following categories and scripts:

### File Operations
- **PDF Converter**: Convert between PDF and various formats
- **JPG to PNG Converter**: Convert JPEG images to PNG
- **PNG to JPG Converter**: Convert PNG images to JPEG
- **File Converter (GUI)**: General file format conversion

### Utilities
- **Calculator**: Mathematical calculations
- **Stopwatch**: Timing tool with lap recording
- **Todo List Manager**: Task management
- **Battery Monitor**: System battery status
- **Age Calculator**: Calculate age from birth date

### Security
- **File Encryptor**: Encrypt and decrypt files

### Web Tools
- **Link Extractor**: Extract links from web pages
- **Connectivity Checker**: Check website connectivity

### Multimedia
- **Video Frame Extractor**: Extract frames from videos
- **ASCII Art Generator**: Generate ASCII art

## ⚙️ Configuration

### Adding New Scripts

To add a new script to the dashboard:

1. Add your Python script to the `../project/backend/` directory
2. Update the `SCRIPT_CATEGORIES` dictionary in `app.py`:

```python
"Your Category": {
    "your_script.py": {
        "name": "Script Display Name",
        "description": "Brief description of what the script does",
        "inputs": [
            {"name": "input_name", "type": "text", "label": "Input Label"},
            {"name": "file_input", "type": "file", "label": "File Upload", "accept": ".txt,.pdf"}
        ]
    }
}
```

### Input Types

Supported input types:
- `text`: Text input field
- `file`: File upload
- `select`: Dropdown selection
- `password`: Password input
- `date`: Date picker
- `number`: Number input
- `url`: URL input

### File Upload Configuration

- Maximum file size: 16MB (configurable in `app.py`)
- Supported file types: Configured per script in the `accept` attribute
- Files are temporarily stored in the `uploads/` directory

## 🎨 Customization

### Styling

Modify `static/css/style.css` to customize the appearance:

- Update CSS variables in `:root` for color scheme changes
- Modify card styles, animations, and layout
- Add custom themes or dark mode support

### JavaScript Functionality

Extend `static/js/scripts.js` to add new features:

- Custom form validation
- Additional keyboard shortcuts
- Enhanced animations
- Real-time notifications

### HTML Template

Update `templates/index.html` to modify the layout:

- Add new sections or components
- Modify the welcome section
- Customize the sidebar or navigation

## 🔒 Security Considerations

- **Input Validation**: All user inputs are validated and sanitized
- **File Upload Security**: File types and sizes are restricted
- **Command Injection Prevention**: Secure subprocess execution
- **Error Handling**: No sensitive information exposed in error messages

## 🐛 Troubleshooting

### Common Issues

1. **Scripts not found**: Check the `SCRIPTS_FOLDER` path in `app.py`
2. **File upload errors**: Verify file size limits and permissions
3. **Script execution timeout**: Increase timeout in `app.py` (default: 5 minutes)
4. **Permission errors**: Ensure proper file permissions for uploads and outputs

### Debug Mode

Enable debug mode for development:

```python
app.run(debug=True, port=5000)
```

### Logs

Check the console output for detailed error messages and execution logs.

## 📱 Usage

1. **Navigate to Categories**: Use the sidebar to filter scripts by category
2. **Search Scripts**: Use the search bar to find specific scripts
3. **Run Scripts**: Click "Run Script" on any script card
4. **Provide Inputs**: Fill in the required parameters and upload files
5. **Execute**: Click "Execute" to run the script
6. **View Results**: Monitor progress and view output in real-time
7. **Download Results**: Download any generated files

### Keyboard Shortcuts

- `Ctrl/Cmd + K`: Focus search bar
- `Escape`: Close any open script inputs

## 🔄 API Endpoints

- `GET /`: Main dashboard page
- `POST /run_script`: Execute a script
- `GET /check_status/<execution_id>`: Check execution status
- `GET /download/<filename>`: Download generated files

## 🤝 Contributing

To contribute to this project:

1. Add new scripts to the appropriate category
2. Update the configuration in `app.py`
3. Test the integration thoroughly
4. Update documentation as needed

## 📄 License

This project is part of the Python Toolkit repository. Please refer to the main repository license.

## 🔗 Links

- **GitHub Repository**: [https://github.com/Raghunath-Kunigiri/Toolkit](https://github.com/Raghunath-Kunigiri/Toolkit)
- **React Frontend**: Located in the main project directory

---

**Note**: This Flask dashboard works alongside the existing React frontend, providing an alternative web interface for running Python scripts. 