import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import CanopyTable from "./Components/CanopyTable/CanopyTable";
import theme from "./styles/colors";
import Mock from "./stories/mock";
function App() {
  return (
    <ChakraProvider theme={theme} resetCSS={false} portalZIndex={4}>
      <CanopyTable
        recordName="rows"
        dataKey="consolidated_holdings"
        title="title"
        actionBar={true}
        dataLoad={{ data: Mock }}
        columns={[]}
        layoutState={{
          page: 1,
          per_page: 20,
          keyword: "",
          output_format: "",
        }}
        setLayoutState={() => {}}
        showSearchOn={["desktop", "tablet", "mobile"]}
        showColumnSelectorOn={["desktop", "tablet", "mobile"]}
        showFilterOn={["desktop", "tablet", "mobile"]}
        showDownloadOn={["desktop", "tablet", "mobile"]}
        per_page={30}
        childRowsApi={null}
        showPagination={true}
        customTablePager={undefined}
        customTableFilter={undefined}
        serverSideSearch={false}
        downloadCurrentData={true}
        meta={{}}
        requiredQueryFields={[]}
        filterType={""}
      />
    </ChakraProvider>
  );
}

export default App;
