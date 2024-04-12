from datetime import datetime
from dateutil import tz
import re


def strip_time_from_datetime(datetime_to_strip):

    formatted_datetime = convert_date_to_iso(datetime_to_strip)

    date_str, _ = formatted_datetime.split('T')

    stripped_date = datetime.strptime(date_str, '%Y-%m-%d').date()

    return stripped_date

def convert_date_to_iso(date_str):
    if is_date_iso(date_str):
        return date_str

    # Parse the date string into a datetime object
    date_obj = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %Z')
    
    # Convert to UTC timezone
    date_obj = date_obj.replace(tzinfo=tz.tzutc())
    
    # Convert to ISO 8601 format, adding 'Z' to denote UTC timezone
    iso_format_date = date_obj.isoformat(timespec='milliseconds') + 'Z'
    
    return iso_format_date

def is_date_iso(date_str):
    # If the date is already in ISO format, return it as is
    iso_regex = r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$'
    return re.match(iso_regex, date_str)