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
import CanopyTableSearch from "../../CanopyTableSearch";
import theme from "../../../styles/colors";
import { ChakraProvider } from "@chakra-ui/react";
import * as visualiserMock from "../Mocks/visualiserMock.json";
let wrapper: any;
const _visualiserMock: Record<string, string> = visualiserMock;
const redirectTo = jest.fn();
const t = (value: string) => {
  return _visualiserMock[value];
};
const setState = jest.fn();
const onSearch = jest.fn();
const useStateSpy = jest.spyOn(React, "useState") as jest.Mock<any>;
useStateSpy.mockImplementation((init) => [init, setState]);
beforeEach(() => {
  wrapper = mount(
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
      <CanopyTableSearch
        searchQuery=""
        onSearch={onSearch}
        isDisabled={false}
        globalProps={{
          redirectTo: redirectTo,
          t: t,
          qp: {},
        }}
      />
    </ChakraProvider>
  );
});
describe("<CanopyTableSearch />", () => {
  test("OnInput props should set the enterd value to value prop on input", () => {
    wrapper
      .find("input")
      .props()
      .onInput({ target: { value: "value" } });
    wrapper.update();
    expect(wrapper.find("input").props().value).toEqual("value");
  });
  test("Enter key should call OnSearch function from the props", () => {
    wrapper.find("input").props().onKeyPress({ key: "Enter" });
    expect(onSearch).toHaveBeenCalled();
  });
  test("Input should be disabled if their is no seachQuery and isDisabled prop is true", () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopyTableSearch
          searchQuery=""
          onSearch={onSearch}
          isDisabled={true}
          globalProps={{
            redirectTo: redirectTo,
            t: t,
            qp: {},
          }}
        />
      </ChakraProvider>
    );
    expect(wrapper.find("input").props().disabled).toBeTruthy();
  });
});
