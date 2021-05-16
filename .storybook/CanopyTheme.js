// .storybook/YourTheme.js

import { create } from "@storybook/theming";
import Logo from "../src/stories/logodark.png";
export default create({
  base: "light",
  brandTitle: "Canopy",
  brandUrl: "https://www.canopy.cloud/",
  brandImage: Logo,
});
