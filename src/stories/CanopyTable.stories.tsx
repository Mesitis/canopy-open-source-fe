import React from "react";
import CanopyTable from "../Components/CanopyTable";
import Mock from "./mock";

export default {
  title: "Canopy Components/CanopyTable",
  component: CanopyTable,
};

const Template = (args: any) => (
  <CanopyTable
    recordName="rows"
    dataKey="consolidated_holdings"
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
    {...args}
  />
);

export const _CanopyTable = Template.bind({});
//@ts-ignore
_CanopyTable.args = {
  title: "Canopy Table",
};
