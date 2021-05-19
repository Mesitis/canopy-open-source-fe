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

import { Button } from "@chakra-ui/react";
import React from "react";
import CanopyTable from "../Components/CanopyTable";
import Mock from "./mock";

export default {
  title: "Canopy Components/CanopyTable",
  component: CanopyTable,
};
const columns = [
  {
    key: "security_name",
    otherKeys: ["ticker"],
    width: 120,
    type: "splitCell",
    headerText: "name",
    selectedByDefaultOn: ["desktop", "mobile", "tablet"],
    canSort: true,
  },
  {
    key: "ticketref",
    type: "text",
    colSpan: "1",
    headerText: "ticketref",
    selectedByDefaultOn: ["desktop"],
    width: 100,
    canSort: false,
  },
  {
    key: "traded_on",
    type: "date",
    headerText: "traded_on",
    selectedByDefaultOn: ["desktop", "tablet"],
    width: 100,
    canSort: true,
  },
  {
    key: "settled_on",
    type: "date",
    headerText: "settlement-date",
    selectedByDefaultOn: ["desktop"],
    width: 100,
    canSort: true,
  },
  {
    key: "trade_type",
    type: "text",
    headerText: "trade-type",
    selectedByDefaultOn: ["desktop", "mobile", "tablet"],
    canSort: true,
  },
  {
    key: "contract_currency",
    type: "text",
    width: 80,
    headerText: "contract-currency",
    selectedByDefaultOn: ["desktop", "tablet"],
    canSort: true,
  },
  {
    key: "trade_price",
    type: "amount",
    width: 100,
    headerText: "price",
    selectedByDefaultOn: ["desktop", "tablet"],
  },
  {
    key: "quantity",
    type: "amount",
    headerText: "quantity",
    selectedByDefaultOn: ["desktop", "tablet"],
    canSort: true,
  },
  {
    key: "settlement_amount_ccy",
    type: "amount",
    headerText: "settlement-amount",
    selectedByDefaultOn: ["desktop", "mobile", "tablet"],
    canSort: true,
  },
  {
    key: "bank_narration",
    type: "text",
    headerText: "narration",
    width: 400,
  },
  {
    key: "transaction_type",
    type: "text",
    headerText: "transaction_type",
    canSort: true,
  },
  {
    key: "isin",
    type: "text",
    headerText: "isin",
    canSort: true,
  },
  {
    key: "contract_type",
    type: "text",
    headerText: "contract_type",
    canSort: true,
  },
  {
    key: "parent_display_name",
    type: "text",
    headerText: "parent-display-name",
    canSort: true,
  },
  {
    key: "child_display_name",
    type: "text",
    headerText: "child-display-name",
    canSort: true,
  },
  {
    key: "ccy_account_code",
    type: "text",
    headerText: "ccy-account-code",
    canSort: true,
  },
  {
    key: "user_asset_class",
    type: "text",
    headerText: "asset-class",
    canSort: true,
  },
  {
    key: "user_industry",
    type: "text",
    headerText: "sub-asset-class",
    canSort: true,
  },
  {
    key: "user_geography",
    type: "text",
    headerText: "geography",
    canSort: true,
  },
  {
    key: "custodian_name",
    type: "text",
    headerText: "custodian-name",
    canSort: true,
  },
  {
    key: "Actions",
    type: "custom",
    headerText: "Actions",
    canSort: true,
    width: 100,
    selectedByDefaultOn: ["desktop", "mobile", "tablet"],
    customCell: () => {
      return (
        <Button
          variant="contained"
          color="white"
          borderRadius="4px"
          backgroundColor="green"
          w="100px"
          h="30px"
        >
          Edit
        </Button>
      );
    },
  },
];
const Template = (args: any) => (
  <CanopyTable
    recordName="rows"
    dataKey="consolidated_holdings"
    actionBar={true}
    dataLoad={{ data: Mock }}
    columns={columns}
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
