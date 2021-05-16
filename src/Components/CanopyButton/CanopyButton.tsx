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
