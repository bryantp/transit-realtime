import csv
import os


class RouteNotFoundException(Exception):
    """Exception raised when a given Route cannot be found"""

    def __init__(self, message):
        self.message = message


class RouteService:
    """Handles retrieving and interacting with route information"""

    ROUTE_ID_KEY = "route_id"
    AGENCY_ID_KEY = "agency_id"
    ROUTE_SHORT_NAME_KEY = "route_short_name"
    ROUTE_LONG_NAME_KEY = "route_long_name"
    ROUTE_COLOR_KEY = "route_color"

    def __init__(self):
        self.routes = self.__read_routes()

    def __read_routes(self):
        with open(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../routes', 'routes.txt'))) as route_file:
            route = csv.DictReader(route_file)
            return {self.__generate_key(row): self.__create_routes(row) for row in route}

    def __generate_key(self, row):
        """Generate the key for the given Route"""
        agency_id = row[self.AGENCY_ID_KEY]
        route_id = row[self.ROUTE_ID_KEY]
        return "{0}_{1}".format(agency_id, route_id)

    def __create_routes(self, row):
        """Create a Route object from the given dictionary row"""
        return Route(
            row[self.ROUTE_ID_KEY],
            row[self.AGENCY_ID_KEY],
            row[self.ROUTE_SHORT_NAME_KEY],
            row[self.ROUTE_LONG_NAME_KEY],
            row[self.ROUTE_COLOR_KEY])

    def get_route_from_identifier(self, identifier):
        """Return the route ID given a full identifier"""
        if identifier not in self.routes:
            raise RouteNotFoundException(
                "Unable to find Route with identifier {0}".format(identifier))
        return self.routes[identifier]

    def get_all_routes(self):
        """Returns a list of all the routes"""
        return [value for value in self.routes.values()]


class Route:
    """Represents a single route in the MTA system"""

    def __init__(self, id, agency_id, short_name, long_name, color):
        self.__id = id
        self.__agency_id = agency_id
        self.__short_name = short_name
        self.__long_name = long_name
        self.__color = color

    @property
    def id(self):
        return self.__id

    @property
    def agency_id(self):
        return self.__agency_id

    @property
    def short_name(self):
        return self.__short_name

    @property
    def long_name(self):
        return self.__long_name

    @property
    def color(self):
        return self.__color

    @property
    def express(self):
        return self.short_name[-1:] == 'X' or "Express" in self.__long_name

    def __repr__(self):
        if self.express:
            return "<{0}>".format(self.short_name[:-1])
        return "({0})".format(self.short_name)

    def serialize(self):
        return {
            'id': self.__id,
            'agency_id': self.__agency_id,
            'short_name': self.__short_name,
            'long_name': self.__long_name,
            'color': self.__color,
            'express': self.express
        }
