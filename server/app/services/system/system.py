from abc import ABC, abstractmethod
import netifaces as ni
import psutil


class SystemService(ABC):

    def get_ip_address(self):
        """Return the IP Address of the system"""
        interfaces = ni.interfaces()
        ethernet_connections = []
        wireless_connections = []
        for interface in interfaces:
            address_families = ni.ifaddresses(interface)
            if ni.AF_LINK in address_families:
                af_link = address_families[ni.AF_LINK]
                ethernet_connections += [connection['addr']
                                         for connection in af_link if connection['addr']]
            if ni.AF_INET in address_families:
                af_inet = address_families[ni.AF_INET]
                wireless_connections += [connection['addr']
                                         for connection in af_inet if connection['addr']]

        return wireless_connections + ethernet_connections

    @abstractmethod
    def get_connected_wifi(self):
        pass

    def get_free_space_in_mb(self):
        free_space = psutil.disk_usage(".").free
        return round(free_space / 1024 / 1024)
