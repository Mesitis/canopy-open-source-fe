/*
 * Copyright 2021 Canopy Pte Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
