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
export const clientSort = (property: any, order: boolean | undefined) => {
  var sort_order = 1;
  if (order) {
    sort_order = -1;
  }
  return function (a: any, b: any) {
    if (a[property] < b[property]) {
      return -1 * sort_order;
    } else if (a[property] > b[property]) {
      return 1 * sort_order;
    } else {
      return 0 * sort_order;
    }
  };
};
export const getKeyByValue = (object: Record<any, any>, value: string) => {
  let result: any = Object.keys(object).find((key) => object[key] === value);
  return result?.toString();
};
export const getBlankOptions = (filter: Record<string, any>) => {
  const _response: Record<string, any> = {};
  filter &&
    Object.keys(filter).map((_key) => {
      if (
        _key !== "parent_user_id" &&
        _key !== "user_id" &&
        _key !== "child_user_id" &&
        _key !== "ccy_account_id"
      ) {
        _response[_key] = [];
      }
    });
  return _response;
};
export const getFilterValueForSelectBox = (filter: Array<any>) => {
  const _filter: Record<string, Array<string>> = getBlankOptions(filter[0]);
  filter.map((_data: Record<string, any>) => {
    Object.keys(_filter).map((_key) => {
      if (_key === "trade_types") {
        _data[_key].map((_trade: string) => {
          !_filter[_key].includes(_trade) && _filter[_key].push(_trade);
        });
      } else {
        !_filter[_key].includes(_data[_key]) && _filter[_key].push(_data[_key]);
      }
    });
  });
  return _filter;
};
