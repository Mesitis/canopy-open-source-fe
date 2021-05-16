import React from "react";
import ErrorBox from "./ErrorBox";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/colors";
const ErrorBoxWrapper = (props: any) => {
  return (
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4} {...props}>
      <ErrorBox {...props}></ErrorBox>
    </ChakraProvider>
  );
};
export default ErrorBoxWrapper;
