import unittest
from app.services.time import get_datetime, format_time
from datetime import datetime


class TestTimeParsing(unittest.TestCase):
    
    def test_midnight_time(self):
        time_string = "2018-02-20T00:00:00-05:00"
        datetime = get_datetime(time_string)
        self.assertIsNotNone(datetime)

    def test_afternoon_time(self):
        time_string = "2018-03-08T17:41:19-0500"
        datetime = get_datetime(time_string)
        self.assertIsNotNone(datetime)

    def test_format_string_none(self):
        formatted_string = format_time(None)
        self.assertIsNone(formatted_string)
        self.assertFalse(formatted_string)

    def test_format_string(self):
        formatted_string = format_time(datetime.now())
        self.assertIsNotNone(formatted_string)
        self.assertTrue(formatted_string)