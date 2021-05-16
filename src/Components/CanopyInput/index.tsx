import React from "react";
import CanopyInput from "./CanopyInput";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/colors";
const CanopyInputWrapper = (props: any) => {
  return (
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4} {...props}>
      <CanopyInput {...props}></CanopyInput>
    </ChakraProvider>
  );
};
export default CanopyInputWrapper;
