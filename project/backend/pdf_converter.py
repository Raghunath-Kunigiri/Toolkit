import os
from PIL import Image
from pdf2image import convert_from_path
from docx import Document
from fpdf import FPDF
import base64
import io

def image_to_pdf(image_data: str) -> bytes:
    """Convert base64 image to PDF"""
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data.split(',')[1] if ',' in image_data else image_data)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Create PDF
        pdf = FPDF()
        pdf.add_page()
        
        # Convert image to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
            
        # Save image as temporary file
        temp_img = 'temp_image.jpg'
        image.save(temp_img, 'JPEG')
        
        # Add image to PDF
        pdf.image(temp_img, x=10, y=10, w=190)
        
        # Get PDF as bytes
        pdf_bytes = pdf.output(dest='S').encode('latin1')
        
        # Clean up
        os.remove(temp_img)
        
        return pdf_bytes
    except Exception as e:
        raise Exception(f"Failed to convert image to PDF: {str(e)}")

def pdf_to_images(pdf_data: str) -> list:
    """Convert PDF to list of base64 images"""
    try:
        # Decode base64 PDF
        pdf_bytes = base64.b64decode(pdf_data.split(',')[1] if ',' in pdf_data else pdf_data)
        
        # Save PDF temporarily
        temp_pdf = 'temp.pdf'
        with open(temp_pdf, 'wb') as f:
            f.write(pdf_bytes)
        
        # Convert PDF to images
        images = convert_from_path(temp_pdf)
        
        # Convert images to base64
        base64_images = []
        for i, image in enumerate(images):
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='PNG')
            img_byte_arr = img_byte_arr.getvalue()
            base64_image = base64.b64encode(img_byte_arr).decode()
            base64_images.append(f"data:image/png;base64,{base64_image}")
        
        # Clean up
        os.remove(temp_pdf)
        
        return base64_images
    except Exception as e:
        raise Exception(f"Failed to convert PDF to images: {str(e)}")

def text_to_pdf(text: str) -> bytes:
    """Convert text to PDF"""
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        
        # Split text into lines and add to PDF
        lines = text.split('\n')
        for line in lines:
            pdf.multi_cell(0, 10, txt=line)
        
        return pdf.output(dest='S').encode('latin1')
    except Exception as e:
        raise Exception(f"Failed to convert text to PDF: {str(e)}")

def main(conversion_type: str, input_data: str) -> dict:
    """
    Main function to handle different types of PDF conversions
    Args:
        conversion_type: Type of conversion ('image_to_pdf', 'pdf_to_images', 'text_to_pdf')
        input_data: Base64 encoded input data or text
    Returns:
        dict: Result of the conversion
    """
    try:
        if conversion_type == "image_to_pdf":
            pdf_bytes = image_to_pdf(input_data)
            return {
                "success": True,
                "result": base64.b64encode(pdf_bytes).decode(),
                "message": "Successfully converted image to PDF"
            }
            
        elif conversion_type == "pdf_to_images":
            images = pdf_to_images(input_data)
            return {
                "success": True,
                "result": images,
                "message": f"Successfully converted PDF to {len(images)} images"
            }
            
        elif conversion_type == "text_to_pdf":
            pdf_bytes = text_to_pdf(input_data)
            return {
                "success": True,
                "result": base64.b64encode(pdf_bytes).decode(),
                "message": "Successfully converted text to PDF"
            }
            
        else:
            raise ValueError(f"Unsupported conversion type: {conversion_type}")
            
    except Exception as e:
        return {
            "success": False,
            "result": None,
            "message": str(e)
        }

if __name__ == "__main__":
    # Test text to PDF conversion
    result = main("text_to_pdf", "Hello, this is a test document.\nThis is a new line.")
    print(result["message"]) 