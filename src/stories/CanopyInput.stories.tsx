import React from "react";
import CanopyInput from "../Components/CanopyInput";

export default {
  title: "Canopy Components/CanopyInput",
  component: CanopyInput,
};

const Template = (args: any) => <CanopyInput {...args}></CanopyInput>;

export const EnabledInput = Template.bind({});
//@ts-ignore
EnabledInput.args = {
  width: "full",
  placeholder: "Enter filter name",
  height: "35px",
  _focus: {
    border: "1px solid black",
    backgroundColor: "transparent",
  },
  _active: {
    border: "1px solid black",
    backgroundColor: "transparent",
  },
  _hover: {
    border: "1px solid black",
    backgroundColor: "transparent",
  },
  border: "1px solid black",
};
export const DisabledInput = Template.bind({});
//@ts-ignore
DisabledInput.args = {
  width: "full",
  placeholder: "Enter filter name",
  height: "35px",
  _focus: {
    border: "1px solid black",
    backgroundColor: "transparent",
  },
  _active: {
    border: "1px solid black",
    backgroundColor: "transparent",
  },
  _hover: {
    border: "1px solid black",
    backgroundColor: "transparent",
  },
  border: "1px solid black",
  disabled: true,
};
