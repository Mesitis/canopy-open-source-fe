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

import {
  Box,
  ButtonProps,
  Checkbox,
  CheckboxGroup,
  Divider,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Select,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import CanopyButton from "../CanopyButton/CanopyButton";
import CanopyInput from "../CanopyInput/CanopyInput";
import IconButton from "../IconButton/IconButton";
import { FaFilter } from "react-icons/fa";
type SavedFilter = Record<string, Record<string, string>>;
type OnApply = ({ filter, save }: { filter: string; save: boolean }) => void;

export interface CanopyTableFilterProps extends ButtonProps {
  filters?: TableColumn[];
  savedFilters?: Array<SavedFilter>;
  onApply?: OnApply;
  globalProps?: any;
}
const logo = "/images/login_logo.png";
const FilterInput = ({ onChange }: { onChange: (args: string) => void }) => {
  const [value, setValue] = React.useState<string>();
  const currentColors = useCurrentColors();

  return (
    <Editable
      placeholder="Click to Edit"
      value={value}
      onChange={(value) => {
        setValue(value);
        if (onChange) {
          onChange(value);
        }
      }}
      submitOnBlur={true}
      startWithEditView={true}
    >
      <EditablePreview />
      <EditableInput
        width="90px"
        _hover={{
          color: currentColors.inputText,
          borderColor: currentColors.inputBorder,
          backgroundColor: currentColors.inputBg,
        }}
        _focus={{
          color: currentColors.inputText,
          outline: "none",
          boxShadow: "none",
          borderColor: currentColors.inputBorder,
          backgroundColor: currentColors.inputBg,
        }}
        _active={{
          color: currentColors.inputText,
          backgroundColor: currentColors.inputBg,
        }}
      />
    </Editable>
  );
};

function TableFilter({
  filters = [],
  savedFilters = [],
  onApply,
  globalProps,
  ...props
}: CanopyTableFilterProps) {
  const { 1: setSelectedSavedFilter } = useState<SavedFilter | null>();
  const { 1: setFilterName } = useState<string>("");
  const [saveFilter, setSaveFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.createRef();
  const currentColors = useCurrentColors();
  const handleSelectSavedFilter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // @ts-ignore
    const selectedFilter = savedFilters.filter(
      (filter) => Object.keys(filter)[0] === event.target.value
    )[0];
    setSelectedSavedFilter(selectedFilter);
  };

  const handleApplyFilter = () => {
    if (onApply) {
      if (selectedFilter) {
        onApply({
          filter: selectedFilter,
          save: saveFilter,
        });
      }
    }
  };

  const handleResetFilter = () => {
    setSelectedSavedFilter(null);
  };

  const handleFilterChange = (value: Array<any>) => {
    setSelectedFilter((selectedFilter) => {
      return value.filter((item) => item !== selectedFilter)[0];
    });
  };
  return (
    <>
      <IconButton
        aria-label="Set Filter"
        width="20px"
        height="20px"
        ref={btnRef}
        onClick={onOpen}
        Icon={FaFilter}
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
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay top="70px" />
        <DrawerContent
          px="35px"
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
                fontSize="22px"
                mb="18px"
              >
                {"ui.mm.set-filters"}
              </Box>
            </Flex>
            <FormControl>
              <FormLabel
                htmlFor="savedFilters"
                color={currentColors.headingText}
                fontSize="15px"
              >
                Saved Filters
              </FormLabel>
              <Select
                id="savedFilters"
                height="35px"
                placeholder="Select"
                borderRadius="4px"
                borderColor={currentColors.dropDownBorder}
                focusBorderColor={currentColors.dropDownBorder}
                border="1px"
                onChange={handleSelectSavedFilter}
                color={currentColors.otherText}
              >
                {savedFilters.map((filter) => (
                  <option
                    key={Object.keys(filter)[0]}
                    value={Object.keys(filter)[0]}
                  >
                    {Object.keys(filter)[0]}
                  </option>
                ))}
              </Select>
            </FormControl>
            <Divider
              borderColor={currentColors.buttonBorder}
              width="full"
              my="15px"
            />
          </Flex>
          <Flex
            flexGrow={1}
            backgroundColor={currentColors.inputBg}
            borderRadius="4px"
            p="10px"
            mb="27.5px"
            overflowY="auto"
          >
            <CheckboxGroup
              colorScheme="green"
              value={selectedFilter ? [selectedFilter] : [""]}
              onChange={handleFilterChange}
            >
              <VStack align="flex-start" fontSize="15px">
                {filters.map(({ accessor, headerText }) => {
                  return (
                    <Checkbox
                      key={accessor}
                      value={accessor}
                      color={currentColors.heading}
                      borderColor={currentColors.inputBorder}
                      height="18px"
                      fontSize="15px"
                      mb="13px"
                    >
                      {headerText}
                    </Checkbox>
                  );
                })}
              </VStack>
            </CheckboxGroup>
          </Flex>
          <Flex direction="column">
            <Checkbox
              colorScheme="green"
              color={currentColors.inputText}
              height="20px"
              fontSize="15px"
              mb="13px"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSaveFilter(event.target.checked)
              }
            >
              Save this Filter
            </Checkbox>
            <CanopyInput
              width="full"
              placeholder="Enter filter name"
              height="35px"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFilterName(event.target.value)
              }
            ></CanopyInput>
          </Flex>
          <Flex>
            <Flex direction="column" width="full">
              <Divider
                borderColor={currentColors.buttonBorder}
                width="full"
                my="15px"
              />
              <Flex>
                <CanopyButton
                  width="154px"
                  height="35px"
                  fontSize="14px"
                  variant="outline"
                  onClick={handleResetFilter}
                  mr="11.5px"
                >
                  Reset
                </CanopyButton>
                <CanopyButton
                  width="154px"
                  height="35px"
                  fontSize="14px"
                  onClick={handleApplyFilter}
                >
                  Apply Filter
                </CanopyButton>
              </Flex>
            </Flex>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default TableFilter;
