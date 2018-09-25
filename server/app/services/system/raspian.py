import netifaces as ni
import subprocess

from .system import SystemService


class RaspianSystemService(SystemService):
    """Service for retrieving system information"""

    def get_connected_wifi(self):
        """Return the connection status for the wifi if in use"""
        output = subprocess.check_output("iwgetid")
        output = str(output, "utf-8")
        ssid_location = output.find('ESSID:"')
        return output[ssid_location]
