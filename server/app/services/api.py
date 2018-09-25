from .status import StatusService
from .routes import RouteService
from .system.system_factory import get_service


class ApiService:
    """Handle gathering the data together for the API calls"""

    def __init__(self):
        self.status_service = StatusService()
        self.status_service.update_status()
        self.route_service = RouteService()
        self.system_service = get_service()

    def get_line_statuses(self):
        """Return the list of Statuses for all the lines"""
        situations = self.status_service.situations
        statuses = set()
        for situation in situations:
            for situation_route in situation.routes:
                route_info = self.route_service.get_route_from_identifier(
                    situation_route)
                response = ApiStatusResponse(
                    situation.reason, route_info, situation.start_time, situation.end_time, situation.long_description)
                statuses.add(response)
        return [status.serialize() for status in statuses]

    def get_system_info(self):
        """
        Return system information
        - IP Address
        - Connected to Network (Name if wifi)
        - Free Disk Space
        """
        ip_addresses = self.system_service.get_ip_address()
        wifi_name = self.system_service.get_connected_wifi()
        free_disk_space = self.system_service.get_free_space_in_mb()
        return SystemInfoResponse(ip_addresses, wifi_name, free_disk_space).serialize()


class SystemInfoResponse:
    """Response contains information about the system"""

    def __init__(self, ip_addresses, wifi_names, free_disk_space_in_mb):
        self.__ip_addresses = ip_addresses
        self.__wifi_names = wifi_names
        self.__free_disk_space_in_mb = free_disk_space_in_mb

    @property
    def ip_addresses(self):
        return self.__ip_addresses

    @property
    def wifi_name(self):
        return self.__wifi_names

    @property
    def free_disk_space_mb(self):
        return self.__free_disk_space_in_mb

    def serialize(self):
        return {
            'ipAddresses': self.__ip_addresses,
            'wifiNames': self.__wifi_names,
            'freeDiskSpaceInMb': self.__free_disk_space_in_mb,
        }


class ApiStatusResponse:
    """Response containing the Situation and Route information"""

    def __init__(self, reason, route, start_time, end_time, long_description):
        self.__reason = reason
        self.__route = route
        self.__start_time = start_time
        if end_time:
            self.__end_time = end_time
        else:
            self.__end_time = ''
        self.__long_description = long_description

    @property
    def reason(self):
        return self.__reason

    @property
    def start_time(self):
        return self.__start_time

    @property
    def end_time(self):
        return self.__end_time

    @property
    def route(self):
        return self.__route

    @property
    def long_description(self):
        return self.__long_description

    def __eq__(self, other):
        """Determine equality based on the contained route ID"""
        if isinstance(self, other.__class__):
            return self.route.id == other.route.id and self.route.express == other.route.express
        return False

    def __hash__(self):
        return hash((self.__route.id, self.__route.express))

    def serialize(self):
        return {
            'reason': self.__reason,
            'startTime': self.__start_time,
            'endTime': self.__end_time,
            'route': self.__route.serialize(),
            'longDescription': self.__long_description
        }
