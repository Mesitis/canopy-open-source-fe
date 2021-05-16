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
