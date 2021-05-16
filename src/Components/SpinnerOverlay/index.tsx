import React from "react";
import SpinnerOverlay from "./SpinnerOverlay";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/colors";
const SpinnerOverlayWrapper = (props: any) => {
  return (
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4} {...props}>
      <SpinnerOverlay {...props}></SpinnerOverlay>
    </ChakraProvider>
  );
};
export default SpinnerOverlayWrapper;
