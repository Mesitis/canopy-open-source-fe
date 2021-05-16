import { useColorMode, useTheme } from '@chakra-ui/react';

export function useCurrentColors() {
    const { colorMode } = useColorMode();
    return useTheme().colors[colorMode];
}
export function useLightThemeColors() {
    return useTheme().colors['light'];
}
