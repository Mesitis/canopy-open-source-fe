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

import { BoxProps, Flex } from '@chakra-ui/react';
import React from 'react';
import { useCurrentColors } from '../../hooks/UseCurrentColors/UseCurrentColors';
interface ErrorBoxProps extends BoxProps {
    error: string;
}
function ErrorBox({ error, ...props }: ErrorBoxProps) {
    const currentColors = useCurrentColors();
    return (
        <Flex
            position="fixed"
            justify="center"
            align="center"
            direction="column"
            width="100%"
            height="100%"
            p="16px"
            fontSize="14px"
            // bg={currentColors.errorBg}
            color={currentColors.contentText}
            {...props}>
            {error}
        </Flex>
    );
}

export default ErrorBox;
