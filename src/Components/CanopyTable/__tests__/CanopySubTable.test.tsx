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
import { mount } from "../CanopyTable/Cells/node_modules/enzyme";
import CanopySubTable from "../CanopySubTable";
import theme from "../../../styles/colors";
import { ChakraProvider } from "@chakra-ui/react";
import { act } from "react-dom/test-utils";
import * as visualiserMock from "../Mocks/visualiserMock.json";
let wrapper: any;
const _visualiserMock: Record<string, string> = visualiserMock;
const setSubRows = jest.fn();
const redirectTo = jest.fn();
const t = (value: string) => {
  return _visualiserMock[value];
};
const setState = jest.fn();

//@ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rows: [] }),
  })
);
const useStateSpy = jest.spyOn(React, "useState") as jest.Mock<any>;
useStateSpy.mockImplementation((init) => [init, setState]);
beforeEach(async () => {
  await act(async () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopySubTable
          api=""
          dataKey="rows"
          setSubRows={setSubRows}
          subRows={undefined}
        />
      </ChakraProvider>
    );
  });
});
afterEach(() => {
  jest.clearAllMocks();
});

describe("<CanopySubTable/>", () => {
  test("No data availble should be displyed when subRows is blank", () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopySubTable
          api=""
          dataKey="rows"
          setSubRows={setSubRows}
          subRows={[]}
        />
      </ChakraProvider>
    );
    expect(wrapper.text()).toEqual("No data availble");
  });
});
