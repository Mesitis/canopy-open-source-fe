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

import { Button, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import IconButton from "../IconButton/IconButton";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
export interface CanopyTablePagerProps {
  canPreviousPage: boolean;
  pageIndex: number;
  gotoPage: (page: number) => void;
  canNextPage: boolean;
  pageOptions: Array<number>;
  numRowsInCurrPage: number;
  numTotalRows: number;
  recordName: string;
}

function CanopyTablePager({
  canPreviousPage,
  pageIndex,
  gotoPage,
  canNextPage,
  pageOptions,
  numRowsInCurrPage,
  numTotalRows,
  recordName,
}: CanopyTablePagerProps) {
  const currentColors = useCurrentColors();
  return (
    <Flex
      backgroundColor={currentColors.containerBg}
      align="baseline"
      justify="space-between"
      py="10px"
      px="20px"
      border={`1px solid ${currentColors.tableBorder}`}
      height={{ sm: "140px", xl: "70px" }}
      alignItems={{ sm: "flex-start", xl: "center" }}
      position="relative"
    >
      {numRowsInCurrPage > numTotalRows ? (
        "login-password-session.showing-all-results"
      ) : (
        <>
          <Text
            display={{
              sm: "grid",
              xl: "flex",
            }}
            whiteSpace="nowrap"
            fontSize="13px"
            lineHeight="18px"
          >
            <Text>
              <Text as="span" fontWeight="bold">
                {numRowsInCurrPage} of {numTotalRows}{" "}
              </Text>
              {recordName} displayed
            </Text>
          </Text>
          <Flex
            align="center"
            height="100%"
            flexDirection={{
              sm: "column",
              xl: "initial",
            }}
          >
            <Flex
              alignItems="center"
              textAlign={{ sm: "center", xl: "initial" }}
              display={{
                sm: "block",
                xl: "flex",
              }}
              bottom={{
                sm: "35px",
                xl: "auto",
              }}
              right={{
                sm: "0",
                xl: "auto",
              }}
              left={{
                sm: "0",
                xl: "auto",
              }}
              position={{ sm: "absolute", xl: "initial" }}
            >
              <IconButton
                aria-label="previous"
                isDisabled={!canPreviousPage}
                variant="ghost"
                Icon={GrFormPrevious}
                mx="8px"
                _focus={{ outline: "none" }}
                width="13px"
                height="13px"
                size="xs"
                position={{ sm: "absolute", xl: "initial" }}
                bottom={{ sm: "4px", xl: "auto" }}
                left={{ sm: "0", xl: "auto" }}
                onClick={() => gotoPage(pageIndex - 1)}
              />
              {canPreviousPage && (
                <Button
                  name="previous-pager-button"
                  key={pageIndex}
                  mx="4px"
                  fontSize="13px"
                  lineHeight="18px"
                  fontWeight="normal"
                  variant="ghost"
                  _focus={{ outline: "none" }}
                  width="25px"
                  height="25px"
                  size="xs"
                  onClick={() => gotoPage(pageIndex)}
                >
                  {pageIndex}
                </Button>
              )}

              {
                <Button
                  name="previous-pager-button"
                  key={pageIndex + 1}
                  mx="4px"
                  fontSize="13px"
                  lineHeight="18px"
                  fontWeight="bold"
                  variant="ghost"
                  backgroundColor={currentColors.highlightedButtonBg}
                  _hover={{
                    backgroundColor: currentColors.highlightedButtonBg,
                  }}
                  _focus={{ outline: "none" }}
                  color={currentColors.white}
                  width="25px"
                  minWidth="25px"
                  height="25px"
                  size="xs"
                >
                  {pageIndex + 1}
                </Button>
              }

              {canNextPage && (
                <Button
                  name="next-pager-button"
                  key={pageIndex + 2}
                  mx="4px"
                  fontSize="13px"
                  lineHeight="18px"
                  fontWeight="normal"
                  variant="ghost"
                  width="25px"
                  minWidth="25px"
                  height="25px"
                  size="xs"
                  _focus={{ outline: "none" }}
                  onClick={() => {
                    gotoPage(pageIndex + 2);
                  }}
                >
                  {pageIndex + 2}
                </Button>
              )}

              {!canPreviousPage && pageOptions?.length - 1 >= pageIndex + 3 && (
                <Button
                  name="last-pager-button"
                  mx="4px"
                  fontSize="13px"
                  lineHeight="18px"
                  fontWeight="normal"
                  variant="ghost"
                  _focus={{ outline: "none" }}
                  width="25px"
                  minWidth="25px"
                  height="25px"
                  size="xs"
                  onClick={() => gotoPage(pageIndex + 3)}
                >
                  {pageIndex + 3}
                </Button>
              )}
              <IconButton
                position={{ sm: "absolute", xl: "initial" }}
                bottom={{ sm: "4px", xl: "auto" }}
                right={{ sm: "0", xl: "auto" }}
                aria-label="next"
                isDisabled={!canNextPage}
                variant="ghost"
                Icon={GrFormNext}
                mx="8px"
                width="13px"
                height="13px"
                size="xs"
                _focus={{ outline: "none" }}
                onClick={() => gotoPage(pageIndex + 2)}
              />
            </Flex>
            <Flex alignItems="center">
              <Text
                flex="1 0 auto"
                fontSize="13px"
                lineHeight="18px"
                fontWeight="bold"
                mr="10px"
              >
                Jump to:
              </Text>
              <Select
                value={pageIndex + 1}
                onChange={(e) => gotoPage(+e.target.value)}
                boxShadow={`1px 2px 2px ${currentColors.boxShadow}`}
                width="60px"
                height="30px"
                size="sm"
              >
                {pageOptions.map((option) => (
                  <option key={option} value={option + 1}>
                    {option + 1}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        </>
      )}
      {/* Todo: Use pluralize package to handle recordName pluralization */}
    </Flex>
  );
}

export default CanopyTablePager;
