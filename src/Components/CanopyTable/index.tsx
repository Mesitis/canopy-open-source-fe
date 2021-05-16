import { ChakraProvider } from "@chakra-ui/react";
import theme from "../../styles/colors";
import CanopyTable from "./CanopyTable";
const CanopyTableWrapper = (props: any) => {
  return (
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4} {...props}>
      <CanopyTable {...props}></CanopyTable>
    </ChakraProvider>
  );
};
export default CanopyTableWrapper;
