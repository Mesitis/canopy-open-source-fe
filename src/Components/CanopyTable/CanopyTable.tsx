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

import {
  Box,
  Flex,
  SlideFade,
  Stack,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import cloneDeep from "lodash-es/cloneDeep";
import React, { useEffect, useState } from "react";
import {
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import { useSticky } from "react-table-sticky";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import { getDeviceType } from "../../hooks/UseResponsive/UseResponsive";
import ErrorBox from "../ErrorBox/ErrorBox";
import CanopySubTable from "./CanopySubTable";
import { CanopyTableHead } from "./CanopyTableHead";
import CanopyTablePager from "./CanopyTablePager";
import CanopyTableSearch from "./CanopyTableSearch";
import ColumnDefinition from "./ColumnDefinitions";
import ColumnSelector from "./ColumnSelector";
import { GrDrag, GrFormDown } from "react-icons/gr";
import { AiOutlineLine } from "react-icons/ai";
import { clientSort } from "./Utils";
import TableSkeleton from "./TableSkeleton";
import { isEqual } from "lodash";

export interface CanopyTableProps<TData, L>
  extends TAYFAElementProps<TData, Record<string, unknown>, L> {
  columns: Array<PropTableColumn>;
  recordName?: string;
  dataKey?: string;
  title?: string;
  actionBar?: boolean;
  showSearchOn?: string[];
  showColumnSelectorOn?: string[];
  showFilterOn?: string[];
  showDownloadOn?: string[];
  per_page?: number;
  showPagination?: boolean;
  childRowsApi: string | null;
  customTablePager?: React.ReactNode;
  customTableFilter?: React.ReactNode;
  clientSideSearch?: boolean;
  downloadAllData?: boolean;
  downloadCurrentData?: boolean;
  meta?: Record<string, string>;
  requiredQueryFields?: string[];
  filterType?: string;
  clientSideSort?: boolean;
  filterApi?: string;
  clientSideSortParentRows?: boolean;
  globalProps: any;
}

interface CustomTableProps {
  tableResizerBg: string;
  tableResizingActiveBg: string;
  tableBackGroundColor: string;
}

interface CustomTableProps {
  tableResizerBg: string;
  tableResizingActiveBg: string;
  tableBackGroundColor: string;
}

const CustomTable = styled.div<CustomTableProps>`
    overflow-x: auto;

    .table {
        border-spacing: 0;

        .tr {
            display: flex;
            :last-child {
                .td {
                    border-bottom: 0;
                }
            }
        }
        .tr .td{
            z-index:1;
            background: ${(props) => props.tableBackGroundColor};
            margin-top: 1px;
        }
        .th > div:hover {
            .dragger {
                opacity: 1;
            }
        }

        .th .dragger {
            opacity: 0;
            transition-duration: 200ms;
            transition-timing-function: ease-in;
        }

        .th,
        .td {
            margin: 0;
            padding-left: 30px;
            padding-right: 20px;
            position: relative;

            .resizer {
                display: flex;
                align-items: center;
                height: 100%;
                padding: 8px 0;
                
                z-index: 1;
                touch-action: none;
            }

            .resizer:hover > svg {
                opacity: 1;
            }

            .resizer > svg {
                opacity: 0;
                transition-duration: 200ms;
                transition-timing-function: ease-in;
            }

            .resizer > div {
                width: 1px;
                height: 100%;
                background: ${(props) => props.tableResizerBg};
            }
            .resizer.isResizing > div {
                background: ${(props) => props.tableResizingActiveBg};
            }

            .resizer.isResizing > svg {
                color: ${(props) => props.tableResizingActiveBg};
            }
        }

        
        .th {
            padding 10px 0;
            display: flex;
            padding-right: 0;
            padding-left: 0;
        }
        .th:first-of-type {
            padding-left: 20px;
        }
        .th:last-child {
            padding-right: 20px;
        }

        .td: first-of-type {
            padding-left: 20px;
        }
        &.sticky {
            overflow: scroll;
            .header {
              position: sticky;
              z-index: 9999;
              width: fit-content;
            }
      
            .header {
              top: 0;
              box-shadow: 0px 3px 3px #ccc;
            }
      
            .body {
              position: relative;
              z-index: 99;
            }
      
            [data-sticky-last-left-td] {
              z-index: 9999;
            }
      
            [data-sticky-first-right-td] {
             
            }
        }
    }
`;

function globalFilter<Data>(
  rows: any[],
  columnIds: Extract<keyof Data, string>[],
  searchQuery: string
) {
  rows = cloneDeep(rows);
  if (!searchQuery) return rows;
  const lowercaseQuery = searchQuery.toLowerCase();
  const rowMatches = (row: any): boolean => {
    const rowValues = { ...row.values, ticker: row.original["ticker"] };
    return (
      Object.values(rowValues).some(
        (rowValue) =>
          rowValue && String(rowValue).toLowerCase().includes(lowercaseQuery)
      ) || row.subRows.some(rowMatches)
    );
  };

  return rows.filter(rowMatches);
}

function CanopyTable(
  props: React.PropsWithChildren<
    CanopyTableProps<Record<string, unknown>[], TableLayoutState>
  >
) {
  const {
    recordName = "rows",
    dataKey,
    title = "",
    actionBar = true,
    dataLoad,
    columns,
    globalProps,
    layoutState,
    setLayoutState,
    showSearchOn = ["desktop", "tablet", "mobile"],
    showColumnSelectorOn = ["desktop", "tablet", "mobile"],
    showFilterOn = ["desktop", "tablet", "mobile"],
    showDownloadOn = ["desktop", "tablet", "mobile"],
    per_page = 30,
    childRowsApi = null,
    showPagination = true,
    children,
    customTablePager,
    customTableFilter,
    clientSideSearch = false,
    downloadAllData = true,
    downloadCurrentData = true,
    meta,
    requiredQueryFields,
    filterType,
    clientSideSort = false,
    filterApi,
    clientSideSortParentRows = false,
  } = props;
  const currentColors = useCurrentColors();
  const { isOpen } = useDisclosure();
  const [data, setData] = useState<Array<any>>([]);
  const [colReorderStart, setColReorderStart] = useState("");
  const [colReorderEnd, setColReorderEnd] = useState("");
  const [globalFilterMeta, setGlobalFilterMeta] = useState("");
  const [pageMeta, setPageMeta] = useState<{
    pageIndex: number;
    numTotalRows: number;
    numRowsInCurrPage: number;
    pageCount: number;
    pageSize: number;
  }>({
    pageIndex: 0,
    numTotalRows: 10,
    numRowsInCurrPage: 10,
    pageCount: 100,
    pageSize: 10,
  });

  const [allColumns, setAllColumns] = useState<Array<TableColumn>>([]);
  const [visibleColumns, setVisibleColumns] = useState<Array<TableColumn>>([]);
  const [isDataExists, setIsDataExists] = useState<boolean>(false);
  const [previousState, setPreviousState] = useState({});
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [resizedRow, setResizedRow] = useState({});
  const deviceType = getDeviceType();

  const onSearch = (searchKeyword: string) => {
    if (!clientSideSearch) {
      setLayoutState((layoutState) => {
        return { ...layoutState, keyword: searchKeyword };
      });
    } else {
      setGlobalFilter(searchKeyword);
      setGlobalFilterMeta(searchKeyword);
    }
  };

  const onApplyColumnSector = ({
    format: { columns },
  }: {
    format: {
      columns: Array<TableColumn>;
    };
  }) => {
    columns = [...columns];
    const order: any = [];
    let resizedColumns = columns.map((_col, index) => {
      order.push(_col.Header);
      if (index === columns.length - 1) {
        return { ..._col, canResize: false };
      } else {
        return _col;
      }
    });
    setColumnOrder(order);
    setVisibleColumns(resizedColumns);
  };

  const onApplyFilter = ({ filter }: { filter: Record<string, string> }) => {
    setLayoutState((layoutState) => {
      return {
        ...layoutState,
        group_by: filter,
      };
    });
  };

  const handleSubRows = (subRows: any, row: any) => {
    if (row.isExpanded) {
      const newData: any = data.map((dataItem: any, index: number) => {
        if (index === row.index) {
          return { ...dataItem, subRows };
        } else {
          return dataItem;
        }
      });
      setData(newData);
      row.toggleRowExpanded(true);
    }
  };

  const mapValuesToSubRows = ({ data, sortOrder, key }: any): any => {
    let SortRows: any = [];
    if (Array.isArray(data)) {
      if (clientSideSort && key) {
        SortRows = data.sort(clientSort(key, sortOrder));
        return SortRows.map((item: any) => {
          return mapValuesToSubRows({
            data: item,
            sortOrder,
            key,
          });
        });
      }
      return data.map((item) => {
        return mapValuesToSubRows({ data: item });
      });
    } else if (typeof data === "object") {
      if (data.hasOwnProperty("values") && data.values) {
        data = { ...data, subRows: data.values };
        delete data.values;
      }
      if (data.hasOwnProperty("subRows")) {
        if (clientSideSort && key) {
          data.subRows = mapValuesToSubRows({
            data: data.subRows,
            sortOrder,
            key,
          });
        } else data.subRows = mapValuesToSubRows({ data: data.subRows });
      }
      return data;
    }
    return data;
  };

  useEffect(() => {
    per_page
      ? setLayoutState((layoutState) => {
          return { ...layoutState, per_page: per_page, page: 1 };
        })
      : null;
  }, [per_page]);

  useEffect(() => {
    let data = [];
    if (dataKey && dataLoad?.data && dataLoad?.data[dataKey]) {
      data = dataLoad.data[dataKey];
    } else if (dataLoad?.data && Array.isArray(dataLoad?.data)) {
      data = dataLoad.data;
    }
    setData(mapValuesToSubRows({ data }));
  }, [dataLoad]);

  useEffect(() => {
    let _allColumns: Array<TableColumn> = [];
    if (columns?.length && allColumns.length === 0 && data.length > 0) {
      _allColumns = columns.map((column, index) => {
        const headerTextVariables: Record<string, string> = {};

        column.headerTextVariables?.forEach(({ key, value }) => {
          headerTextVariables[key] = data?.[0]?.[value];
        });

        return {
          ...ColumnDefinition[column.type]({
            column,
            //   globalProps,
            setLayoutState,
            currentColors,
            columns,
          }),
          //@ts-ignore
          visible: column.selectedByDefaultOn?.includes(deviceType),
          headerText: column.headerText,
        };
      });
      //@ts-ignore
      _allColumns.length > 0 ? (_allColumns[0].sticky = "left") : "";
      setAllColumns(_allColumns);
    }
    const _expanededState = Object.keys(state.expanded);
    if (
      _expanededState.length !== 0 &&
      !isEqual(_expanededState, expandedRows)
    ) {
      setExpandedRows(_expanededState);
      page.map((_page) => {
        if (_expanededState.includes(_page.id)) {
          _page?.toggleRowExpanded();
        }
      });
    } else {
      page.map((_page) => {
        if (expandedRows.includes(_page.id)) {
          _page?.toggleRowExpanded();
        }
      });
    }
  }, [columns, data]);

  useEffect(() => {
    let allColumns: Array<TableColumn> = [];
    if (columns?.length === 0 && data?.length) {
      allColumns = Object.keys(data[0]).map((key, index) => {
        return {
          ...ColumnDefinition["text"]({
            column: { key, type: "text" },
            //   globalProps,
          }),
          visible: true,
        };
      });
      setAllColumns(allColumns);
    }
  }, [data]);

  useEffect(() => {
    const _allColumns = cloneDeep(allColumns);

    if (visibleColumns?.length) {
      let _visibleColumns = _allColumns.filter((column) => {
        return Boolean(
          visibleColumns.find((item) => column.accessor === item.accessor)
        );
      });
      _visibleColumns = _visibleColumns.map((_col, index) => {
        if (index === _visibleColumns.length - 1) {
          return { ..._col, canResize: false };
        }
        return _col;
      });

      setVisibleColumns(_visibleColumns);
    } else {
      let _visibleColumns = _allColumns?.filter((column) => {
        return column.visible;
      });
      _visibleColumns = _visibleColumns.map((_col, index) => {
        if (index === _visibleColumns.length - 1) {
          return { ..._col, canResize: false };
        } else {
          return _col;
        }
      });

      setVisibleColumns(_visibleColumns);
    }
  }, [allColumns]);

  useEffect(() => {
    setIsDataExists(
      !(dataLoad?.loading || dataLoad?.error || data?.length === 0)
    );
  }, [dataLoad?.loading, dataLoad?.error, data]);

  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 10,
      width: 150,
      maxWidth: 1000,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    state,
    setColumnOrder,
    setGlobalFilter,
  } = useTable(
    {
      columns: visibleColumns,
      data,
      // filterTypes,
      globalFilter,
      initialState: {
        ...pageMeta,
        globalFilter: globalFilterMeta,
      },
      defaultColumn,
      manualPagination: true,
      manualSortBy: true,
      paginateExpandedRows: false,
      pageCount: pageMeta?.pageCount,
      // getSubRows: React.useMemo(
      //     () => (originalRow: object, relativeIndex: number) => {
      //         console.log(originalRow, relativeIndex);
      //         return [];
      //     },
      //     []
      // ),
      useControlledState: (state) => {
        return React.useMemo(() => {
          const newState = {
            ...state,
            globalFilter: globalFilterMeta,
          };
          return {
            ...newState,
            ...pageMeta,
          };
        }, [state, pageMeta, globalFilterMeta]);
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    useColumnOrder,
    useFlexLayout,
    useResizeColumns,
    usePagination,
    useSticky
  );
  useEffect(() => {
    if (
      //ts-ignore
      dataLoad?.data?.meta
    ) {
      setPageMeta({
        pageIndex: dataLoad.data.meta.page - 1,

        pageCount:
          dataLoad.data.meta.total_pages || dataLoad.data.meta.totalPages,

        pageSize: dataLoad.data.meta.per_page || dataLoad.data.meta.perPage,

        numRowsInCurrPage: data?.length,

        numTotalRows: dataLoad.data.meta.total,
      });
    }
  }, [dataLoad.data, data]);

  useEffect(() => {
    if (
      clientSideSort &&
      state.sortBy &&
      state.sortBy?.length &&
      !clientSideSortParentRows
    ) {
      if (dataLoad?.data && Array.isArray(dataLoad?.data)) {
        setExpandedRows([]);
        const key = state.sortBy?.[0]?.id;
        const sortOrder = state.sortBy?.[0]?.desc;
        dataLoad.data.map((_parent: any) => {
          _parent.subRows = _parent.subRows.sort(clientSort(key, sortOrder));
        });
        setData(mapValuesToSubRows({ data: dataLoad.data }));
      }
    } else if (
      clientSideSort &&
      clientSideSortParentRows &&
      state.sortBy &&
      state.sortBy?.length
    ) {
      let data = [];
      const key = state.sortBy?.[0]?.id;
      const sortOrder = state.sortBy?.[0]?.desc;
      if (dataKey) {
        data = dataLoad.data[dataKey].sort(clientSort(key, sortOrder));
      } else {
        data = dataLoad.data.sort(clientSort(key, sortOrder));
      }
      setData(mapValuesToSubRows({ data, sortOrder, key }));
    } else {
      if (state.sortBy && state.sortBy?.length) {
        setLayoutState((layoutState) => {
          return {
            ...layoutState,
            sortColumn: state.sortBy?.[0].id,
            sortDirection: state.sortBy?.[0].desc ? "desc" : "asc",
          };
        });
      } else {
        setLayoutState((layoutState) => {
          return {
            ...layoutState,
            sortColumn: "",
            sortDirection: "",
          };
        });
      }
    }
  }, [state?.sortBy]);

  useEffect(() => {
    let columns = [...visibleColumns];
    let _allColumns: any = [];
    let index: number = -1;
    let updatedColumn = columns.map((_col) => {
      index = state?.columnOrder.indexOf(_col.Header);
      if (index !== -1 && index + 1 !== state?.columnOrder.length) {
        _allColumns = allColumns.find(
          (column) => column.Header === _col.Header
        );
        return { ..._col, canResize: _allColumns?.canResize };
      } else if (index !== -1 && index + 1 === state?.columnOrder.length) {
        return { ..._col, canResize: false };
      } else {
        return _col;
      }
    });
    const order = state?.columnOrder;
    const indexOf =
      updatedColumn.length &&
      state?.columnOrder.indexOf(updatedColumn[0].Header);
    if (indexOf > 0) {
      order.splice(indexOf, 1);
      updatedColumn.length && order.unshift(updatedColumn[0].Header);
      setColumnOrder(order);
    }
    setVisibleColumns([...updatedColumn]);
  }, [state?.columnOrder]);

  if (dataLoad?.loading) {
    return <TableSkeleton></TableSkeleton>;
  }
  const onApplyMultiLevelFilter = (selection: Record<string, any>) => {
    setLayoutState((layoutState: any) => {
      const _returningObject = { ...layoutState };
      Object.keys(selection).map((_key) => {
        _returningObject[_key] =
          selection[_key].length > 0
            ? escape(JSON.stringify(selection[_key]))
            : "";
      });
      return _returningObject;
    });
  };
  return (
    <>
      <Box height={isDataExists ? "auto" : "100%"}>
        {actionBar && (
          <>
            {title && (
              <Box
                color={currentColors.headingText}
                mb="8px"
                fontSize="21px"
                fontWeight="900"
                lineHeight="1"
              >
                {title}
              </Box>
            )}
            <Flex
              align="center"
              justify="center"
              justifyContent="space-between"
              pb="20px"
              height="30px"
            >
              <Box width="100%">
                {/* <Tag
                                  size="sm"
                                  borderRadius="full"
                                  variant="solid"
                                  mr="8px"
                                  bg={currentColors.tableTagBg}
                                  color={currentColors.tableTagText}>
                                  <TagCloseButton
                                      onClick={() =>
                                          setLayoutState((layoutState) => {
                                              return {
                                                  ...layoutState,
                                                  keyword: '',
                                              };
                                          })
                                      }
                                      mr="4px"
                                  />
                                  <TagLabel fontWeight="bold">
                                      {layoutState.keyword}
                                  </TagLabel>
                              </Tag> */}
                {/* {state?.filters?.length > 0 &&
                                      state.filters.map((filter) => {
                                          return (
                                              <Tag
                                                  key={filter.id}
                                                  w="sm"
                                                  h="sm"
                                                  borderRadius="full"
                                                  variant="solid"
                                                  bg={
                                                      currentColors.tableTagBg
                                                  }
                                                  color={
                                                      currentColors.tableTagText
                                                  }>
                                                  <TagCloseButton
                                                      onClick={() =>
                                                          setFilter(
                                                              filter.id,
                                                              null
                                                          )
                                                      }
                                                      pr="4px"
                                                      pl="4px"
                                                      mr="4px"
                                                  />
                                                  <TagLabel fontWeight="bold">
                                                      {filter.id}:{' '}
                                                      {filter.value}
                                                  </TagLabel>
                                              </Tag>
                                          );
                                      })} */}
              </Box>
              <Stack isInline spacing="15px" align="center" justify="center">
                {showSearchOn.includes(deviceType) && (
                  <CanopyTableSearch
                    searchQuery={
                      !clientSideSearch
                        ? layoutState.keyword
                        : state.globalFilter
                    }
                    //   globalProps={globalProps}
                    onSearch={onSearch}
                    isDisabled={!isDataExists}
                  ></CanopyTableSearch>
                )}
                {showColumnSelectorOn.includes(deviceType) && (
                  <ColumnSelector
                    //    globalProps={globalProps}
                    allColumns={[...allColumns]}
                    visibleColumns={visibleColumns}
                    onApply={onApplyColumnSector}
                    isDisabled={!isDataExists}
                  ></ColumnSelector>
                )}
                {/* {showFilterOn.includes(deviceType) &&
                (isDataExists || dataLoad?.error) ? 
                  customTableFilter ? 
                    customTableFilter:null */}

                {/* {showDownloadOn.includes(deviceType) &&
                  (downloadAllData || downloadCurrentData) && (
                    <CanopyTableDownloader
                      globalProps={globalProps}
                      isDisabled={!isDataExists}
                      layoutState={layoutState}
                      downloadAllData={downloadAllData}
                      downloadCurrentData={downloadCurrentData}
                      endpoint={meta?.processedEndpoint || ""}
                      requiredQueryFields={requiredQueryFields}
                    ></CanopyTableDownloader>
                  )} */}
              </Stack>
            </Flex>
          </>
        )}

        {dataLoad.error && (
          <ErrorBox
            rounded="md"
            position="relative"
            color={currentColors.contentText}
            boxShadow={`0px 0px 2px ${currentColors.boxShadow}`}
            backgroundColor={currentColors.containerBg}
            height="35vh"
            borderRadius="4px"
            error={dataLoad.error}
          />
        )}

        {data?.length === 0 && !Boolean(dataLoad.error) && (
          <ErrorBox
            position="relative"
            color={currentColors.contentText}
            boxShadow={`0px 0px 2px ${currentColors.boxShadow}`}
            backgroundColor={currentColors.containerBg}
            height="35vh"
            borderRadius="4px"
            rounded="md"
            error={"no-data-available"}
          />
        )}
        <SlideFade in={isDataExists} offsetY="50px">
          {isDataExists && (
            <CustomTable
              tableResizerBg={currentColors.tableResizerBg}
              tableResizingActiveBg={currentColors.tableResizingActiveBg}
              tableBackGroundColor={currentColors.tableBackground}
            >
              <Box
                minWidth="100% !important"
                className="table sticky"
                overflow="auto"
                height="calc(100% - 77px - 52px)"
                {...getTableProps()}
                backgroundColor={currentColors.containerBg}
              >
                <Box
                  position="relative"
                  backgroundColor={currentColors.inputBg}
                >
                  <div>
                    {headerGroups.map((headerGroup, index) => (
                      <Box
                        {...headerGroup.getHeaderGroupProps()}
                        key={`${headerGroup.id}${index}`}
                        className="tr"
                      >
                        {headerGroup.headers.map((column, index) => {
                          const columnDef = visibleColumns.filter(
                            (item) => item.accessor === column.id
                          )[0];
                          const canResize = columnDef?.canResize;
                          const canReorder =
                            index === 0 ? false : columnDef?.canReorder;
                          const colSpan = columnDef?.colSpan;
                          const isAction = column.id === "actions";
                          let align = "flex-start";
                          if (isAction || columnDef?.align === "right") {
                            align = "flex-end";
                          } else if (columnDef?.align === "center") {
                            align = "center";
                          }

                          const isDragging =
                            canReorder && colReorderStart === column.id;
                          const isDragOver =
                            canReorder && colReorderEnd === column.id;
                          const tableProps = columnDef?.canSort
                            ? {
                                ...column.getHeaderProps(
                                  column.getSortByToggleProps()
                                ),
                              }
                            : {
                                ...column.getHeaderProps(),
                              };
                          return (
                            <CanopyTableHead
                              onDragStart={() => {
                                setColReorderStart(column.id);
                              }}
                              onDragOver={() => {
                                setColReorderEnd(column.id);
                              }}
                              onDragEnd={() => {
                                const visibleCols =
                                  state?.columnOrder?.length > 0
                                    ? Object.assign([], state.columnOrder)
                                    : visibleColumns.map((col) => col.accessor);
                                const startColIdx = visibleCols.indexOf(
                                  colReorderStart
                                );
                                const endColIdx = visibleCols.indexOf(
                                  colReorderEnd
                                );

                                const temp = visibleCols[endColIdx];
                                visibleCols[endColIdx] =
                                  visibleCols[startColIdx];
                                visibleCols[startColIdx] = temp;

                                setColumnOrder(visibleCols);
                                setColReorderStart("");
                                setColReorderEnd("");
                              }}
                              id={column.id}
                              _first={{
                                borderLeft: `1px solid ${currentColors.tableBorder}`,
                              }}
                              _last={{
                                borderRight: `1px solid ${currentColors.tableBorder}`,
                              }}
                              //
                              // borderRight={`1px solid ${currentColors.tableBorder}`}
                              borderTop={`1px solid ${currentColors.tableBorder}`}
                              opacity={isDragging ? 0.4 : 1}
                              className="th"
                              backgroundColor={
                                isDragOver
                                  ? currentColors.tableDragOverBg
                                  : currentColors.containerBg
                              }
                              colSpan={colSpan ? colSpan : 1}
                              {...tableProps}
                              key={column.id}
                            >
                              <Box
                                draggable={canReorder}
                                width="100%"
                                display="flex"
                                alignItems="center"
                                justifyContent={align}
                              >
                                {canReorder && (
                                  <Box
                                    as={GrDrag}
                                    name="DragIcon"
                                    className="dragger"
                                    style={{
                                      cursor: "pointer",
                                      marginRight: "10px",
                                      height: "20px",
                                      width: "23px",
                                      marginTop: "5px",
                                      color:
                                        currentColors.reorderingCloumnIconColor,
                                    }}
                                  />
                                )}
                                {columnDef?.headerText
                                  ? columnDef.headerText
                                  : column.render("Header")}{" "}
                                <span title={""}>
                                  {column.isSorted ? (
                                    column.isSortedDesc ? (
                                      <Box
                                        ml="6px"
                                        as={GrFormDown}
                                        name="ActDrpdwn"
                                        color={currentColors.inputBorder}
                                      ></Box>
                                    ) : (
                                      <Box
                                        ml="6px"
                                        as={GrFormDown}
                                        name="ActDrpdwn"
                                        transform="rotate(180deg)"
                                        color={currentColors.inputBorder}
                                      ></Box>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </Box>
                              {canResize && (
                                <Box
                                  {...column.getResizerProps()}
                                  className={`resizer ${
                                    column.isResizing ? "isResizing" : ""
                                  }`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                >
                                  <Box
                                    as={AiOutlineLine}
                                    name="ActARight"
                                    transform="rotate(90deg)"
                                    width={4}
                                    height={4}
                                    color={currentColors.inputBorder}
                                  />
                                  <div />
                                  <Box
                                    as={AiOutlineLine}
                                    name="ActARight"
                                    width={4}
                                    height={4}
                                    color={currentColors.inputBorder}
                                  />
                                </Box>
                              )}
                            </CanopyTableHead>
                          );
                        })}
                      </Box>
                    ))}
                  </div>
                  <div {...getTableBodyProps()}>
                    {page.map((row: any, index: number) => {
                      prepareRow(row);
                      return (
                        <React.Fragment key={row.id}>
                          <Box
                            className="tr"
                            borderLeft={`1px solid ${currentColors.tableBorder}`}
                            borderRight={`1px solid ${currentColors.tableBorder}`}
                            _last={{
                              borderBottom: `1px solid ${currentColors.tableBorder}`,
                            }}
                            backgroundColor={
                              row.depth === 0
                                ? currentColors.containerBg
                                : undefined
                            }
                            _after={
                              row.depth === 0 && index !== 0
                                ? {
                                    borderBottom: `1px solid ${currentColors.tableRowBorder}`,
                                    content: "''",
                                    left: "20px",
                                    position: "absolute",
                                    width: "calc(100% - 40px)", // account for 20px horizontal padding
                                  }
                                : row.depth !== 0
                                ? {
                                    borderBottom: `1px solid ${currentColors.subTableRowBorder}`,
                                    content: "''",
                                    left: "20px",
                                    position: "absolute",
                                    width: "calc(100% - 40px)", // account for 20px horizontal padding
                                  }
                                : undefined
                            }
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell: any) => {
                              const columnDef = visibleColumns.filter(
                                (item) => item.accessor === cell.column.id
                              )[0];

                              // const width = columnDef?.width;
                              const isAction = cell.column.id === "actions";
                              let align = "flex-start";
                              if (isAction || columnDef?.align === "right") {
                                align = "flex-end";
                              } else if (columnDef?.align === "center") {
                                align = "center";
                              }
                              return (
                                <Box
                                  key={cell.id}
                                  width={
                                    columnDef?.width
                                      ? columnDef?.width
                                      : "200px"
                                  }
                                  className="td"
                                  py={row.depth === 0 ? "10px" : "5px"}
                                  lineHeight="1"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent={align}
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </Box>
                              );
                            })}
                          </Box>
                          {row.isExpanded &&
                          childRowsApi &&
                          (row.original.subRows === undefined ||
                            //@ts-ignore
                            row.original.subRows?.length === 0) ? (
                            <div>
                              <div>
                                <CanopySubTable
                                  //@ts-ignore
                                  api={`${
                                    process?.env?.NEXT_PUBLIC_FLASH_DB_API
                                  }${childRowsApi.replace(
                                    "$id",
                                    row.original.id
                                  )}`}
                                  dataKey="children"
                                  //  globalProps={globalProps}
                                  setSubRows={(data: any) =>
                                    handleSubRows(data, row)
                                  }
                                  subRows={row?.original?.subRows}
                                ></CanopySubTable>
                              </div>
                            </div>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </Box>
              </Box>
            </CustomTable>
          )}
          {/* @ts-ignore */}
          {isDataExists && showPagination && (
            <CanopyTablePager
              {...{
                canPreviousPage,
                canNextPage,
                pageOptions,
                setPageSize,
                recordName,
                ...pageMeta,
              }}
              gotoPage={(page) => {
                window.scrollTo(0, 0);
                setLayoutState((layoutState) => {
                  return { ...layoutState, page };
                });
                setPageMeta((prev) => ({
                  ...prev,
                  pageIndex: page,
                }));
              }}
              //   globalProps={globalProps}
            />
          )}
          {isDataExists && customTablePager}
        </SlideFade>
      </Box>
    </>
  );
}

export default CanopyTable;
