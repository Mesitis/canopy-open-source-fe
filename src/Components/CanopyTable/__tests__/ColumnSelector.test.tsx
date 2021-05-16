import React from "react";
import { mount, shallow } from "../CanopyTable/Cells/node_modules/enzyme";
import ColumnSelector from "../../ColumnSelector";
import theme from "../../../styles/colors";
import { ChakraProvider } from "@chakra-ui/react";
import { act } from "react-dom/test-utils";
import * as visualiserMock from "../Mocks/visualiserMock.json";
let wrapper: any;
const _visualiserMock: Record<string, string> = visualiserMock;
const redirectTo = jest.fn();
const t = (value: string) => {
  return _visualiserMock[value];
};
const setState = jest.fn();
const onApply = jest.fn();
const useStateSpy = jest.spyOn(React, "useState") as jest.Mock<any>;
useStateSpy.mockImplementation((init) => [init, setState]);
const allColumnsMock = [
  {
    Cell: jest.fn(),
    Header: "displayName",
    accessor: "displayName",
    align: "left",
    canReorder: true,
    canResize: true,
    canSort: true,
    colSpan: 3,
    headerText: "Client",
    sticky: "left",
    visible: true,
    width: 200,
  },
  {
    Cell: jest.fn(),
    Header: "createdAt",
    accessor: "created_at",
    align: "left",
    canReorder: true,
    canResize: true,
    canSort: true,
    colSpan: 3,
    headerText: "CreatedAt",
    visible: false,
    width: 200,
  },
];
const visibleColumnsMock = [
  {
    Cell: jest.fn(),
    Header: "displayName",
    accessor: "displayName",
    align: "left",
    canReorder: true,
    canResize: true,
    canSort: true,
    colSpan: 3,
    headerText: "Client",
    sticky: "left",
    visible: true,
    width: 200,
  },
];
beforeEach(() => {
  wrapper = mount(
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
      <ColumnSelector
        //@ts-ignore
        allColumns={allColumnsMock}
        //@ts-ignore
        visibleColumns={visibleColumnsMock}
        onApply={onApply}
        globalProps={{
          redirectTo: redirectTo,
          t: t,
          qp: {},
        }}
      />
    </ChakraProvider>
  );
});
describe("<canopySelector/>", () => {
  test("component should render button to open column selector", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });
  test("click on button should open drawer to select the columns", () => {
    wrapper.find("button").simulate("click");
    const _applyFormat = wrapper.findWhere(
      (n: any) => n.text() === "Apply Format" && n.type() === "button"
    );
    const _reset = wrapper.findWhere(
      (n: any) => n.text() === "Reset" && n.type() === "button"
    );
    expect(_applyFormat.length).toEqual(1);
    expect(_reset.length).toEqual(1);
  });
  test("select all checkbox should select all the checkboxes in slide in", () => {
    wrapper.find("button").simulate("click");
    expect(wrapper.find('div[children="1 / 2 selected"]').length).toEqual(1);
    wrapper
      .find('input[name="select-all"]')
      .simulate("change", { target: { checked: true } });
    expect(wrapper.find('div[children="2 / 2 selected"]').length).toEqual(1);
  });
  test("Apply format button should call onApply function from the props", () => {
    wrapper.find("button").simulate("click");
    wrapper
      .find('input[name="select-all"]')
      .simulate("change", { target: { checked: true } });
    wrapper
      .findWhere(
        (n: any) => n.text() === "Apply Format" && n.type() === "button"
      )
      .simulate("click");
    expect(onApply).toHaveBeenCalled();
  });
  test("reset button should reset the selected columns", () => {
    wrapper.find("button").simulate("click");
    wrapper
      .find('input[name="select-all"]')
      .simulate("change", { target: { checked: true } });
    expect(wrapper.find('div[children="2 / 2 selected"]').length).toEqual(1);
    wrapper
      .findWhere((n: any) => n.text() === "Reset" && n.type() === "button")
      .simulate("click");
    expect(wrapper.find('div[children="1 / 2 selected"]').length).toEqual(1);
  });
  test("close button should close the slide in window", () => {
    wrapper.find("button").simulate("click");
    expect(
      wrapper.findWhere(
        (n: any) => n.text() === "Reset" && n.type() === "button"
      ).length
    ).toEqual(1);
    expect(
      wrapper.findWhere(
        (n: any) => n.text() === "Reset" && n.type() === "button"
      ).length
    ).toEqual(1);
    act(() => {
      wrapper
        .find('button[aria-label="Close"]')
        .props()
        .onClick({ stopPropagation: jest.fn() });
    });
  });
});
