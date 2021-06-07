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
