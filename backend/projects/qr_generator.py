import qrcode
from io import BytesIO
import base64
from typing import Optional

def generate_qr(text: str, size: int = 10, border: int = 4) -> dict:
    """
    Generate QR code from text
    
    Args:
        text: Text to encode in QR code
        size: Size of the QR code (default: 10)
        border: Border size (default: 4)
        
    Returns:
        Dictionary with QR code data and info
    """
    try:
        if not text:
            raise ValueError("Text cannot be empty")
        
        # Create QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=size,
            border=border,
        )
        
        qr.add_data(text)
        qr.make(fit=True)
        
        # Create image
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Convert to base64 for web display
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return {
            "text": text,
            "qr_code": f"data:image/png;base64,{img_str}",
            "size": size,
            "border": border,
            "format": "PNG"
        }
        
    except Exception as e:
        return {
            "error": str(e),
            "text": text,
            "qr_code": None
        }

def generate_qr_with_logo(text: str, logo_path: Optional[str] = None, size: int = 10) -> dict:
    """Generate QR code with optional logo"""
    try:
        # For now, just generate regular QR code
        # Logo functionality would require more complex image processing
        return generate_qr(text, size)
        
    except Exception as e:
        return {
            "error": str(e),
            "text": text,
            "qr_code": None
        }

def generate_batch_qr(texts: list, size: int = 10) -> dict:
    """Generate multiple QR codes at once"""
    results = []
    
    for text in texts:
        result = generate_qr(text, size)
        results.append(result)
    
    return {
        "qr_codes": results,
        "count": len(results),
        "successful": len([r for r in results if r.get("qr_code")])
    } 