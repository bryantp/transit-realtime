from datetime import datetime

FORMAT_STRING = "%Y-%m-%dT%H:%M:%S%z"

def get_datetime(time):
    """Return a datetime object for the given input string"""
    if ":" == time[-3:-2]: # Fix for the colon in the TZ information
        time = time[:-3]+time[-2:]
    return datetime.strptime(time, FORMAT_STRING)

def format_time(time):
    """Return a formated string for the given datetime object"""
    if not time:
        return time
    return time.strftime(FORMAT_STRING)