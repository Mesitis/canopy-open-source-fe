import { extendTheme, theme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const charts = {
    standard: [
        '#0050A0',
        '#7DBDF5',
        '#602D84',
        '#9462BA',
        '#DC8C32',
        '#FAD583',
        '#22585A',
        '#4AADAC',
        '#8D92E9',
        '#B5B9FC',
    ],
};

// 2. Update the breakpoints as key-value pairs
const breakpoints = createBreakpoints({
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
});

export default extendTheme({
    styles: {
        global: (props) => ({
            'html, body': {
                fontSize: 'md',
                bgColor: props.colorMode === 'dark' ? '#121212' : '#F8F8F8',
                height: 'auto',
                overflow: 'visible',
            },
        }),
    },
    breakpoints,
    colors: {
        ...theme.colors,
        light: {
            white: '#ffffff',
            navbarBg: '#FFFFFF',
            sidebarBg: '#FFFFFF',
            containerBg: '#FFFFFF',
            datePickerBg: '#FFFFFF',
            primaryColor: '#398E40',
            secondaryColor: '#ffffff',
            boxBorder: '#F0F0F0',
            pageBg: '#F8F8F8',
            inputBg: '#F8F8F8',
            inputBorder: '#D3D3D3',
            inputText: '#323232',
            placeHolderText: '#848484',
            buttonBg: '#398E40',
            buttonText: '#F8F8F8',
            buttonBorder: '#D3D3D3',
            disabledButtonBg: '#F0F0F0',
            disabledButtonText: '#8D8D8D',
            headingText: '#141414',
            contentText: '#323232',
            percentText: '#323232',
            otherText: '#4B4B4B',
            subHeadingText: '#868686',
            boxShadow: '#00000029',
            tableBorder: '#EEEEEE',
            dropDownBorder: '#C4C4C4',
            dropDownBorder1: '#E2E2E2',
            closeIcon: '#868686',
            tableHeadingText: '#6E6E6E',
            searchBg: '#EEEEEE',
            navbarIconBg: '#E6E6E6',
            toggleButtonHoverBg: '#F8F8F8',
            toggleButtonSelectedBg: '#EEEEEE',
            calendarSelected: '#C8E6C9',
            calendarSelectedSpan: '#CFE9BE',
            errorText: '#D12100',
            errorBg: '#ffe7e2',
            // @ts-ignore
            charts,
            highlightedButtonBg: '#009444',
            tableRowBorder: '#E2E2E2',
            subTableRowBorder: '#CECECE',
            loadingText: '#6E6E6E',
            tagIcon: '#939393',
            tagBg: '#EFEFEF',
            selectedTag: '#15651C',
            navbarExpandedBg: '#E3E3E3',
            tableTagBg: '#CFE9BE',
            tableTagText: '#15651C',
            tableResizerBg: '#e3e3e3',
            tableResizingActiveBg: '#6E6E6E',
            tableDragOverBg: '#e5efff',
            drawerBg: '#111620',
            drawerActiveTextColor: '#FFFFFF',
            drawerTextColor: '#576279',
            drawerActiveIconColor: '#15651C',
            drawerIconColor: '#576279',
            currencyBorder: '#e4e7e7',
            popoverHoverBg: '#F0F0F0',
            popoverColor: '#000000',
            popoverHoverColor: '#000000',
            dropDownOptionSubText: '#808080',
            tableBackground: '#FFFFFF',
            selectedTagColor: '#FFFFFF',
            clientTableHeadingText: '#141414',
            reorderingCloumnIconColor: '#323232',
            text: '#323232',
            tickerBackground: '#EEEEEE',
        },
        dark: {
            white: '#ffffff',
            navbarBg: '#1E1E1E',
            sidebarBg: '#1E1E1E',
            primaryColor: '#398E40',
            pageBg: '#121212',
            inputBg: '#121212',
            inputBorder: '#4b4b4b',
            buttonBg: '#398E40',
            buttonText: '#F8F8F8',
            headingText: '#EEEEEE',
            contentText: '#6E6E6E',
            green: '#398E40',
            //tableHeadingText: '#939393',
            tableBorder: '#323232',
            percentText: '#D3D3D3',
            buttonBorder: '#393939',
            containerBg: '#1E1E1E',
            datePickerBg: '#1E1E1E',
            errorBg: '#440c00',
            errorText: '#ff593a',
            tableHeadingText: '#6E6E6E',

            navbarIconBg: '#141414',
            toggleButtonHoverBg: '#121212',
            toggleButtonSelectedBg: '#141414',
            calendarSelected: '#15311e',
            calendarSelectedSpan: '#122719',
            // @ts-ignore
            charts,
            highlightedButtonBg: '#009444',
            boxShadow: '#00000059',
            boxBorder: '#1A1A1A',
            tableTagBg: '#CFE9BE',
            tableTagText: '#15651C',
            tableResizerBg: '#424242',
            tableResizingActiveBg: '#4299e199',
            tableDragOverBg: '#1f2223',
            drawerBg: '#1E1E1E',
            drawerActiveTextColor: '#FFFFFF',
            drawerTextColor: '#6E6E6E',
            drawerActiveIconColor: '#15651C',
            drawerIconColor: '#6E6E6E',
            tableRowBorder: '#323232',
            tagBg: '#323232',
            tagIcon: '#6E6E6E',
            otherText: '#F8F8F8',
            disabledButtonBg: '#1A1A1A',
            disabledButtonText: '#8D8D8D',
            placeholderText: '#C4C4C4',
            selectedTag: '#EEEEEE',
            currencyBorder: '#4b4b4b',
            popoverHoverBg: '#141414',
            popoverColor: '#939393',
            popoverHoverColor: '#ffffff',
            dropDownOptionSubText: '#808080',
            selectedTagColor: '#15651C',
            clientTableHeadingText: '#EEEEEE',
            reorderingCloumnIconColor: '#ffffff',
            subTableRowBorder: '#323232',
            tableBackground: '#1E1E1E',
            text: '#ffffff',
        },
    },
    fonts: {
        body: 'Roboto, sans-serif',
        heading: 'Roboto, sans-serif',
        mono: 'Roboto, sans-serif',
    },
    fontSizes: {
        xs: '12px',
        sm: '13px',
        md: '13px',
        lg: '13px',
        xl: '13px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
    },
    zIndices: {
        tooltip: 9999,
    },
});
