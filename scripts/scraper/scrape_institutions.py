import os
import json
from bs4 import BeautifulSoup
from zyte_client import fetch_with_zyte, supabase

def parse_aicte_data(html_content):
    """
    Parses HTML content from AICTE or similar portal to extract university data.
    This is a boilerplate parser that needs to be tuned to the exact HTML structure
    of the target portal.
    """
    soup = BeautifulSoup(html_content, 'html.parser')
    institutions = []
    
    # Example logic: Look for table rows with university data
    # Note: Replace '.university-row' with the actual class name on the target site
    rows = soup.select('.university-row') 
    
    for row in rows:
        try:
            name = row.select_one('.uni-name').text.strip()
            state = row.select_one('.uni-state').text.strip()
            city = row.select_one('.uni-city').text.strip()
            type_str = row.select_one('.uni-type').text.strip()
            
            # Map to our enum
            inst_type = 'university'
            if 'college' in type_str.lower(): inst_type = 'college'
            elif 'polytechnic' in type_str.lower(): inst_type = 'polytechnic'
            
            institutions.append({
                'name': name,
                'location': f"{city}, {state}",
                'type': inst_type,
                'is_verified': True,
                'verification_status': 'verified',
                'domains': ['Computer Science', 'Engineering', 'Management'] # Mock domains
            })
        except Exception as e:
            print(f"Error parsing row: {e}")
            
    return institutions

def run_institution_scraper():
    print("Starting Institution Scraper using Zyte...")
    
    target_url = "https://facilities.aicte-india.org/dashboard/pages/dashboardaicte.php"
    
    # 1. Fetch data
    try:
        print(f"Fetching data from {target_url}...")
        html = fetch_with_zyte(target_url, extract_type="browserHtml") # Using browserHtml for JS rendering
        
        if not html:
            print("Failed to retrieve HTML.")
            return
            
    except ValueError as e:
        print(f"Configuration Error: {e}")
        print("Please add ZYTE_API_KEY to your environment variables.")
        return

    # 2. Parse data
    print("Parsing HTML...")
    # NOTE: Since we don't know the exact structure without a live proxy, 
    # we'll use fallback real data for the demonstration if parsing returns empty.
    institutions = parse_aicte_data(html)
    
    if not institutions:
        print("No institutions parsed from live site. Using curated fallback data based on top NIRF institutions.")
        institutions = [
            {'name': 'Indian Institute of Technology (IIT) Bombay', 'location': 'Mumbai, Maharashtra', 'type': 'university', 'is_verified': True, 'verification_status': 'verified'},
            {'name': 'Indian Institute of Technology (IIT) Delhi', 'location': 'New Delhi', 'type': 'university', 'is_verified': True, 'verification_status': 'verified'},
            {'name': 'National Institute of Technology (NIT) Trichy', 'location': 'Tiruchirappalli, Tamil Nadu', 'type': 'university', 'is_verified': True, 'verification_status': 'verified'},
            {'name': 'Vellore Institute of Technology (VIT)', 'location': 'Vellore, Tamil Nadu', 'type': 'university', 'is_verified': True, 'verification_status': 'verified'},
            {'name': 'Birla Institute of Technology and Science (BITS)', 'location': 'Pilani, Rajasthan', 'type': 'university', 'is_verified': True, 'verification_status': 'verified'}
        ]
        
    # 3. Load into Supabase
    if supabase:
        print(f"Upserting {len(institutions)} institutions into Supabase...")
        try:
            response = supabase.table('institutions').upsert(institutions, on_conflict='name').execute()
            print("Successfully inserted institutions!")
        except Exception as e:
            print(f"Database insertion failed: {e}")
    else:
        print("Skipping DB insertion. Scraped Data:")
        print(json.dumps(institutions, indent=2))

if __name__ == "__main__":
    run_institution_scraper()
