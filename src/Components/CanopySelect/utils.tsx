import { CSSProperties, FunctionComponent } from "react";
import { ControlProps, IndicatorProps, PlaceholderProps } from "react-select";
import { OptionProps, OptionTypeBase } from "react-select/src/types";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";

const getCommonStyles = (
  currentColors: ReturnType<typeof useCurrentColors>,
  props: object
) => ({
  control: (provided: CSSProperties, state: ControlProps<{}, boolean>) => {
    return {
      ...provided,
      opacity: state?.isDisabled ? "0.6" : "1",
      backgroundColor: currentColors.containerBg,
      borderColor: state.menuIsOpen
        ? currentColors.dropdownBorder1
        : currentColors.dropDownBorder,
      boxShadow: state.menuIsOpen
        ? `1px 2px 2px ${currentColors.boxShadow}`
        : "none",
      borderBottomLeftRadius: state.menuIsOpen ? 0 : 4,
      borderBottomRightRadius: state.menuIsOpen ? 0 : 4,
      borderBottomColor: state.menuIsOpen
        ? currentColors.containerBg
        : currentColors.dropDownBorder,
      "&:hover": {
        borderColor: state.menuIsOpen
          ? currentColors.dropdownBorder1
          : currentColors.dropDownBorder,
        borderBottomColor: state.menuIsOpen
          ? currentColors.dropdownBorder1
          : currentColors.dropDownBorder,
      },
      ...props,
    };
  },
  valueContainer: (base: any, state: ControlProps<{}, boolean>) => ({
    ...base,
    minHeight: "35px",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),
  singleValue: (provided: CSSProperties, state: ControlProps<{}, boolean>) => ({
    ...provided,
    color: currentColors.inputText,
    fontSize: 13,
    fontWeight: 500,
    margin: "0 4px",
  }),
  input: (provided: CSSProperties, state: ControlProps<{}, boolean>) => ({
    ...provided,
    color: currentColors.inputText,
    fontSize: 12,
    fontWeight: 500,
    margin: "0 4px",
  }),
  placeholder: (
    provided: CSSProperties,
    state: PlaceholderProps<{}, boolean>
  ) => ({
    ...provided,
    color: currentColors.otherText,
    fontSize: 13,
    fontWeight: 500,
    margin: "0 4px",
    paddingBottom: "0px",
    paddingTop: "0px",
  }),
  menu: (provided: CSSProperties, state: ControlProps<{}, boolean>) => ({
    ...provided,
    top: "100%",
    marginBottom: "8px",
    position: "absolute",
    width: "100%",
    boxSizing: "border-box",
    margin: 0,
    backgroundColor: currentColors.containerBg,
    boxShadow: `1px 2px 2px ${currentColors.boxShadow}`,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: currentColors.dropDownBorder1,
    borderWidth: 1,
    borderTopWidth: 0,
    zIndex: 9999,
  }),
  menuPortal: (provided: CSSProperties) => ({
    ...provided,
    zIndex: 9999,
  }),
  indicatorSeparator: (
    provided: CSSProperties,
    state: ControlProps<{}, boolean>
  ) => ({
    display: "none",
  }),
  option: (provided: CSSProperties, state: OptionProps) => {
    return {
      ...provided,
      color: currentColors.inputText,
      fontSize: 13,
      fontWeight: state.isSelected ? 700 : 400,
      position: "relative",
      backgroundColor: "inherit",
      paddingLeft: 22,
      paddingRight: 22,

      "&:active": {
        backgroundColor: "inherit",
      },

      "&::before": {
        position: "absolute",
        content: "''",
        left: 8,
        top: 0,
        width: "calc(100% - 16px)",
        backgroundColor: state.isFocused ? currentColors.searchBg : "inherit",
        borderRadius: 4,
        height: "100%",
        zIndex: -1,
      },
      cursor: "pointer",
    };
  },
});

const getDropdownIndicator = (
  currentColors: ReturnType<typeof useCurrentColors>
): FunctionComponent<IndicatorProps<OptionTypeBase, boolean>> => ({
  innerProps,
}) => (
  <></>
  //   <Icon
  //     {...innerProps}
  //     color={currentColors.inputText}
  //     name={"ActDrpdwn"}
  //     width="12px"
  //     height="12px"
  //     mr="12px"
  //     cursor="pointer"
  //   />
);

export { getCommonStyles, getDropdownIndicator };
