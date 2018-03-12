from .status import StatusService
from .routes import RouteService
from flask import jsonify


class ApiService:
    """Handle gathering the data together for the API calls"""

    def __init__(self):
        self.status_service = StatusService()
        self.status_service.update_status()
        self.route_service = RouteService()

    def get_line_statuses(self):
        """Return the list of Statuses for all the lines"""
        situations = self.status_service.situations
        statuses = set()
        for situation in situations:
            for situation_route in situation.routes:
                route_info = self.route_service.get_route_from_identifier(
                    situation_route)
                response = ApiStatusResponse(
                    situation.reason, route_info, situation.start_time)
                statuses.add(response)
        as_serialized_list = [status.serialize() for status in statuses]
        return jsonify(as_serialized_list)


class ApiStatusResponse:
    """Response containing the Situation and Route information"""

    def __init__(self, reason, route, start_time):
        self.__reason = reason
        self.__route = route
        self.__start_time = start_time

    @property
    def reason(self):
        return self.__reason

    @property
    def start_time(self):
        return self.__start_time

    @property
    def route(self):
        return self.__route

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
            'route': self.__route.serialize(),
        }
