import React from "react";

import { storiesOf } from "@storybook/react";
import LineStatusContainer from "../src/LineStatusContainer/LineStatusContainer";

const fourLineStatuses = [
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "FF6319",
      id: "D",
      long_name: "6 Avenue Express",
      express: true,
      short_name: "D"
    },
    startTime: "Mon, 08 Jan 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "FCCC0A",
      id: "Q",
      long_name: "Broadway Express",
      express: true,
      short_name: "Q"
    },
    startTime: "Tue, 06 Mar 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "FCCC0A",
      id: "W",
      long_name: "Broadway Local",
      express: false,
      short_name: "W"
    },
    startTime: "Tue, 06 Mar 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "00933C",
      id: "5",
      long_name: "Lexington Avenue Express",
      express: true,
      short_name: "5"
    },
    startTime: "Mon, 26 Feb 2018 00:00:00 GMT"
  }
];

const longList = [
  {
    reason: "Delayed",
    route: {
      agency_id: "MTA NYCT",
      color: "00933C",
      express: false,
      id: "6",
      long_name: "Lexington Avenue Local",
      short_name: "6"
    },
    startTime: "Mon, 26 Feb 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "EE352E",
      express: true,
      id: "3",
      long_name: "7 Avenue Express",
      short_name: "3"
    },
    startTime: "Mon, 05 Mar 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "FF6319",
      express: false,
      id: "M",
      long_name: "QNS BLVD-6th AVE/ Myrtle Local",
      short_name: "M"
    },
    startTime: "Mon, 26 Feb 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "FF6319",
      express: true,
      id: "D",
      long_name: "6 Avenue Express",
      short_name: "D"
    },
    startTime: "Mon, 08 Jan 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "FCCC0A",
      express: true,
      id: "Q",
      long_name: "Broadway Express",
      short_name: "Q"
    },
    startTime: "Tue, 06 Mar 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "EE352E",
      express: true,
      id: "2",
      long_name: "7 Avenue Express",
      short_name: "2"
    },
    startTime: "Mon, 26 Feb 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "00933C",
      express: true,
      id: "5",
      long_name: "Lexington Avenue Express",
      short_name: "5"
    },
    startTime: "Mon, 26 Feb 2018 00:00:00 GMT"
  },
  {
    reason: "Planned Work",
    route: {
      agency_id: "MTA NYCT",
      color: "2850AD",
      express: false,
      id: "C",
      long_name: "8 Avenue Local",
      short_name: "C"
    },
    startTime: "Mon, 05 Mar 2018 00:00:00 GMT"
  },
  {
    reason: "Delays",
    route: {
      agency_id: "MTA NYCT",
      color: "FCCC0A",
      express: false,
      id: "N",
      long_name: "Broadway Local",
      short_name: "N"
    },
    startTime: "Wed, 07 Mar 2018 14:34:00 GMT"
  },
  {
    reason: "Delays",
    route: {
      agency_id: "MTA NYCT",
      color: "FCCC0A",
      express: false,
      id: "W",
      long_name: "Broadway Local",
      short_name: "W"
    },
    startTime: "Wed, 07 Mar 2018 14:34:00 GMT"
  },
  {
    reason: "Delays",
    route: {
      agency_id: "MTA NYCT",
      color: "FCCC0A",
      express: false,
      id: "R",
      long_name: "Broadway Local",
      short_name: "R"
    },
    startTime: "Wed, 07 Mar 2018 14:34:00 GMT"
  }
];

storiesOf("LineStatusContainer", module)
  .add("Is Loading", () => <LineStatusContainer isLoading={true} />)
  .add("4 Lines", () => <LineStatusContainer statusList={fourLineStatuses} />)
  .add("Many Lines", () => <LineStatusContainer statusList={longList} />);
