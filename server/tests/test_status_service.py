import unittest
from unittest.mock import MagicMock

import pytz
from datetime import datetime, timedelta
import requests
from app.services.status import StatusService
from app.services.time import format_time
import logging
import sys
import os

logger = logging.getLogger()
logger.level = logging.DEBUG


class MockedResponse:

    def __init__(self, response):
        self.__response = response

    @property
    def content(self):
        return self.__response


class TestStatusServiceSituations(unittest.TestCase):
    """Example Date Format - 2018-03-03T15:30:00-05:00"""

    def setUp(self):
        self.status_service = StatusService()
        self.stream_handler = logging.StreamHandler(sys.stdout)
        logger.addHandler(self.stream_handler)

    def test_situation_is_not_expired_and_has_started(self):
        start_time = datetime.now(pytz.timezone(
            'US/Eastern')) - timedelta(days=2)
        end_time = datetime.now(pytz.timezone(
            'US/Eastern')) + timedelta(days=1)
        xml = self.__get_xml_with_args(
            'situation_no_summary.xml', format_time(start_time), format_time(end_time))
        requests.get = MagicMock(return_value=MockedResponse(str.encode(xml)))
        self.status_service.update_status()
        situations = self.status_service.situations
        self.assertTrue(situations)  # The expiration date is in the future

    def test_sitation_is_expired(self):
        start_time = datetime.now(pytz.timezone(
            'US/Eastern')) - timedelta(days=2)
        end_time = datetime.now(pytz.timezone(
            'US/Eastern')) - timedelta(days=1)
        xml = self.__get_xml_with_args(
            'situation_no_summary.xml', format_time(start_time), format_time(end_time))
        requests.get = MagicMock(return_value=MockedResponse(str.encode(xml)))
        self.status_service.update_status()
        situations = self.status_service.situations
        self.assertFalse(situations)  # The expiration date is in the past

    def test_situation_has_not_started_yet(self):
        start_time = datetime.now(pytz.timezone(
            'US/Eastern')) + timedelta(days=2)
        end_time = ""
        xml = self.__get_xml_with_args(
            'situation_no_summary.xml', format_time(start_time), format_time(end_time))
        requests.get = MagicMock(return_value=MockedResponse(str.encode(xml)))
        self.status_service.update_status()
        situations = self.status_service.situations
        self.assertFalse(situations)  # The start date is in the future

    def test_situation_with_resumed_summary(self):
        start_time = datetime.now(pytz.timezone(
            'US/Eastern')) - timedelta(days=2)
        end_time = datetime.now(pytz.timezone(
            'US/Eastern')) + timedelta(days=1)
        xml = self.__get_xml_with_args('situation_with_summary.xml', format_time(
            start_time), format_time(end_time), "Service has Resumed")
        requests.get = MagicMock(return_value=MockedResponse(str.encode(xml)))
        self.status_service.update_status()
        situations = self.status_service.situations
        self.assertFalse(situations)  # The start date is in the future

    def __get_xml_with_args(self, file_name, *args):
        current_dir = os.path.dirname(os.path.realpath(__file__))
        with open(os.path.abspath(os.path.join(current_dir, 'data', file_name)), 'r') as xml:
            raw_xml = xml.read()
            raw_xml = raw_xml.format(*args)
            return raw_xml

    def tearDown(self):
        logger.removeHandler(self.stream_handler)


if __name__ == '__main__':
    unittest.main()
