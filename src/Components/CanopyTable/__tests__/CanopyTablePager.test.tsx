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
import CanopyTablePager from "../../CanopyTablePager";
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
const gotoPage = jest.fn();
const useStateSpy = jest.spyOn(React, "useState") as jest.Mock<any>;
useStateSpy.mockImplementation((init) => [init, setState]);
beforeEach(() => {
  wrapper = mount(
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
      <CanopyTablePager
        canPreviousPage={true}
        pageIndex={1}
        gotoPage={gotoPage}
        canNextPage={true}
        pageOptions={[1, 2, 3, 4]}
        numRowsInCurrPage={10}
        numTotalRows={100}
        recordName=""
        globalProps={{
          redirectTo: redirectTo,
          t: t,
          qp: {},
        }}
      />
    </ChakraProvider>
  );
});

describe("<CanopyTablePager />", () => {
  test("Click On Pagination button should call gotoPage function", () => {
    wrapper.find("button").at(0).simulate("click");
    expect(gotoPage).toHaveBeenCalled();
  });
  test("First button should call gotoPage function from props", () => {
    wrapper
      .find('button[name="previous-pager-button"]')
      .at(0)
      .simulate("click");
    expect(gotoPage).toHaveBeenCalled();
  });
  test("middle button on pager should call gotoPage function from props", () => {
    wrapper.find('button[name="next-pager-button"]').at(0).simulate("click");
    expect(gotoPage).toHaveBeenCalled();
  });
  test("last button on pager should call gotoPage function from props", () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopyTablePager
          canPreviousPage={false}
          pageIndex={1}
          gotoPage={gotoPage}
          canNextPage={true}
          pageOptions={[1, 2, 3, 4, 5, 6]}
          numRowsInCurrPage={10}
          numTotalRows={100}
          recordName=""
          globalProps={{
            redirectTo: redirectTo,
            t: t,
            qp: {},
          }}
        />
      </ChakraProvider>
    );
    wrapper.find('button[name="last-pager-button"]').simulate("click");
    expect(gotoPage).toHaveBeenCalled();
  });
  test("next button should call gotoPage function", () => {
    wrapper.find('button[aria-label="next"]').simulate("click");
    expect(gotoPage).toHaveBeenCalled();
  });
  test("change in select box on the pagination should call gotToPage function", () => {
    wrapper.find("select").simulate("change", { target: { value: "2" } });
    expect(gotoPage).toHaveBeenCalled();
  });
});
