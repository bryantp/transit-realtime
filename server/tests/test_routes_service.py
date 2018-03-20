import unittest

from app.services.routes import RouteService, RouteNotFoundException


class TestStatusServiceSituations(unittest.TestCase):

    def setUp(self):
        self.route_service = RouteService()

    def test_routes_exist(self):
        routes = self.route_service.get_all_routes()
        self.assertTrue(routes)

    def test_get_route_from_id_no_exist(self):
        with self.assertRaises(RouteNotFoundException):
            self.route_service.get_route_from_identifier("DOES NOT EXIST")

    def test_get_route_from_id(self):
        route = self.route_service.get_route_from_identifier("MTA NYCT_7")
        self.assertTrue(route)
        self.assertEqual("7", route.id)
        self.assertEqual("MTA NYCT", route.agency_id)
        self.assertEqual("Flushing Local", route.long_name)
        self.assertEqual(False, route.express)
