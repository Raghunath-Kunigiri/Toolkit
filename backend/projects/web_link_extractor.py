import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re
from typing import Dict, List, Any

def extract_links(url: str, max_links: int = 50, filter_internal: bool = False, 
                 filter_external: bool = False, include_emails: bool = True) -> Dict[str, Any]:
    """
    Extract all links from a given webpage
    
    Args:
        url: URL of the webpage to extract links from
        max_links: Maximum number of links to return (default: 50)
        filter_internal: Only show internal links (same domain)
        filter_external: Only show external links (different domain)
        include_emails: Include email links (mailto:)
        
    Returns:
        Dictionary with extracted links and metadata
    """
    try:
        # Clean and validate URL
        url = url.strip()
        if not url:
            raise ValueError("URL cannot be empty")
        
        # Add protocol if missing
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        
        # Make request with headers to avoid blocking
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract base domain for filtering
        base_domain = urlparse(url).netloc
        
        # Find all links
        link_elements = soup.find_all('a', href=True)
        
        extracted_links = []
        email_links = []
        
        for link_elem in link_elements:
            href = link_elem.get('href', '').strip()
            text = link_elem.get_text(strip=True) or 'No text'
            
            if not href:
                continue
            
            # Handle email links
            if href.startswith('mailto:'):
                if include_emails:
                    email_links.append({
                        'url': href,
                        'text': text,
                        'type': 'email'
                    })
                continue
            
            # Convert relative URLs to absolute
            full_url = urljoin(url, href)
            
            # Parse URL for domain filtering
            parsed_url = urlparse(full_url)
            is_internal = parsed_url.netloc == base_domain or parsed_url.netloc == ''
            
            # Apply filters
            if filter_internal and not is_internal:
                continue
            if filter_external and is_internal:
                continue
            
            # Skip common non-useful links
            if href.startswith(('#', 'javascript:', 'tel:')):
                continue
            
            link_info = {
                'url': full_url,
                'text': text,
                'type': 'internal' if is_internal else 'external',
                'domain': parsed_url.netloc or base_domain
            }
            
            extracted_links.append(link_info)
        
        # Limit results
        if max_links > 0:
            extracted_links = extracted_links[:max_links]
            email_links = email_links[:max_links//2]
        
        # Get page metadata
        page_title = soup.find('title')
        page_title = page_title.get_text(strip=True) if page_title else 'No title'
        
        meta_description = soup.find('meta', attrs={'name': 'description'})
        page_description = meta_description.get('content', 'No description') if meta_description else 'No description'
        
        # Categorize links
        internal_count = len([l for l in extracted_links if l['type'] == 'internal'])
        external_count = len([l for l in extracted_links if l['type'] == 'external'])
        
        return {
            'success': True,
            'url': url,
            'page_title': page_title,
            'page_description': page_description,
            'total_links_found': len(link_elements),
            'links_returned': len(extracted_links),
            'email_links_returned': len(email_links),
            'internal_links_count': internal_count,
            'external_links_count': external_count,
            'links': extracted_links,
            'email_links': email_links,
            'filters_applied': {
                'max_links': max_links,
                'filter_internal': filter_internal,
                'filter_external': filter_external,
                'include_emails': include_emails
            }
        }
        
    except requests.RequestException as e:
        return {
            'success': False,
            'error': f'Failed to fetch webpage: {str(e)}',
            'url': url
        }
    except Exception as e:
        return {
            'success': False,
            'error': f'Error processing webpage: {str(e)}',
            'url': url
        }

def get_domain_links(url: str, max_links: int = 20) -> Dict[str, Any]:
    """Get only internal links from the same domain"""
    return extract_links(url, max_links=max_links, filter_internal=True)

def get_external_links(url: str, max_links: int = 20) -> Dict[str, Any]:
    """Get only external links from different domains"""
    return extract_links(url, max_links=max_links, filter_external=True)

def get_email_links(url: str) -> Dict[str, Any]:
    """Extract only email links from the webpage"""
    result = extract_links(url, max_links=100, include_emails=True)
    if result.get('success'):
        # Return only email information
        return {
            'success': True,
            'url': url,
            'page_title': result['page_title'],
            'email_links': result['email_links'],
            'email_count': len(result['email_links'])
        }
    return result 