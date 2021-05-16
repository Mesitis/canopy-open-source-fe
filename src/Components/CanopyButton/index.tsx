import React from "react";
import CanopyButton from "./CanopyButton";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/colors";
const CanopyButtonWrapper = (props: any) => {
  return (
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4} {...props}>
      <CanopyButton {...props}></CanopyButton>
    </ChakraProvider>
  );
};
export default CanopyButtonWrapper;
