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
