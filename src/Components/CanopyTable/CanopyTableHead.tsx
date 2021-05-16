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

import { Box, BoxProps } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { useCurrentColors } from '../../hooks/UseCurrentColors/UseCurrentColors';

interface Props {
    colSpan: number;
}

const Root = styled(Box)`
    &:hover &::last-child {
        width: 3px;
    }
`;

export function CanopyTableHead({ children, ...props }: BoxProps & Props) {
    const currentColors = useCurrentColors();
    return (
        <Root
            // as="th"
            color={currentColors.clientTableHeadingText}
            fontSize="13px"
            fontWeight={900}
            letterSpacing="0.2px"
            lineHeight="18px"
            p="20px"
            textTransform="uppercase"
            {...props}>
            {children}
        </Root>
    );
}
