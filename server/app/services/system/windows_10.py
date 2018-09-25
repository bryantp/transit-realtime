import netifaces as ni
import subprocess
import re

from .system import SystemService


class WindowsSystemService(SystemService):
    """Service for retrieving system information"""

    def __init__(self):
        self.ssid_pattern = re.compile(r"^\W+SSID\W+(.*)$", re.MULTILINE)

    def get_connected_wifi(self):
        """Return the connection status for the wifi if in use"""
        output = subprocess.check_output("netsh wlan show interfaces")
        ssids = self.ssid_pattern.search(str(output, "utf-8"))
        if ssids:
            return [ssid.strip() for ssid in ssids.groups()]
        return None
