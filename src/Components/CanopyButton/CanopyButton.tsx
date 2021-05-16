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

import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { useCurrentColors } from '../../hooks/UseCurrentColors/UseCurrentColors';

export default function ({
    children,
    variant = 'solid',
    ...props
}: ButtonProps) {
    const currentColors = useCurrentColors();
    const colorsMap: Record<string, Record<string, string>> = {
        solid: {
            backgroundColor: currentColors.primaryColor,
            color: currentColors.buttonText,
            border: '1px',
            borderColor: currentColors.buttonBorder,
        },
        outline: {
            backgroundColor: currentColors.secondaryColor,
            color: currentColors.primaryColor,
            border: '1px',
            borderColor: currentColors.buttonBorder,
        },
        ghost: {
            backgroundColor: 'transparent',
            color: currentColors.inputText,
            border: '0px',
            borderColor: 'none',
        },
        link: {
            backgroundColor: currentColors.primaryColor,
            color: currentColors.buttonText,
            border: '1px',
            borderColor: currentColors.buttonBorder,
        },
        unstyled: {
            backgroundColor: currentColors.primaryColor,
            color: currentColors.buttonText,
            border: '1px',
            borderColor: currentColors.buttonBorder,
        },
    };
    return (
        <Button
            borderRadius="4px"
            border={colorsMap[variant].border}
            borderColor={colorsMap[variant].borderColor}
            backgroundColor={colorsMap[variant].backgroundColor}
            color={colorsMap[variant].color}
            _disabled={{
                backgroundColor: currentColors.disabledButtonBg,
                borderColor: currentColors.disabledButtonBorder,
                color: currentColors.disabledButtonText,
            }}
            _focus={{
                outline: 'none',
                boxShadow: 'none',
                ...colorsMap[variant],
            }}
            _hover={{
                outline: 'none',
                boxShadow: 'none',
                ...colorsMap[variant],
            }}
            {...props}>
            {children}
        </Button>
    );
}
