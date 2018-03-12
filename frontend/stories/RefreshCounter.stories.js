import React from "react";

import { storiesOf } from "@storybook/react";
import RefreshCounter from "../src/InformationStatusBarContainer/RefreshCounter/RefreshCounter";

const refreshCallback = () => {};

storiesOf("RefreshCounter", module)
  .add("30 Second Countdown", () => (
    <RefreshCounter
      refreshIntervalSeconds={30}
      refreshCallback={refreshCallback}
    />
  ))
  .add("60 Second Countdown", () => (
    <RefreshCounter
      refreshIntervalSeconds={60}
      refreshCallback={refreshCallback}
    />
  ))
  .add("2 minute Countdown", () => (
    <RefreshCounter
      refreshIntervalSeconds={120}
      refreshCallback={refreshCallback}
    />
  ))
  .add("1.5 hours Countdown", () => (
    <RefreshCounter
      refreshIntervalSeconds={5400}
      refreshCallback={refreshCallback}
    />
  ))
  .add("1 hour, 30 minutes, 45 seconds Countdown", () => (
    <RefreshCounter
      refreshIntervalSeconds={5445}
      refreshCallback={refreshCallback}
    />
  ));
