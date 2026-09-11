import os
import requests
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# Zyte API Configuration
ZYTE_API_KEY = os.getenv("ZYTE_API_KEY")
ZYTE_API_URL = "https://api.zyte.com/v1/extract"

# Supabase Configuration
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if SUPABASE_URL and SUPABASE_KEY:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
else:
    supabase = None
    print("Warning: Supabase credentials not found. DB inserts will fail.")

def fetch_with_zyte(url: str, extract_type: str = "httpResponseBody"):
    """
    Fetches a URL using Zyte API.
    extract_type can be 'httpResponseBody' (raw HTML) or 'browserHtml' (rendered HTML).
    """
    if not ZYTE_API_KEY:
        raise ValueError("ZYTE_API_KEY is not set in environment variables.")
        
    payload = {
        "url": url,
        extract_type: True
    }
    
    response = requests.post(
        ZYTE_API_URL,
        auth=(ZYTE_API_KEY, ""),
        json=payload
    )
    
    if response.status_code == 200:
        data = response.json()
        if extract_type in data:
            import base64
            # Zyte returns base64 encoded strings for httpResponseBody/browserHtml
            return base64.b64decode(data[extract_type]).decode('utf-8')
        return data
    else:
        print(f"Zyte Request Failed: {response.status_code} - {response.text}")
        return None
