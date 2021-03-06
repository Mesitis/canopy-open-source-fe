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

import { Flex, Spinner, SpinnerProps, Text } from '@chakra-ui/react';
import { useCurrentColors } from '../../hooks/UseCurrentColors/UseCurrentColors';

interface SpinnerOverlayProps extends SpinnerProps {
    text: string;
}
function SpinnerOverlay({ text, size = 'xl', ...props }: SpinnerOverlayProps) {
    const currentColors = useCurrentColors();
    return (
        <>
            <Flex
                position="fixed"
                justify="center"
                align="center"
                direction="column"
                width="100%"
                height="100%"
                overflow="auto"
                zIndex={1300}
                backgroundColor={currentColors.containerBg}
                {...props}>
                <Flex
                    position="absolute"
                    top="50%"
                    left="50%"
                    height="auto"
                    transform="translate(-50%,-50%)"
                    direction="column"
                    display="inline"
                    textAlign={'center'}
                    zIndex={10}>
                    <Spinner
                        thickness="4px"
                        speed="1s"
                        color={currentColors.primaryColor}
                        size={size}
                        label="Loading..."
                    />
                    {/* <Box
                        width="64px"
                        height="64px"
                        border="none"
                        background={`url('/images/canopy_logo_only.svg') no-repeat center center`}></Box> */}
                    <Text
                        mt="5px"
                        pl="5px"
                        textAlign="center"
                        color={currentColors.loadingText}>
                        {`${text}...`}
                    </Text>
                </Flex>
            </Flex>
        </>
    );
}

export default SpinnerOverlay;
