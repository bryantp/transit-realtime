import subprocess

from .system import SystemService

class MacOsSystemService(SystemService):
    """Service for retrieving system information"""

    def get_connected_wifi(self):
        """Return the connection status for the wifi if in use"""
        output = subprocess.check_output(
            "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I | awk '/ SSID/ {print substr($0, index($0, $2))}'",
            shell=True, 
            executable='/bin/bash')
        if output:
            return [str(output, "utf-8").strip()]
        return []