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
