# Canopy Component Library

## Canopy Table

##### Features

- Column selector
- Client and Server side search support
- Client side and server side sorting support
- Client and Server side pagination support
- Custom Pagination support
- custom filters

#### Install

> npm i canopy-components --save

#### Import

> Import { CanopyTable } from "canopy-components";

#### API

- **title**: Title to be displayed on the table
  _ Type : String
  _ Required : _TRUE_
- **dataKey**: Key to access data passed into table  
   _ Type : String
  _ Required : _TRUE_
- **dataLoad**: Data to be displayed on the table \* Type : Array [ type:Object ]
- Object Specification > data: T;
  > loading: boolean;
  > error: { message: string };
  > meta: Record<string, unknown>;
- Required : _TRUE_
- **columns**: Columns to be displayed on the table
- Type : Array [ type:Object ]
- Object Specification

  > key: string;
  > headerText?: string;
  > type: string;
  > otherKeys?: Array<string>;
  > colSpan?: number;
  > expandRow?: boolean;
  > canReorder?: boolean;
  > canResize?: boolean;
  > canSort?: boolean;
  > actions?: Array<Record<string, string>>;
  > subTableColumns?: Record<string, string>;
  > width?: number;
  > align?: "center" | "left" | "right";
  > maxWidth?: number;
  > showOnSubTable?: boolean;
  > selectedByDefaultOn?: Array<"mobile" | "tablet" | "desktop">;
  > headerTextVariables?: Array<Record<string, string>>;
  > sticky?: string;
  > customCell?: any;

- Required : _TRUE_
  **showSearchOn**: To add search on the table  
   _ Type : ["desktop", "tablet", "mobile"] Or []
  _ Required : _FALSE_

**showColumnSelectorOn**: To add colum selectors on the table  
 _ Type : ["desktop", "tablet", "mobile"] Or []
_ Required : _FALSE_

**showPagination**: To enable and disable pagination on table  
 _ Type : Boolean
_ Required : _FALSE_

**per_page**: Data to be displayed per page on the table  
 _ Type : Number default 20
_ Required : _FALSE_

**per_page**: Data to be displayed per page on the table  
 _ Type : Number default 20
_ Required : _FALSE_

**customTablePager**: To add custom pagination Component
_ Type : React.ReactNode
_ Required : _FALSE_

**customTableFilter**: To add custom Filter Component
_ Type : React.ReactNode
_ Required : _FALSE_

**clientSideSearch**: To add enable and disable client side search
_ Type : Boolean
_ Required : _FALSE_

**clientSideSort**: To add enable and disable client side sorting
_ Type : Boolean
_ Required : _FALSE_

#### License

Unless explicitly stated otherwise all files in this repository are licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

```
Copyright 2021 Canopy Pte Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

An unmodified copy of the above license text must be included in all forks.

To obtain the software under a different license, please contact `hello <at> canopy.cloud`.
