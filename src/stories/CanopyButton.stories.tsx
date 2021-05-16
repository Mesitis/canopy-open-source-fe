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
import CanopyButton from "../Components/CanopyButton";
import Mock from "../Components/CanopyTable/mock";

export default {
  title: "Canopy Components/CanopyButton",
  component: CanopyButton,
  argTypes: { onClick: { action: "clicked" } },
};

const Template = (args: any) => <CanopyButton {...args}></CanopyButton>;

export const SolidButton = Template.bind({});
//@ts-ignore
SolidButton.args = {
  variant: "solid",
  children: "Apply Filter",
  width: "154px",
  height: "35px",
  fontSize: "13px",
};

export const OutlineButton = Template.bind({});
//@ts-ignore
OutlineButton.args = {
  variant: "outline",
  children: "Apply Filter",
  width: "154px",
  height: "35px",
  fontSize: "13px",
  border: "1px solid #398E40",
};

export const GhostButton = Template.bind({});
//@ts-ignore
GhostButton.args = {
  variant: "ghost",
  children: "Apply Filter",
  width: "154px",
  height: "35px",
  fontSize: "13px",
};

export const LinkButton = Template.bind({});
//@ts-ignore
LinkButton.args = {
  variant: "link",
  children: "Apply Filter",
  width: "154px",
  height: "35px",
  fontSize: "13px",
};
