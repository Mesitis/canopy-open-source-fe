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

interface TAYFAElementProps<T, Q, S> {
  dataLoadObject?: DataLoadObject<T>;
  dataLoad?: any;
  layoutState: S;
  setLayoutState: React.Dispatch<React.SetStateAction<S>>;
  pageProps?: Record<string, unknown>;
}

type DataLoadObject<T> = Record<string, DataLoad<T>>;

type DataLoad<T> = {
  data: T;
  loading: boolean;
  error: { message: string };
  mutate: () => void;
  meta: Record<string, unknown>;
};
interface PropTableColumn extends GlobalProps {
  key: string;
  headerText?: string;
  type: string;
  otherKeys?: Array<string>;
  colSpan?: number;
  expandRow?: boolean;
  canReorder?: boolean;
  canResize?: boolean;
  canSort?: boolean;
  actions?: Array<Record<string, string>>;
  subTableColumns?: Record<string, string>;
  width?: number;
  align?: "center" | "left" | "right";
  maxWidth?: number;
  showOnSubTable?: boolean;
  selectedByDefaultOn?: Array<"mobile" | "tablet" | "desktop">;
  headerTextVariables?: Array<Record<string, string>>;
  sticky?: string;
  customCell?: any;
}

type TableColumn = {
  Header: string;
  accessor: string;
  align: "center" | "left" | "right";
  canReorder?: boolean;
  canResize?: boolean;
  canSort?: boolean;
  width?: number;
  headerText?: string;
  colSpan?: number;
  visible?: boolean;
  Cell: ({ row }: Cell<typeof data[number]>) => any;
  headerTextVariables?: Array<Record<string, string>>;
};

type ColumnDefinition<S> = Record<
  string,
  ({
    column,
    setLayoutState,
    layoutState,
    columns,
  }: {
    column: PropTableColumn;
    setLayoutState?: React.Dispatch<SetStateAction<S>>;
    layoutState?: S;
    currentColors?: any;
    columns?: PropTableColumn[];
  }) => TableColumn
>;

interface AllocationsGroup {
  group_name: string;
  group_values: AllocationGroupValue[];
}

interface AllocationGroupValue {
  name: string;
  amount: string;
  percent: string;
  color: string;
}

interface AllocationsChartProps {
  data: AllocationGroupValue[] | undefined;
  group_by: string;
}

//PageWrapper
interface PageWrapperProps
  extends Pick<
    TAYFAElementProps,
    "layoutState" | "setLayoutState" | "pageProps"
  > {
  children?: JSX.Element;
  setCanRender: (boolean) => void;
  canRender?: boolean;
}

interface LayoutState {
  date: moment.Moment;
  maxDate: moment.Moment;
  user_id: string;
  user: Record<string, unknown>;
  from_date?: string | null;
  to_date?: string | null;
  analysis_type?: string;
  analysis_types?: Record<string, string>[];
}

interface TableLayoutState {
  page: number;
  per_page: number;
  keyword: string;
  output_format: string;
  user_id?: string;
}

type AllocationsLayoutState = Record<string, any> & LayoutState;

type PortfolioUser = {
  uniqueId: string;
  id: string;
  username: string;
  displayName: string;
  meta: string;
};
type PortfolioGroup = {
  uniqueId: string;
  id: string | null;
  name: string;
  users: Array<PortfolioUser>;
};

interface PortfolioState {
  users: Array<PortfolioUser>;
  groups: PortfolioGroup[];
  selectedUser: PortfolioUser | null;
  viewType: Record<string, string> | null;
}

interface HoldingsFilter {
  key: string;
  groupByFilters: string[];
  headerText: string;
}

interface DatePickerProps {
  date?: moment.Moment;
  onDateChange?: (date: moment.Moment | null) => void;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  formatDate?: string;
  focused?: boolean;
  onFocusChange?: ({ focused }: { focused: boolean }) => void;
  numberOfMonths?: number;
  id: string;
}

interface DateRangePickerProps {
  startDate?: moment.Moment;
  onStartDateChange?: (date: moment.Moment | null) => void;
  maxStartDate?: moment.Moment;
  minStartDate?: moment.Moment;
  endDate?: moment.Moment;
  onEndDateChange?: (date: moment.Moment | null) => void;
  maxEndDate?: moment.Moment;
  minEndDate?: moment.Moment;
  formatDate?: string;
  focused?: boolean;
  onFocusChange?: ({ focused }: { focused: boolean }) => void;
  numberOfMonths?: number;
  id: string;
}
