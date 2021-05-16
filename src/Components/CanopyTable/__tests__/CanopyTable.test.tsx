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
import CanopyTable from "../../CanopyTable";
import theme from "../../../styles/colors";
import { ChakraProvider } from "@chakra-ui/react";
import * as visualiserMock from "../Mocks/visualiserMock.json";
let wrapper: any;
const _visualiserMock: Record<string, string> = visualiserMock;
const redirectTo = jest.fn();
const t = (value: string) => {
  return _visualiserMock[value] ? _visualiserMock[value] : value;
};
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, "useState") as jest.Mock<any>;
useStateSpy.mockImplementation((init) => [init, setState]);
const mockData = {
  users: [
    {
      id: 480,
      username: "aeolos",
      displayName: "aeolos123",
      role: "Customer",
      userType: "Partner-TypeD",
      baseCurrency: "USD",
      createdAt: "2015-08-18",
      updatedAt: "2021-03-17",
      isChild: false,
      lastLoginDate: "2017-08-17",
      lastDocumentUploaded: "2018-04-11",
      status: "Active",
      networth: 120953742.66048278,
      ytd: -393497.9395686835,
      ytd_percentage: -0.32427432022590225,
      lastTransactionDate: "",
    },
  ],
  meta: { totalPages: 1, page: 1, perPage: 30, total: 13 },
};
beforeEach(() => {
  //@ts-ignore
  wrapper = mount(
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
      <CanopyTable
        recordName="rows"
        dataKey="users"
        title="title"
        actionBar={true}
        dataLoad={{ data: mockData }}
        columns={[]}
        layoutState={{
          page: 1,
          per_page: 20,
          keyword: "",
          output_format: "",
        }}
        setLayoutState={jest.fn()}
        showSearchOn={["desktop", "tablet", "mobile"]}
        showColumnSelectorOn={["desktop", "tablet", "mobile"]}
        showFilterOn={["desktop", "tablet", "mobile"]}
        showDownloadOn={["desktop", "tablet", "mobile"]}
        per_page={30}
        childRowsApi={null}
        showPagination={true}
        children={{}}
        customTablePager={undefined}
        customTableFilter={undefined}
        serverSideSearch={true}
        downloadAllData={true}
        downloadCurrentData={true}
        meta={{}}
        requiredQueryFields={[]}
        filterType={""}
      />
    </ChakraProvider>
  );
});
describe("<CanopyTable/>", () => {
  test("No data found should be rendered when data is not available in props", () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopyTable
          recordName="rows"
          dataKey="users"
          title="title"
          actionBar={true}
          dataLoad={{}}
          columns={[]}
          globalProps={{
            redirectTo: redirectTo,
            t: t,
            qp: {},
          }}
          layoutState={{
            page: 1,
            per_page: 20,
            keyword: "",
            output_format: "",
          }}
          setLayoutState={jest.fn()}
          showSearchOn={["desktop", "tablet", "mobile"]}
          showColumnSelectorOn={["desktop", "tablet", "mobile"]}
          showFilterOn={["desktop", "tablet", "mobile"]}
          showDownloadOn={["desktop", "tablet", "mobile"]}
          per_page={30}
          childRowsApi={null}
          showPagination={true}
          children={{}}
          customTablePager={undefined}
          customTableFilter={undefined}
          serverSideSearch={true}
          downloadAllData={true}
          downloadCurrentData={true}
          meta={{}}
          requiredQueryFields={[]}
          filterType={""}
        />
      </ChakraProvider>
    );
    expect(wrapper.find('div[children="No data availble"]').length).toEqual(1);
  });
  test("data should be rendred in the table if data is avaialbe in props", () => {
    const dataObject = mockData.users[0];
    const expectedCellNumber = Object.keys(dataObject).length;

    expect(wrapper.find('div[role="cell"]').length).toEqual(expectedCellNumber);
    expect(
      wrapper.find(`div[children="${dataObject.baseCurrency}"]`).exists()
    ).toBeTruthy();
    expect(
      wrapper.find(`div[children="${dataObject.createdAt}"]`).exists()
    ).toBeTruthy();
    expect(
      wrapper.find(`div[children="${dataObject.status}"]`).exists()
    ).toBeTruthy();
  });
  test("download Icon should be present on table if showDownloadOn contains the device type", () => {
    expect(wrapper.find('button[aria-label="Download"]').exists()).toBeTruthy();
  });
  test("Column selector should be present on table if showColumnSelectorOn contains the device type", () => {
    expect(wrapper.find('button[aria-label="Format"]').exists()).toBeTruthy();
  });
  test("table should contain search button if showSearchOn contains the device type", () => {
    expect(wrapper.find('button[aria-label="search"]').exists()).toBeTruthy();
  });
  test("table should contatin filter button if showFilterOn contains the device type", () => {
    expect(
      wrapper.find('button[aria-label="Set Filter"]').exists()
    ).toBeTruthy();
  });
  test("if loading is true should render spinnerOverlay", () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopyTable
          recordName="rows"
          dataKey="users"
          title="title"
          actionBar={true}
          dataLoad={{
            loading: true,
          }}
          columns={[]}
          globalProps={{
            redirectTo: redirectTo,
            t: t,
            qp: {},
          }}
          layoutState={{
            page: 1,
            per_page: 20,
            keyword: "",
            output_format: "",
          }}
          setLayoutState={jest.fn()}
          showSearchOn={["desktop", "tablet", "mobile"]}
          showColumnSelectorOn={["desktop", "tablet", "mobile"]}
          showFilterOn={["desktop", "tablet", "mobile"]}
          showDownloadOn={["desktop", "tablet", "mobile"]}
          per_page={30}
          childRowsApi={null}
          showPagination={true}
          children={{}}
          customTablePager={undefined}
          customTableFilter={undefined}
          serverSideSearch={true}
          downloadAllData={true}
          downloadCurrentData={true}
          meta={{}}
          requiredQueryFields={[]}
          filterType={""}
        />
      </ChakraProvider>
    );
    expect(wrapper.find('span[children="Loading..."]').exists()).toBeTruthy();
  });
  test("if error in data fetch it should render ErrorBox component", () => {
    wrapper = mount(
      <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
        <CanopyTable
          recordName="rows"
          dataKey="users"
          title="title"
          actionBar={true}
          dataLoad={{
            error: "Error Message",
          }}
          columns={[]}
          globalProps={{
            redirectTo: redirectTo,
            t: t,
            qp: {},
          }}
          layoutState={{
            page: 1,
            per_page: 20,
            keyword: "",
            output_format: "",
          }}
          setLayoutState={jest.fn()}
          showSearchOn={["desktop", "tablet", "mobile"]}
          showColumnSelectorOn={["desktop", "tablet", "mobile"]}
          showFilterOn={["desktop", "tablet", "mobile"]}
          showDownloadOn={["desktop", "tablet", "mobile"]}
          per_page={30}
          childRowsApi={null}
          showPagination={true}
          children={{}}
          customTablePager={undefined}
          customTableFilter={undefined}
          serverSideSearch={true}
          downloadAllData={true}
          downloadCurrentData={true}
          meta={{}}
          requiredQueryFields={[]}
          filterType={""}
        />
      </ChakraProvider>
    );
    expect(wrapper.find('div[children="Error Message"]').exists()).toBeTruthy();
  });
});
