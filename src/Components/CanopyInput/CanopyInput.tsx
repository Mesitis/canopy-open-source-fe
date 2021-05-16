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
