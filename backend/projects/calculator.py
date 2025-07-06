import re
import math
from typing import Union

def calculate(expression: str) -> dict:
    """
    Calculate mathematical expressions safely
    
    Args:
        expression: Mathematical expression as string
        
    Returns:
        Dictionary with result and expression
    """
    try:
        # Clean the expression
        expression = expression.strip()
        
        # Replace some common math functions
        expression = expression.replace('sin', 'math.sin')
        expression = expression.replace('cos', 'math.cos')
        expression = expression.replace('tan', 'math.tan')
        expression = expression.replace('sqrt', 'math.sqrt')
        expression = expression.replace('log', 'math.log')
        expression = expression.replace('pi', 'math.pi')
        expression = expression.replace('e', 'math.e')
        
        # Only allow safe characters and operations
        allowed_chars = set('0123456789+-*/.()mathlsincogtanqrpie ')
        if not all(c in allowed_chars for c in expression):
            raise ValueError("Invalid characters in expression")
        
        # Evaluate the expression
        result = eval(expression)
        
        return {
            "expression": expression,
            "result": result,
            "type": type(result).__name__
        }
        
    except Exception as e:
        return {
            "expression": expression,
            "error": str(e),
            "result": None
        }

def add(a: float, b: float) -> float:
    """Add two numbers"""
    return a + b

def subtract(a: float, b: float) -> float:
    """Subtract two numbers"""
    return a - b

def multiply(a: float, b: float) -> float:
    """Multiply two numbers"""
    return a * b

def divide(a: float, b: float) -> float:
    """Divide two numbers"""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(a: float, b: float) -> float:
    """Raise a to the power of b"""
    return a ** b

def square_root(a: float) -> float:
    """Calculate square root"""
    if a < 0:
        raise ValueError("Cannot calculate square root of negative number")
    return math.sqrt(a) 