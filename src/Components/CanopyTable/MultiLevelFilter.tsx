import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonProps,
  Checkbox,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  FormControl,
  FormLabel,
  Image,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import isEqual from "lodash-es/isEqual";
import React, { useEffect, useState } from "react";
import CanopyButton from "../CanopyButton/CanopyButton";
import CanopySelect from "../CanopySelect/CanopySelect";
import IconButton from "../IconButton/IconButton";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import { getAuthrizationHeaders } from "../../Helpers/localStorage";
import {
  getBlankOptions,
  getFilterValueForSelectBox,
  getKeyByValue,
} from "./Utils";
type OnApply = (selection: Record<string, any>) => void;
export interface CanopyFiltersProps extends ButtonProps {
  globalProps: any;
  groupByFilters?: Record<string, string[]>;
  selectedGroupByFilters?: string[];
  selectedGroupBy?: string;
  user_id?: string;
  setLayoutState: any;
  previousState: any;
  setPreviousState: any;
  filterApi?: string;
  onApply: OnApply;
  defaultSelection: string;
}

function MultiLevelFilter({
  globalProps,
  groupByFilters = {},
  selectedGroupByFilters = [],
  selectedGroupBy = "",
  user_id = "",
  setLayoutState,
  previousState,
  setPreviousState,
  filterApi,
  onApply,
  defaultSelection,
  ...props
}: CanopyFiltersProps) {
  const logo = "/images/login_logo.png";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.createRef();
  const currentColors = useCurrentColors();
  const { t } = globalProps;
  const [data, setData] = useState<Record<string, Array<string>>>({});
  const [filterDropDownValues, setFilterDropDownValues] = useState<
    Record<number, any>
  >({ 1: [] });
  const [filterIndexes, setFilterIndexes] = useState<Array<number>>([1]);
  const [currentSelectedFilter, setCurrentSelectedFilters] = useState<
    Record<number, any>
  >({ 1: [] });
  const [selectedOptionFromDropDown, setSelectedOptionFromDropDown] = useState<
    Record<number, string>
  >({ 1: "select-one" });
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState<number>(1);
  const [currentData, setCurrentData] = useState<Array<any>>([]);
  const [apiResponse, setApiResponse] = useState<Array<any>>([]);
  const [valueToApplyFilter, setValueToApplyFilter] = useState<
    Record<any, any>
  >({});
  const [selectAll, setSelectAll] = useState<Record<number, boolean>>({
    1: false,
  });
  const getFilters = async (userId?: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FLASH_DB_API}${filterApi}?parent_user_ids=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            ...getAuthrizationHeaders(),
          },
        }
      );
      return await response.json();
    } catch (e) {
      throw e;
    }
  };
  const [
    currentSelectedvalueForCheckbox,
    setCurrentSelectedvalueForCheckbox,
  ] = useState<Record<number, Array<string>>>({ 1: [] });
  useEffect(() => {
    (async () => {
      try {
        const filtersFromApi = await getFilters(user_id);
        const _filterValues = getFilterValueForSelectBox(filtersFromApi);
        const blankOptions: Record<any, any> = getBlankOptions(
          filtersFromApi[0]
        );
        setFilterDropDownValues({ 1: Object.keys(blankOptions) });
        setData(_filterValues);
        setCurrentData(filtersFromApi);
        setApiResponse(filtersFromApi);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const onFilterDropDownChange = (event: any, currentIndex: number) => {
    setCurrentSelectedIndex(currentIndex);
    setSelectedOptionFromDropDown({
      ...selectedOptionFromDropDown,
      [currentIndex]: event.value,
    });
    setCurrentSelectedFilters({
      ...currentSelectedFilter,
      [currentIndex]: data[event.value],
    });
    setValueToApplyFilter({
      ...valueToApplyFilter,
      [event.value]: [],
    });
    setCurrentSelectedvalueForCheckbox({
      ...currentSelectedvalueForCheckbox,
      [currentIndex]: [],
    });
  };
  const handleAddFilter = () => {
    setCurrentSelectedIndex(currentSelectedIndex + 1);
    const _filterIndex = filterIndexes;
    _filterIndex.push(currentSelectedIndex + 1);
    setFilterIndexes([..._filterIndex]);
    setSelectedOptionFromDropDown({
      ...selectedOptionFromDropDown,
      [currentSelectedIndex + 1]: "select-one",
    });

    setCurrentSelectedFilters({
      ...currentSelectedFilter,
      [currentSelectedIndex + 1]: [],
    });
    setCurrentSelectedvalueForCheckbox({
      ...currentSelectedvalueForCheckbox,
      [currentSelectedIndex + 1]: [],
    });
    currentSelectedvalueForCheckbox;
    const _allOptions = filterDropDownValues[currentSelectedIndex];
    let index = _allOptions.indexOf(
      selectedOptionFromDropDown[currentSelectedIndex]
    );
    if (index !== -1) {
      _allOptions.splice(index, 1);
    }
    setFilterDropDownValues({
      ...filterDropDownValues,
      [currentSelectedIndex + 1]: _allOptions,
    });
    let str = "";
    const selectedCheckboxes =
      currentSelectedvalueForCheckbox[currentSelectedIndex];
    const selectedvalueFromDropDown =
      selectedOptionFromDropDown[currentSelectedIndex];
    const _currentData = currentData;
    selectedCheckboxes.map((_val) => {
      if (str.length > 0) {
        str = str + ` || _filter["${selectedvalueFromDropDown}"] === "${_val}"`;
      } else {
        str = str + `_filter["${selectedvalueFromDropDown}"] === "${_val}"`;
      }
    });
    const filterdData: any = _currentData?.filter((_filter) => eval(str));
    setCurrentData([...filterdData]);
    const _filterValues = getFilterValueForSelectBox(filterdData);
    setData({ ..._filterValues });
  };
  const handleSelection = (event: any, currentIndex: number) => {
    const selectedvalue = currentSelectedvalueForCheckbox[currentIndex];
    let selectedvalueForApi: any = [];
    let key = selectedOptionFromDropDown[currentIndex];
    let found;
    if (event.target.checked) {
      !selectedvalue.includes(event.target.value) &&
        selectedvalue.push(event.target.value);
    } else {
      const index = selectedvalue.indexOf(event.target.value);
      if (index !== -1) {
        selectedvalue.splice(index, 1);
      }
    }
    switch (selectedOptionFromDropDown[currentIndex]) {
      case "child_display_name":
        key = "child_user_ids";
        selectedvalueForApi = valueToApplyFilter[key]
          ? valueToApplyFilter[key]
          : [];
        found = currentData.find(
          (_data) => _data["child_display_name"] === event.target.value
        );
        console.log(found);
        if (event.target.checked) {
          !selectedvalueForApi.includes(found.user_id) &&
            selectedvalueForApi.push(found.user_id);
        } else {
          const index = selectedvalueForApi.indexOf(found.user_id);
          if (index !== -1) {
            selectedvalueForApi.splice(index, 1);
          }
        }
        break;
      case "parent_display_name":
        key = "parent_user_id";
        selectedvalueForApi = valueToApplyFilter[key]
          ? valueToApplyFilter[key]
          : [];
        found = currentData.find(
          (_data) => _data["parent_display_name"] === event.target.value
        );
        if (event.target.checked) {
          !selectedvalueForApi.includes(found.parent_user_id) &&
            selectedvalueForApi.push(found.parent_user_id);
        } else {
          const index = selectedvalueForApi.indexOf(found.parent_user_id);
          if (index !== -1) {
            selectedvalueForApi.splice(index, 1);
          }
        }
        break;
      default:
        if (event.target.checked) {
          !selectedvalueForApi.includes(event.target.value) &&
            selectedvalueForApi.push(event.target.value);
        } else {
          const index = selectedvalueForApi.indexOf(event.target.value);
          if (index !== -1) {
            selectedvalueForApi.splice(index, 1);
          }
        }
    }
    setValueToApplyFilter({
      ...valueToApplyFilter,
      [key]: selectedvalueForApi,
    });
    setCurrentSelectedvalueForCheckbox({
      ...currentSelectedvalueForCheckbox,
      [currentIndex]: selectedvalue,
    });
  };
  const handleReset = () => {
    setCurrentData(apiResponse);
    const _filterValues = getFilterValueForSelectBox(apiResponse);
    const blankOptions: Record<any, any> = getBlankOptions(apiResponse?.[0]);
    setFilterDropDownValues({ 1: Object.keys(blankOptions) });
    setData(_filterValues);
    setCurrentData(apiResponse);
    setCurrentSelectedFilters({ 1: [] });
    setFilterIndexes([1]);
    setSelectedOptionFromDropDown({ 1: "select-one" });
    setCurrentSelectedIndex(1);
    setCurrentSelectedvalueForCheckbox({ 1: [] });
    setValueToApplyFilter({});
  };
  const handleApplyFilter = () => {
    console.log(valueToApplyFilter);
    onApply(valueToApplyFilter);
    onClose();
  };
  const onFilterRemove = (currentIndex: number) => {
    const _filterIndexes = filterIndexes;
    const index = _filterIndexes.indexOf(currentIndex);
    if (index !== -1) {
      _filterIndexes.splice(index, 1);
    }
    const _currentSelectedvalueForCheckbox = currentSelectedvalueForCheckbox;
    delete _currentSelectedvalueForCheckbox[currentIndex];
    setCurrentSelectedvalueForCheckbox({
      ..._currentSelectedvalueForCheckbox,
    });
    const _filterDropDownValues = filterDropDownValues;
    if (
      !_filterDropDownValues[currentIndex - 1].includes(
        selectedOptionFromDropDown[currentIndex]
      )
    ) {
      _filterDropDownValues[currentIndex - 1].push(
        selectedOptionFromDropDown[currentIndex]
      );
    }

    delete _filterDropDownValues[currentIndex];
    delete currentSelectedFilter[currentIndex];
    delete selectedOptionFromDropDown[currentIndex];
    setFilterDropDownValues({ ..._filterDropDownValues });
    setFilterIndexes([..._filterIndexes]);
    setCurrentSelectedIndex(currentIndex - 1);
  };
  const handleSelectAll = (event: any, currentIndex: number) => {
    if (event.target.checked) {
      setSelectAll({ ...setSelectAll, [currentIndex]: true });
      setCurrentSelectedvalueForCheckbox({
        ...currentSelectedvalueForCheckbox,
        [currentIndex]: [...currentSelectedFilter[currentIndex]],
      });
    } else {
      setSelectAll({ ...setSelectAll, [currentIndex]: false });
      setCurrentSelectedvalueForCheckbox({
        ...currentSelectedvalueForCheckbox,
        [currentIndex]: [],
      });
    }
  };
  useEffect(() => {
    if (
      currentSelectedFilter[currentSelectedIndex]?.length ===
      currentSelectedvalueForCheckbox[currentSelectedIndex]?.length
    ) {
      setSelectAll({ ...selectAll, [currentSelectedIndex]: true });
    } else {
      setSelectAll({ ...selectAll, [currentSelectedIndex]: false });
    }
  }, [currentSelectedvalueForCheckbox]);
  return (
    <>
      <IconButton
        aria-label="Set Filter"
        width="20px"
        height="20px"
        ref={btnRef}
        onClick={onOpen}
        Icon={<></>}
        backgroundColor="transparent"
        color={currentColors.otherText}
        variant="ghost"
        _hover={{ backgroundColor: "transparent" }}
        _focus={{
          border: "0px",
          backgroundColor: "transparent",
          outline: "none",
        }}
        _active={{ border: "0px" }}
        {...props}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerContent
          px="17px"
          py="17px"
          height={{ xl: "100vh", sm: "calc(100% - 10px)" }}
          backgroundColor={currentColors.containerBg}
        >
          <DrawerCloseButton
            borderRadius="40px"
            width="25px"
            height="25px"
            color={currentColors.closeIcon}
            borderColor={currentColors.closeIcon}
            _focus={{
              outline: "none",
              boxShadow: "none",
              borderColor: currentColors.closeIcon,
            }}
            p="10px"
          />
          <Flex direction="column">
            <Flex p="5px">
              <Image src={logo} width={"30px"} height={"30px"} />
              <Box
                ml="15px"
                color={currentColors.headingText}
                fontWeight="bold"
                fontSize="20px"
              >
                {t("ui.mm.page-filter")}
              </Box>
            </Flex>
            <Divider
              borderColor={currentColors.buttonBorder}
              width="full"
              my="10px"
            />
            <FormControl mb="10px">
              <FormLabel
                htmlFor="filters"
                fontWeight="bold"
                color={currentColors.headingText}
                fontSize="18px"
              >
                {t("ui.mm.filter-categories")}
              </FormLabel>
            </FormControl>
          </Flex>

          <Flex
            overflowY="auto"
            direction="column"
            marginBottom="30px"
            justify="space-between"
          >
            {filterIndexes.map((_index) => (
              <Flex
                key={_index}
                data-test="filter-area"
                direction="column"
                flexGrow={1}
                mt="15px"
                mb="15px"
              >
                <Flex>
                  <CanopySelect
                    isDisabled={currentSelectedIndex !== _index}
                    onChange={(e) => onFilterDropDownChange(e, _index)}
                    value={{
                      value: selectedOptionFromDropDown[_index],
                      label: t(
                        "ui.mm.filter." + selectedOptionFromDropDown[_index]
                      ),
                    }}
                    width="full"
                    pl="10px"
                    id="filters"
                    height="35px"
                    placeholder="Select"
                    borderRadius="4px"
                    border={`1px solid ${currentColors.dropDownBorder}`}
                    background={currentColors.containerBg}
                    borderColor={currentColors.dropDownBorder}
                    focusBorderColor={currentColors.dropDownBorder}
                    mb="10px"
                    mt="10px"
                    options={
                      filterDropDownValues[_index] &&
                      filterDropDownValues[_index].map((item: number) => ({
                        value: item,
                        label: t("ui.mm.filter." + item),
                      }))
                    }
                    color={currentColors.otherText}
                  ></CanopySelect>
                  {_index === filterIndexes.length && _index !== 1 && (
                    <IconButton
                      ml="5px"
                      alignSelf="center"
                      display="inline-flex"
                      onClick={() => onFilterRemove(_index)}
                      color={currentColors.closeIcon}
                      width="24px"
                      height="24px"
                      aria-label="remove"
                      Icon={<></>}
                      variant="ghost"
                      //@ts-ignore
                      alignSelf="flex-start"
                      mt="8px"
                    />
                  )}
                </Flex>
                <Flex
                  mt="15px"
                  maxHeight="200px"
                  backgroundColor={currentColors.inputBg}
                  borderRadius="4px"
                  p="10px"
                  overflowY="auto"
                  width="full"
                >
                  <Flex direction="column" width="full">
                    {currentSelectedFilter[_index]?.length !== 0 ? (
                      <>
                        <Checkbox
                          isChecked={selectAll[_index]}
                          onChange={(e) => handleSelectAll(e, _index)}
                          isDisabled={currentSelectedIndex !== _index}
                          isIndeterminate={
                            currentSelectedvalueForCheckbox[_index].length >
                              0 && !selectAll[_index]
                          }
                          data-test="select-all"
                          colorScheme="green"
                          value="select-all"
                          key={"select-all"}
                          color={currentColors.headingText}
                          fontWeight={"600"}
                          borderColor={currentColors.inputBorder}
                          height="18px"
                          fontSize="15px"
                          mb="15px"
                        >
                          {t("select-all")}
                        </Checkbox>

                        <VStack width="full" align="flex-start" fontSize="15px">
                          {currentSelectedFilter[_index] &&
                          currentSelectedFilter[_index].length !== 0
                            ? currentSelectedFilter[_index].map(
                                (_checkboxValue: string) => (
                                  <Checkbox
                                    colorScheme="green"
                                    isDisabled={currentSelectedIndex !== _index}
                                    value={_checkboxValue}
                                    onChange={(event) =>
                                      handleSelection(event, _index)
                                    }
                                    isChecked={currentSelectedvalueForCheckbox[
                                      _index
                                    ]?.includes(_checkboxValue)}
                                    fontWeight={
                                      currentSelectedvalueForCheckbox[
                                        _index
                                      ]?.includes(_checkboxValue)
                                        ? "600"
                                        : "normal"
                                    }
                                    width="full"
                                    color={currentColors.headingText}
                                    borderColor={currentColors.inputBorder}
                                    height="30px"
                                    fontSize="15px"
                                  >
                                    <Box
                                      width="250px"
                                      textOverflow="ellipsis"
                                      overflow="hidden"
                                      whiteSpace="nowrap"
                                    >
                                      {_checkboxValue}
                                    </Box>
                                  </Checkbox>
                                )
                              )
                            : t("ui.mm.filter.select-one-description")}
                        </VStack>
                      </>
                    ) : (
                      t("ui.mm.filter.select-one-description")
                    )}
                  </Flex>
                </Flex>
              </Flex>
            ))}

            <CanopyButton
              onClick={handleAddFilter}
              data-test="add-filter"
              alignSelf="flex-start"
              pt="7px"
              size="sm"
              variant="ghost"
              mt="20px"
              pb="7px"
              mb="20px"
              disabled={
                currentSelectedvalueForCheckbox[currentSelectedIndex]
                  ?.length === 0 ||
                filterDropDownValues[currentSelectedIndex]?.length < 0
              }
              color={currentColors.primaryColor}
              _hover={{
                backgroundColor: currentColors.boxBorder,
              }}
            >
              <AddIcon width={"12px"} height={"12px"} mr="4px" />
              {t("ui.mm.filters.add-filter")}
            </CanopyButton>
          </Flex>
          <Flex
            position="absolute"
            bottom="0"
            direction="column"
            marginBottom="6px"
            width="full"
          >
            <Divider
              borderColor={currentColors.buttonBorder}
              width="full"
              my="10px"
            />
            <Flex>
              <CanopyButton
                onClick={handleReset}
                data-test="reset"
                width="154px"
                fontSize="13px"
                variant="outline"
                mr="11.5px"
              >
                Reset
              </CanopyButton>
              <CanopyButton
                onClick={handleApplyFilter}
                disabled={
                  currentSelectedvalueForCheckbox[1].length === 0 &&
                  selectedOptionFromDropDown[1] !== "select-one"
                }
                data-test="apply-filter"
                width="154px"
                height="35px"
                fontSize="13px"
              >
                {t("apply-filter")}
              </CanopyButton>
            </Flex>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default MultiLevelFilter;
