// Python Utility Hub - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize search functionality
    setupSearch();
    
    // Initialize category filtering
    setupCategoryFilter();
    
    // Initialize script execution
    setupScriptExecution();
    
    // Add animation classes
    animateElements();
}

function setupEventListeners() {
    // Category navigation
    document.querySelectorAll('#categoryNav .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterByCategory(category);
            updateActiveCategory(this);
        });
    });

    // Run script buttons
    document.querySelectorAll('.run-script-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.dataset.target;
            showScriptInputs(targetId);
        });
    });

    // Cancel buttons
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            hideScriptInputs(this);
        });
    });

    // Script form submissions
    document.querySelectorAll('.script-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            executeScript(this);
        });
    });
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            performSearch(query);
        }, 300);
    });
}

function setupCategoryFilter() {
    // Initially show all scripts
    showAllScripts();
}

function setupScriptExecution() {
    // Initialize execution state
    window.executionStates = {};
}

function animateElements() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.script-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

// Category Management
function filterByCategory(category) {
    const cards = document.querySelectorAll('.script-card');
    const welcomeSection = document.getElementById('welcomeSection');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    // Hide welcome section when filtering
    if (category !== 'all') {
        welcomeSection.style.display = 'none';
    } else {
        welcomeSection.style.display = 'block';
    }

    cards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });

    // Show/hide no results message
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

function updateActiveCategory(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('#categoryNav .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

function showAllScripts() {
    const cards = document.querySelectorAll('.script-card');
    cards.forEach(card => {
        card.style.display = 'block';
    });
}

// Search Functionality
function performSearch(query) {
    const cards = document.querySelectorAll('.script-card');
    const welcomeSection = document.getElementById('welcomeSection');
    const noResults = document.getElementById('noResults');
    let visibleCount = 0;

    if (query === '') {
        // If search is empty, show all scripts
        showAllScripts();
        welcomeSection.style.display = 'block';
        noResults.style.display = 'none';
        return;
    }

    // Hide welcome section during search
    welcomeSection.style.display = 'none';

    cards.forEach(card => {
        const scriptName = card.dataset.name;
        const description = card.querySelector('.card-text').textContent.toLowerCase();
        const category = card.dataset.category.toLowerCase();

        if (scriptName.includes(query) || description.includes(query) || category.includes(query)) {
            card.style.display = 'block';
            card.classList.add('fade-in');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });

    // Show/hide no results message
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Script Input Management
function showScriptInputs(targetId) {
    const inputsDiv = document.getElementById(targetId);
    const runBtn = document.querySelector(`[data-target="${targetId}"]`);
    
    if (inputsDiv && runBtn) {
        inputsDiv.classList.remove('d-none');
        inputsDiv.classList.add('fade-in');
        runBtn.style.display = 'none';
        
        // Scroll to inputs
        inputsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function hideScriptInputs(cancelBtn) {
    const form = cancelBtn.closest('.script-form');
    const inputsDiv = form.closest('.script-inputs');
    const card = inputsDiv.closest('.script-card');
    const runBtn = card.querySelector('.run-script-btn');
    const resultsDiv = card.querySelector('.script-results');
    
    // Hide inputs and results
    inputsDiv.classList.add('d-none');
    resultsDiv.classList.add('d-none');
    
    // Show run button
    runBtn.style.display = 'block';
    
    // Reset form
    form.reset();
}

// Script Execution
function executeScript(form) {
    const scriptName = form.dataset.script;
    const category = form.dataset.category;
    const card = form.closest('.script-card');
    const resultsDiv = card.querySelector('.script-results');
    const inputsDiv = form.closest('.script-inputs');
    
    // Show loading state
    showLoadingState(resultsDiv);
    
    // Prepare form data
    const formData = new FormData(form);
    formData.append('script_name', scriptName);
    formData.append('category', category);
    
    // Execute script
    fetch('/run_script', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError(resultsDiv, data.error);
        } else {
            // Start polling for results
            pollExecutionStatus(data.execution_id, resultsDiv);
        }
    })
    .catch(error => {
        showError(resultsDiv, 'Network error: ' + error.message);
    });
}

function showLoadingState(resultsDiv) {
    resultsDiv.classList.remove('d-none');
    resultsDiv.innerHTML = `
        <div class="alert alert-info">
            <div class="d-flex align-items-center">
                <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                <span>Executing script...</span>
            </div>
            <div class="progress mt-2">
                <div class="progress-bar progress-bar-striped progress-bar-animated" 
                     role="progressbar" style="width: 100%"></div>
            </div>
        </div>
    `;
}

function pollExecutionStatus(executionId, resultsDiv) {
    const pollInterval = setInterval(() => {
        fetch(`/check_status/${executionId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'completed') {
                clearInterval(pollInterval);
                showResults(resultsDiv, data);
            } else if (data.status === 'error' || data.status === 'timeout') {
                clearInterval(pollInterval);
                showError(resultsDiv, data.error || 'Script execution failed');
            }
            // If still running, continue polling
        })
        .catch(error => {
            clearInterval(pollInterval);
            showError(resultsDiv, 'Error checking status: ' + error.message);
        });
    }, 2000); // Poll every 2 seconds
}

function showResults(resultsDiv, data) {
    let content = '';
    
    if (data.return_code === 0) {
        content = `
            <div class="alert alert-success">
                <h6><i class="fas fa-check-circle me-2"></i>Script executed successfully!</h6>
                <small class="text-muted">Completed at: ${new Date(data.timestamp).toLocaleString()}</small>
            </div>
        `;
        
        if (data.stdout) {
            content += `
                <div class="output-container">
                    <h6><i class="fas fa-terminal me-2"></i>Output:</h6>
                    <div class="output-content">${escapeHtml(data.stdout)}</div>
                </div>
            `;
        }
    } else {
        content = `
            <div class="alert alert-danger">
                <h6><i class="fas fa-exclamation-triangle me-2"></i>Script execution failed</h6>
                <small class="text-muted">Return code: ${data.return_code}</small>
            </div>
        `;
        
        if (data.stderr) {
            content += `
                <div class="output-container">
                    <h6><i class="fas fa-exclamation-circle me-2"></i>Error Output:</h6>
                    <div class="output-content">${escapeHtml(data.stderr)}</div>
                </div>
            `;
        }
    }
    
    // Add close button
    content += `
        <div class="mt-3">
            <button class="btn btn-secondary btn-sm close-results">
                <i class="fas fa-times me-2"></i>Close
            </button>
        </div>
    `;
    
    resultsDiv.innerHTML = content;
    
    // Add event listener to close button
    const closeBtn = resultsDiv.querySelector('.close-results');
    closeBtn.addEventListener('click', () => {
        hideScriptInputs(closeBtn);
    });
}

function showError(resultsDiv, errorMessage) {
    resultsDiv.classList.remove('d-none');
    resultsDiv.innerHTML = `
        <div class="alert alert-danger">
            <h6><i class="fas fa-exclamation-triangle me-2"></i>Error</h6>
            <p class="mb-2">${escapeHtml(errorMessage)}</p>
            <small class="text-muted">Please check your inputs and try again.</small>
        </div>
        <div class="mt-3">
            <button class="btn btn-secondary btn-sm close-results">
                <i class="fas fa-times me-2"></i>Close
            </button>
        </div>
    `;
    
    // Add event listener to close button
    const closeBtn = resultsDiv.querySelector('.close-results');
    closeBtn.addEventListener('click', () => {
        hideScriptInputs(closeBtn);
    });
}

// Utility Functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Form Validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

// File Upload Helpers
function validateFileUpload(input) {
    const file = input.files[0];
    const maxSize = 16 * 1024 * 1024; // 16MB
    
    if (file && file.size > maxSize) {
        showNotification('File size exceeds 16MB limit', 'danger');
        input.value = '';
        return false;
    }
    
    return true;
}

// Add file upload validation
document.addEventListener('change', function(e) {
    if (e.target.type === 'file') {
        validateFileUpload(e.target);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape to close any open script inputs
    if (e.key === 'Escape') {
        const openInputs = document.querySelector('.script-inputs:not(.d-none)');
        if (openInputs) {
            const cancelBtn = openInputs.querySelector('.cancel-btn');
            if (cancelBtn) {
                hideScriptInputs(cancelBtn);
            }
        }
    }
});

// Initialize tooltips (if Bootstrap tooltips are needed)
if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Export functions for external use
window.PythonUtilityHub = {
    filterByCategory,
    performSearch,
    executeScript,
    showNotification
}; 