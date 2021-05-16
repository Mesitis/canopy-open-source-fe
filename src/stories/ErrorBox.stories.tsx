import React from "react";
import ErrorBox from "../Components/ErrorBox";

export default {
  title: "Canopy Components/ErrorBox",
  component: ErrorBox,
};

const Template = (args: any) => <ErrorBox {...args}></ErrorBox>;

export const Primary = Template.bind({});
//@ts-ignore
Primary.args = {
  position: "relative",
  height: "200px",
  backgroundColor: "#FFFFFF",
  color: "#323232",
  error: "No Data Availble",
};
