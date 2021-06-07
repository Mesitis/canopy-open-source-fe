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
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Image,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import CanopyButton from "../CanopyButton/CanopyButton";
import IconButton from "../IconButton/IconButton";
import { CgFormatJustify } from "react-icons/cg";
export type SavedFormat = {
  name: string;
  columns: Array<TableColumn>;
  pages: number;
};

type OnApply = ({
  format,
  save,
}: {
  format: SavedFormat;
  save: boolean;
}) => void;

export interface ColumnSelectorProps extends ButtonProps {
  allColumns?: Array<TableColumn>;
  visibleColumns?: Array<TableColumn>;
  savedFormats?: Array<SavedFormat>;
  onApply?: OnApply;
  primaryColor?: string;
}
function ColumnSelector({
  allColumns = [],
  visibleColumns = [],
  savedFormats = [],
  onApply,
  primaryColor,
  ...props
}: ColumnSelectorProps) {
  const logo = "/images/login_logo.png";
  const [
    selectedSavedFormat,
    setSelectedSavedFormat,
  ] = useState<SavedFormat | null>();
  const [selectedColumns, setSelectedColumns] = useState<Array<TableColumn>>(
    []
  );
  const [defaultColumns, setDefaultColumns] = useState<TableColumn[]>([]);
  const [localSelectedColumns, setLocalSelectedColumns] = useState<
    TableColumn[]
  >([]);
  const [formatName, setFormatName] = useState<string>("");
  const [saveFormat, setSaveFormat] = useState<boolean>(false);
  const [pages, setPages] = useState<number>(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.createRef();
  const currentColors = useCurrentColors();
  useEffect(() => {
    setSelectedColumns(visibleColumns);
    setLocalSelectedColumns(visibleColumns);
    setDefaultColumns(
      allColumns.filter((column) => {
        return column.visible;
      })
    );
  }, [allColumns, visibleColumns]);

  const handleColumnSelect = (values: Array<any>) => {
    setLocalSelectedColumns(
      allColumns.filter((column) => {
        return values.some((item) => item === column.accessor);
      })
    );
  };

  const handleApplyFormat = () => {
    onClose();
    if (onApply) {
      const name = formatName ? formatName : selectedSavedFormat?.name || "";
      setSelectedColumns(localSelectedColumns);
      onApply({
        format: {
          name,
          columns: localSelectedColumns,
          pages,
        },
        save: saveFormat,
      });
    }
  };

  const handleResetFormat = () => {
    setSelectedSavedFormat(null);
    setLocalSelectedColumns([...defaultColumns]);
    setSelectedColumns([...defaultColumns]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? setLocalSelectedColumns([...allColumns])
      : setLocalSelectedColumns([allColumns?.[0]]);
  };

  const handleOnClose = () => {
    setLocalSelectedColumns(selectedColumns);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Format"
        width="20px"
        height="20px"
        ref={btnRef}
        Size={"20px"}
        onClick={onOpen}
        Icon={CgFormatJustify}
        border="0"
        cursor="pointer"
        background="transparent"
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
      <Drawer
        //mt="30px"
        size="sm"
        isOpen={isOpen}
        placement="right"
        onClose={handleOnClose}
      >
        <DrawerContent
          height={{ xl: "100vh", sm: "calc(100% - 10px)" }}
          px="17px"
          py="17px"
          backgroundColor={currentColors.containerBg}
        >
          <DrawerHeader py="0px">
            <>
              <DrawerCloseButton
                borderRadius="40px"
                width="25px"
                height="25px"
                border="0"
                background="transparent"
                cursor="pointer"
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
                  {/* <Image
                                        src={logo}
                                        width={'30px'}
                                        height={'30px'}
                                    /> */}
                  <Box
                    ml="15px"
                    color={currentColors.headingText}
                    fontWeight="bold"
                    fontSize="20px"
                  >
                    {"Page Layout"}
                  </Box>
                </Flex>
                <Divider
                  borderColor={currentColors.buttonBorder}
                  width="full"
                  my="5px"
                />
              </Flex>
            </>
          </DrawerHeader>

          <DrawerBody>
            <Flex justify="space-between" align="center" mb="12.5px">
              <Box
                fontWeight="bold"
                color={currentColors.headingText}
                fontSize="18px"
              >
                Fields
              </Box>
              <Box color={currentColors.subHeadingText} fontSize="13px">
                {localSelectedColumns && localSelectedColumns[0]
                  ? `${localSelectedColumns?.length - 1} / ${
                      allColumns?.length - 1
                    } selected`
                  : ""}
              </Box>
            </Flex>
            <Flex
              backgroundColor={currentColors.inputBg}
              borderRadius="4px"
              p="10px"
              overflowY="auto"
              direction="column"
              flexGrow={1}
            >
              <Checkbox
                colorScheme="green"
                key={"select-all"}
                name={"select-all"}
                isChecked={
                  localSelectedColumns?.length - 1 === allColumns?.length - 1
                }
                isIndeterminate={
                  localSelectedColumns?.length - 1 !== allColumns?.length - 1 &&
                  localSelectedColumns?.length - 1 !== 0
                }
                color={currentColors.headingText}
                fontWeight={
                  localSelectedColumns?.length === allColumns?.length
                    ? "600"
                    : "normal"
                }
                borderColor={currentColors.inputBorder}
                height="18px"
                fontSize="15px"
                mb="20px"
                onChange={handleSelectAll}
              >
                Select All
              </Checkbox>
              <CheckboxGroup
                colorScheme="green"
                onChange={handleColumnSelect}
                value={localSelectedColumns.map(({ accessor }) => accessor)}
              >
                <VStack align="flex-start">
                  {allColumns.map((_column) => {
                    return (
                      <>
                        {!_column.hasOwnProperty("sticky") && (
                          <Checkbox
                            key={_column.accessor}
                            value={_column.accessor}
                            color={currentColors.headingText}
                            fontWeight={
                              localSelectedColumns.find((item) => {
                                return item.accessor === _column.accessor;
                              })
                                ? "600"
                                : "normal"
                            }
                            borderColor={currentColors.inputBorder}
                            height="18px"
                            fontSize="15px"
                            mb="13px"
                          >
                            {_column.headerText}
                          </Checkbox>
                        )}
                      </>
                    );
                  })}
                </VStack>
              </CheckboxGroup>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Flex>
              <Flex direction="column" width="full">
                <Divider
                  borderColor={currentColors.buttonBorder}
                  width="full"
                  my="5px"
                />
                <Flex>
                  <CanopyButton
                    primaryColor={primaryColor}
                    width="154px"
                    height="35px"
                    fontSize="13px"
                    variant="outline"
                    onClick={handleResetFormat}
                    mr="11.5px"
                  >
                    Reset
                  </CanopyButton>
                  <CanopyButton
                    primaryColor={primaryColor}
                    width="154px"
                    height="35px"
                    fontSize="13px"
                    onClick={handleApplyFormat}
                  >
                    Apply Format
                  </CanopyButton>
                </Flex>
              </Flex>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ColumnSelector;
