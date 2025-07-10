import random
import string
from typing import Optional

def generate_password(length: int = 12, include_symbols: bool = True, include_numbers: bool = True, 
                     include_uppercase: bool = True, include_lowercase: bool = True) -> dict:
    """
    Generate a secure random password
    
    Args:
        length: Length of the password (default: 12)
        include_symbols: Include special symbols (default: True)
        include_numbers: Include numbers (default: True)
        include_uppercase: Include uppercase letters (default: True)
        include_lowercase: Include lowercase letters (default: True)
        
    Returns:
        Dictionary with password and generation info
    """
    try:
        if length < 1:
            raise ValueError("Password length must be at least 1")
        
        # Build character set
        characters = ""
        
        if include_lowercase:
            characters += string.ascii_lowercase
        if include_uppercase:
            characters += string.ascii_uppercase
        if include_numbers:
            characters += string.digits
        if include_symbols:
            characters += "!@#$%^&*()_+-=[]{}|;:,.<>?"
        
        if not characters:
            raise ValueError("At least one character type must be selected")
        
        # Generate password
        password = ''.join(random.choice(characters) for _ in range(length))
        
        # Calculate strength
        strength = calculate_strength(password)
        
        return {
            "password": password,
            "length": length,
            "strength": strength,
            "character_types": {
                "lowercase": include_lowercase,
                "uppercase": include_uppercase,
                "numbers": include_numbers,
                "symbols": include_symbols
            }
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "password": None
        }

def calculate_strength(password: str) -> str:
    """Calculate password strength"""
    score = 0
    
    # Length
    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if len(password) >= 16:
        score += 1
    
    # Character types
    if any(c.islower() for c in password):
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
        score += 1
    
    # Strength levels
    if score >= 6:
        return "Very Strong"
    elif score >= 4:
        return "Strong"
    elif score >= 3:
        return "Medium"
    else:
        return "Weak"

def generate_multiple_passwords(count: int = 5, length: int = 12, **kwargs) -> dict:
    """Generate multiple passwords at once"""
    passwords = []
    
    for i in range(count):
        result = generate_password(length=length, **kwargs)
        if result.get("password"):
            passwords.append(result)
    
    return {
        "passwords": passwords,
        "count": len(passwords)
    }

def generate_memorable_password(word_count: int = 4, separator: str = "-") -> dict:
    """Generate a memorable password using common words"""
    # Simple word list for demo
    words = [
        "apple", "banana", "cherry", "dragon", "elephant", "forest", "guitar", "hammer",
        "island", "jungle", "kitten", "lemon", "mountain", "ocean", "piano", "queen",
        "rabbit", "sunset", "tiger", "umbrella", "violin", "whale", "xylophone", "yellow", "zebra"
    ]
    
    try:
        selected_words = random.sample(words, min(word_count, len(words)))
        password = separator.join(selected_words)
        
        # Add some numbers for security
        password += str(random.randint(10, 99))
        
        return {
            "password": password,
            "words": selected_words,
            "type": "memorable"
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "password": None
        } 