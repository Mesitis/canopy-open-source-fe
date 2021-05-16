// .storybook/manager.js

import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import CanopyTheme from "./CanopyTheme";
addons.setConfig({
  theme: CanopyTheme,
});
