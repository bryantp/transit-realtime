import React from "react";

import { storiesOf } from "@storybook/react";
import TimeInformation from "../src/InformationStatusBarContainer/TimeInformation/TimeInformation";

storiesOf("TimeInformation", module).add("Display the current time", () => (
  <TimeInformation />
));
