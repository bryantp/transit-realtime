import requests
from lxml import etree
from datetime import datetime
import pytz
import re
import logging
import sys
from .time import get_datetime


class StatusService:
    """Retrieve the current status from the MTA"""

    STATUS_URL = "http://web.mta.info/status/ServiceStatusSubway.xml"
    NAME_SPACES = {"siri": "http://www.siri.org.uk/siri"}

    START_TIME_XPATH_QUERY = ".//siri:StartTime/text()"
    END_TIME_XPATH_QUERY = ".//siri:EndTime/text()"
    REASON_XPATH_QUERY = ".//siri:ReasonName/text()"
    IS_PLANNED_XPATH_QUERY = ".//siri:Planned/text()"
    ROUTE_XPATH_QUERY = ".//siri:AffectedVehicleJourney/siri:LineRef/text()"
    SUMMARY_XPATH_QUERY = ".//siri:Summary/text()"

    logger = logging.getLogger()
    stream_handler = logging.StreamHandler(sys.stdout)
    logger.addHandler(stream_handler)

    def __init__(self):
        self.__situations = []

    @property
    def situations(self):
        return self.__situations

    def update_status(self):
        """Update the current status"""
        raw_data = requests.get(self.STATUS_URL)
        tree = etree.fromstring(raw_data.content)
        situations = tree.xpath(
            "//siri:PtSituationElement", namespaces=self.NAME_SPACES)
        self.__situations = [self.__create_situation(
            situation) for situation in situations if self.__should_include(situation)]

    def __should_include(self, situation):
        """Determines if the given situation should be included in the list"""
        start_time = situation.xpath(
            self.START_TIME_XPATH_QUERY, namespaces=self.NAME_SPACES)
        end_time = situation.xpath(
            self.END_TIME_XPATH_QUERY, namespaces=self.NAME_SPACES)
        summary = situation.xpath(
            self.SUMMARY_XPATH_QUERY, namespaces=self.NAME_SPACES)

        if start_time and not self.__is_started(str(start_time[0])):
            self.logger.debug("Situation hasn't started yet. Start Time: {0}".format(start_time[0]))
            return False

        # Check for an end time, and see if it has passed or not.
        if end_time and self.__is_expired(str(end_time[0])):
            self.logger.debug("Situation has expired. End Time: {0}".format(end_time[0]))
            return False

        if summary and re.search("resumed", summary[0], re.IGNORECASE):
            self.logger.debug("Situation has resumed. Summary: {0}".format(summary[0]))
            return False

        return True

    def __is_started(self, start_time):
        """Determine if the given situation has started yet"""
        start_timestamp = get_datetime(start_time)
        now = datetime.now(pytz.timezone('US/Eastern'))
        return now >= start_timestamp

    def __is_expired(self, end_time):
        """Determine if the given situation is expired"""
        end_timestamp = get_datetime(end_time)
        now = datetime.now(pytz.timezone('US/Eastern'))
        return now >= end_timestamp 

    def __create_situation(self, situation):
        """Generate list delay reason"""
        start_time = situation.xpath(
            self.START_TIME_XPATH_QUERY, namespaces=self.NAME_SPACES)
        end_time = situation.xpath(
            self.END_TIME_XPATH_QUERY, namespaces=self.NAME_SPACES)
        reason = situation.xpath(
            self.REASON_XPATH_QUERY, namespaces=self.NAME_SPACES)
        routes = situation.xpath(
            self.ROUTE_XPATH_QUERY, namespaces=self.NAME_SPACES)

        if start_time:
            start_time = get_datetime(str(start_time[0]))

        if end_time:
            end_time = get_datetime(str(end_time[0]))

        if reason:
            reason = str(reason[0])

        if routes:
            routes = {str(route).strip() for route in routes}
        
        return Situation(start_time, end_time, reason, routes)

class Situation:
    """Contains information about an alert"""

    DATE_TIME_FORMAT = "%m/%d/%Y %H:%M:%S"

    def __init__(self, start_time, end_time, reason, routes):
        self.__start_time = start_time
        self.__end_time = end_time
        self.__reason = reason
        self.routes = routes

    @property
    def start_time(self):
        return self.__start_time

    @property
    def end_time(self):
        return self.__end_time

    @property
    def reason(self):
        return self.__reason

    def __repr__(self):
        if self.start_time and self.end_time:
            return "Situation - [Start: {0}], [End: {1}], [Reason: {2}], [Affected Routes: {3}]".format(
                self.start_time.strftime(self.DATE_TIME_FORMAT),
                self.end_time.strftime(self.DATE_TIME_FORMAT),
                self.reason,
                self.routes)
        return "Situation - [Start: {0}], [Reason: {1}], [Affected Routes: {2}]".format(
            self.start_time.strftime(self.DATE_TIME_FORMAT),
            self.reason,
            self.routes)
