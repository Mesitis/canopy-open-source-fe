import React from "react";
import SpinnerOverlay from "../Components/SpinnerOverlay";

export default {
  title: "Canopy Components/SpinnerOverlay",
  component: SpinnerOverlay,
};

const Template = (args: any) => <SpinnerOverlay {...args}></SpinnerOverlay>;

export const Primary = Template.bind({});
//@ts-ignore
Primary.args = {
  text: "Loading",
};
