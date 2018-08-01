import React from "react";

import { storiesOf } from "@storybook/react";
import LineStatus from "../src/LineStatusContainer/LineStatus/LineStatus";
import { MemoryRouter } from "react-router-dom";


storiesOf("LineStatus", module)
  .addDecorator(story => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("Delayed 6 Express Line", () => (
    <LineStatus
      route="6"
      color="#B933AD"
      status="Delayed"
      reportedDateTime="3/6/2018 21:05"
      alert
      express
    />
  ))
  .add("Delayed 6 Local Line", () => (
    <LineStatus
      route="6"
      color="#B933AD"
      status="Delayed"
      reportedDateTime="3/6/2018 21:05"
      alert
    />
  ))
  .add("6 Express Line", () => (
    <LineStatus
      route="6"
      color="#B933AD"
      status="On Time"
      reportedDateTime="3/6/2018 21:05"
      express
    />
  ))
  .add("6 Local Line", () => (
    <LineStatus
      route="6"
      color="#B933AD"
      status="On Time"
      reportedDateTime="3/6/2018 21:05"
    />
  ));
