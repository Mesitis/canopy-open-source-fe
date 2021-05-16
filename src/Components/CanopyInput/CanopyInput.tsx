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

import { FormLabel, Input, InputProps, Stack } from '@chakra-ui/react';
import React from 'react';
import { useCurrentColors } from '../../hooks/UseCurrentColors/UseCurrentColors';

export interface CanopyInputProps extends InputProps {
    label?: string;
    type?: string;
}
export default function CanopyInput({ children, ...props }: CanopyInputProps) {
    const currentColors = useCurrentColors();

    return (
        <Stack mb="0px">
            {props.label ? (
                <FormLabel
                    p="0px"
                    htmlFor={props.id}
                    color={currentColors.headingText}
                    fontSize={props.fontSize}
                    fontWeight="bold"
                    lineHeight="unset"
                    mb="7px">
                    {props.label}
                </FormLabel>
            ) : null}
            <Input
                height="45px"
                border="1px"
                borderRadius="4px"
                color={currentColors.otherText}
                borderColor={currentColors.inputBorder}
                backgroundColor={currentColors.inputBg}
                p={4}
                _hover={{
                    color: currentColors.inputText,
                    borderColor: currentColors.inputBorder,
                    backgroundColor: currentColors.inputBg,
                }}
                _focus={{
                    color: currentColors.inputText,
                    outline: 'none',
                    boxShadow: 'none',
                    borderColor: currentColors.inputBorder,
                    backgroundColor: currentColors.inputBg,
                }}
                _active={{
                    color: currentColors.inputText,
                    backgroundColor: currentColors.inputBg,
                }}
                {...props}
            />
        </Stack>
    );
}
