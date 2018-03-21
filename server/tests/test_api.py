import unittest
from unittest.mock import patch, PropertyMock

from app.services.api import ApiService
from app.services.routes import RouteService
from app.services.status import StatusService, Situation


class TestApiServiceSituations(unittest.TestCase):

    def setUp(self):
        self.status_service = StatusServiceMock()
        self.route_service = RouteServiceMock()
        self.api_service = ApiServiceMock(
            self.status_service, self.route_service)

    def test_get_no_line_statuses(self):
        self.status_service.situations = []
        statuses = self.api_service.get_line_statuses()
        self.assertFalse(statuses)

    def test_get_one_line_status(self):
        # %m/%d/%Y %H:%M:%S
        situation = Situation("05/12/2018 8:12:22", "05/14/2018 8:12:22",
                              "Delays",
                              ["MTA NYCT_4"],
                              "Northbound [4] trains are running local from Crown Hts-Utica Av to Franklin Av because of NYCT Winter Weather Plan.")
        self.status_service.situations = [situation]
        statuses = self.api_service.get_line_statuses()
        self.assertTrue(statuses)
        self.assertEqual(1, len(statuses))


class ApiServiceMock(ApiService):

    def __init__(self, status_service, route_service):
        self.status_service = status_service
        self.route_service = route_service


class StatusServiceMock(StatusService):

    def __init__(self):
        pass

    def situations(self, situations):
        StatusService.__situations = situations


class RouteServiceMock(RouteService):
    pass
