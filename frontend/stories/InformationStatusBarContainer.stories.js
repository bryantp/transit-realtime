import React from "react";

import { storiesOf } from "@storybook/react";
import InformationStatusBarContainer from "../src/InformationStatusBarContainer/InformationStatusBarContainer";

storiesOf("InformationStatusBarContainer", module).add("Normal Header", () => (
  <InformationStatusBarContainer refreshIntervalSeconds={10} />
));
