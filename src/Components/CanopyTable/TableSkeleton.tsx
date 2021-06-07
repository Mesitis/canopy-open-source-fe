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
import { Table, Thead, Tbody, Tr, Th, Td, Box, Flex } from "@chakra-ui/react";
import SkeletonWrapper from "../Skeleton/SkeletonWrapper";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import { checkForMobile } from "../../hooks/UseResponsive/UseResponsive";

export default function TableSkeleton() {
  const currentColors = useCurrentColors();
  const isMobile = checkForMobile();
  return (
    <>
      {isMobile ? (
        <Box>
          <Flex justifyContent="flex-end" pb="20px">
            <SkeletonWrapper
              mr="15px"
              colorScheme="facebook"
              fadeDuration={0.3}
              mt="8px"
              height="20px"
              w={"20px"}
            />
            <SkeletonWrapper
              mr="15px"
              colorScheme="facebook"
              fadeDuration={0.3}
              mt="8px"
              height="20px"
              w={"20px"}
            />
            <SkeletonWrapper
              mr="15px"
              colorScheme="facebook"
              fadeDuration={0.3}
              mt="8px"
              height="20px"
              w={"20px"}
            />
          </Flex>
          <Box
            backgroundColor={currentColors.containerBg}
            border={`1px solid ${currentColors.searchBg}`}
            borderRadius={"4px"}
            p="5px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th pl="13px" borderColor={currentColors.tableBorder}>
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="120px"
                    />
                  </Th>
                  <Th
                    borderColor={currentColors.tableBorder}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="130px"
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {[1, 2, 3, 4, 5, 6].map((_index) => (
                  <Tr>
                    <Td pl="0" borderColor={currentColors.tableBorder}>
                      <Flex ml="10px">
                        <SkeletonWrapper
                          colorScheme="facebook"
                          fadeDuration={0.3}
                          mt="8px"
                          height="12px"
                          w="12px"
                        />
                        <Flex pl="10px" flexDirection="column">
                          <SkeletonWrapper
                            colorScheme="facebook"
                            fadeDuration={0.3}
                            mt="8px"
                            height="15px"
                            w={"100px"}
                          />
                          <SkeletonWrapper
                            colorScheme="facebook"
                            fadeDuration={0.3}
                            mt="8px"
                            height="15px"
                            w={"80px"}
                          />
                        </Flex>
                      </Flex>
                    </Td>
                    <Td
                      borderColor={currentColors.tableBorder}
                      height="75px"
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <SkeletonWrapper
                        colorScheme="facebook"
                        fadeDuration={0.3}
                        mt="8px"
                        height="12px"
                        w="100px"
                        ml="10px"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      ) : (
        <Box>
          <Flex justifyContent="flex-end" pb="20px">
            <SkeletonWrapper
              mr="15px"
              colorScheme="facebook"
              fadeDuration={0.3}
              mt="8px"
              height="20px"
              w={"20px"}
            />
            <SkeletonWrapper
              mr="15px"
              colorScheme="facebook"
              fadeDuration={0.3}
              mt="8px"
              height="20px"
              w={"20px"}
            />
            <SkeletonWrapper
              mr="15px"
              colorScheme="facebook"
              fadeDuration={0.3}
              mt="8px"
              height="20px"
              w={"20px"}
            />
          </Flex>
          <Box
            backgroundColor={currentColors.containerBg}
            border={`1px solid ${currentColors.searchBg}`}
            borderRadius={"4px"}
            p="5px"
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th pl="13px" borderColor={currentColors.tableBorder}>
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="165px"
                    />
                  </Th>
                  <Th borderColor={currentColors.tableBorder}>
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="165px"
                    />
                  </Th>
                  <Th borderColor={currentColors.tableBorder}>
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="165px"
                    />
                  </Th>
                  <Th borderColor={currentColors.tableBorder}>
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="165px"
                    />
                  </Th>
                  <Th borderColor={currentColors.tableBorder}>
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="165px"
                    />
                  </Th>
                  <Th
                    borderColor={currentColors.tableBorder}
                    display="flex"
                    justifyContent="flex-end"
                  >
                    <SkeletonWrapper
                      colorScheme="facebook"
                      fadeDuration={0.3}
                      mt="8px"
                      height="45px"
                      w="165px"
                    />
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {[1, 2, 3, 4, 5, 6].map((_index) => (
                  <Tr>
                    <Td pl="0" borderColor={currentColors.tableBorder}>
                      <Flex ml="11px">
                        <SkeletonWrapper
                          colorScheme="facebook"
                          fadeDuration={0.3}
                          mt="8px"
                          height="12px"
                          w="12px"
                        />
                        <Flex pl="10px" flexDirection="column">
                          <SkeletonWrapper
                            colorScheme="facebook"
                            fadeDuration={0.3}
                            mt="8px"
                            height="15px"
                            w={{
                              sm: "135px",
                              xl: "180px",
                            }}
                            s
                          />
                          <SkeletonWrapper
                            colorScheme="facebook"
                            fadeDuration={0.3}
                            mt="8px"
                            height="15px"
                            w={"100px"}
                          />
                        </Flex>
                      </Flex>
                    </Td>
                    <Td borderColor={currentColors.tableBorder}>
                      <SkeletonWrapper
                        colorScheme="facebook"
                        fadeDuration={0.3}
                        mt="8px"
                        height="12px"
                        w={"135px"}
                        ml="10px"
                        mb="25px"
                      />
                    </Td>
                    <Td borderColor={currentColors.tableBorder}>
                      <SkeletonWrapper
                        colorScheme="facebook"
                        fadeDuration={0.3}
                        mt="8px"
                        height="12px"
                        w="135px"
                        ml="10px"
                        mb="25px"
                      />
                    </Td>
                    <Td borderColor={currentColors.tableBorder}>
                      <SkeletonWrapper
                        colorScheme="facebook"
                        fadeDuration={0.3}
                        mt="8px"
                        height="12px"
                        w="135px"
                        ml="10px"
                        mb="25px"
                      />
                    </Td>
                    <Td borderColor={currentColors.tableBorder}>
                      <SkeletonWrapper
                        colorScheme="facebook"
                        fadeDuration={0.3}
                        mt="8px"
                        height="12px"
                        w="135px"
                        ml="10px"
                        mb="25px"
                      />
                    </Td>
                    <Td
                      height="75px"
                      borderColor={currentColors.tableBorder}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <SkeletonWrapper
                        colorScheme="facebook"
                        fadeDuration={0.3}
                        mt="8px"
                        height="12px"
                        w="135px"
                        ml="10px"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      )}
    </>
  );
}
