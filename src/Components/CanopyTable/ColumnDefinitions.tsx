import { Box, Flex, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import { SetStateAction } from "react";
// import ViewSecurity from "../../../components/Holdings/ViewSecurity";
import IconButton from "../IconButton/IconButton";
import CurrencyAmount from "./Cells/CurrencyAmount";
import CurrencyLib from "currency.js";
import { GrFormDown } from "react-icons/gr";

const columnDef: ColumnDefinition<TableLayoutState> = {
  currencyAmount: ({
    column: {
      key,
      otherKeys,
      canReorder = true,
      canSort = false,
      canResize = true,
      // maxWidth = 300,
      width = 200,
      align = "right",
      colSpan = 1,
    },
    currentColors,
  }: {
    column: PropTableColumn;
    currentColors?: any;
  }) => {
    return {
      Header: key,
      accessor: key,
      canReorder,
      canSort,
      canResize,
      align,
      width,
      // maxWidth,
      colSpan,
      Cell: ({ row }) => {
        return (
          <Tooltip
            key={row.original[key]}
            aria-label={row.original[key]}
            label={`${
              otherKeys ? row.original[otherKeys[0]] : ""
            } ${CurrencyLib(row.original[key], {
              symbol: "",
            }).format()}`}
            bg={currentColors?.otherText}
            color={currentColors?.containerBg}
            placement="bottom-start"
            fontSize="11px"
            hasArrow
          >
            <span>
              <CurrencyAmount
                pr={canResize ? "27px" : ""}
                currency={otherKeys ? row.original[otherKeys[0]] : ""}
                amount={row.original[key]}
              ></CurrencyAmount>
            </span>
          </Tooltip>
        );
      },
    };
  },
  amount: ({
    column: {
      key,
      width = 100,
      // maxWidth = 300,
      align = "right",
      colSpan = 1,
      canReorder = true,
      canSort = false,
      canResize = true,
    },
    currentColors,
  }: {
    column: PropTableColumn;
    currentColors?: any;
  }) => {
    return {
      Header: key,
      accessor: key,
      canReorder,
      canSort,
      canResize,
      align,
      width,
      // maxWidth,
      colSpan,

      Cell: ({ row }) => {
        return (
          <Tooltip
            key={row.original[key]}
            aria-label={row.original[key]}
            label={`${CurrencyLib(row.original[key], {
              symbol: "",
            }).format()}`}
            bg={currentColors?.otherText}
            color={currentColors?.containerBg}
            placement="bottom-start"
            fontSize="11px"
            hasArrow
          >
            <span>
              <CurrencyAmount
                pr="20px"
                amount={row.original[key]}
              ></CurrencyAmount>
            </span>
          </Tooltip>
        );
      },
    };
  },
  percent: ({
    column: {
      key,
      width = 100,
      // maxWidth = 300,
      align = "right",
      colSpan = 1,
      canReorder = true,
      canSort = false,
      canResize = true,
    },
    currentColors,
  }: {
    column: PropTableColumn;
    currentColors?: any;
  }) => {
    return {
      Header: key,
      accessor: key,
      canReorder,
      canSort,
      canResize,
      align,
      width,
      // maxWidth,
      colSpan,
      Cell: ({ row }) => {
        return (
          <Tooltip
            key={row.original[key]}
            aria-label={row.original[key]}
            label={`${CurrencyLib(row.original[key], {
              symbol: "",
            }).format()}%`}
            bg={currentColors?.otherText}
            color={currentColors?.containerBg}
            placement="bottom-start"
            fontSize="11px"
            hasArrow
          >
            <span>
              <CurrencyAmount
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                percent={true}
                amount={row.original[key]}
              ></CurrencyAmount>
            </span>
          </Tooltip>
        );
      },
    };
  },
  text: ({
    column: {
      key,
      width = 100,
      // maxWidth = 300,
      align = "left",
      colSpan = 1,
      canReorder = true,
      canSort = false,
      canResize = true,
    },

    currentColors,
  }: {
    column: PropTableColumn;
    currentColors?: any;
  }) => {
    return {
      Header: key,
      accessor: key,
      canReorder,
      canSort,
      canResize,
      align,
      width,
      // maxWidth,
      colSpan,
      Cell: ({ row }) => {
        return (
          <Tooltip
            aria-label={row.original[key]}
            label={row.original[key]}
            bg={currentColors?.otherText}
            color={currentColors?.containerBg}
            placement="bottom-start"
            fontSize="11px"
            hasArrow
          >
            <Box textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden">
              {row.original[key] ? row.original[key] : "-"}
            </Box>
          </Tooltip>
        );
      },
    };
  },
  date: ({
    column: {
      key,
      width = 200,
      align = "right",
      colSpan = 1,
      canReorder = true,
      canSort = false,
      canResize = true,
    },
    currentColors,
  }: {
    column: PropTableColumn;
    currentColors?: any;
  }) => {
    return {
      Header: key,
      accessor: key,
      canReorder,
      canSort,
      canResize,
      align,
      width,
      colSpan,

      Cell: ({ row }) => {
        if (row.original[key]) {
          const date = moment(row.original[key], "YYYY-MM-DD").format(
            "DD/MM/YYYY"
          );
          return date !== "Invalid date" ? (
            <Tooltip
              key={date}
              aria-label={date}
              label={date}
              bg={currentColors?.otherText}
              color={currentColors?.containerBg}
              placement="bottom-start"
              fontSize="11px"
              hasArrow
            >
              {date}
            </Tooltip>
          ) : (
            "-"
          );
        }
        return "-";
      },
    };
  },
  splitCell: ({
    column: {
      key,
      otherKeys = [],
      expandRow,
      width = 200,
      canReorder = false,
      canSort = false,
      canResize = true,
      align = "left",
      colSpan = 1,
      actions = [],
    },
    currentColors,
    columns,
  }: {
    column: PropTableColumn;
    currentColors?: any;
    columns?: PropTableColumn[];
  }) => {
    return {
      Header: key,
      accessor: key,
      canReorder,
      canSort,
      canResize,
      align,
      width,
      colSpan,

      Cell: ({ row, rows }) => {
        const parentRow = rows.find(
          ({ id }: any) => id === row.id.split(".")[0]
        );
        return (
          <Flex
            width={"full"}
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            {...(row.canExpand || (expandRow && row.depth === 0)
              ? {
                  ...row.getToggleRowExpandedProps({
                    onClick: () => {
                      rows.forEach((item: any) => {
                        if (
                          (item.isExpanded &&
                            row.depth === 0 &&
                            item.id !== row.id) ||
                          item.id === row.id
                        ) {
                          item.toggleRowExpanded();
                        }

                        if (
                          row.depth !== 0 &&
                          row.id.split(".")[0] == item.index
                        ) {
                          row.toggleRowExpanded();
                        }
                      });
                    },
                    title: undefined,
                  }),
                }
              : null)}
          >
            <Box
              pl={`${row.depth * 22}px`}
              // pr={
              //   row.canExpand || (expandRow && row.depth === 0) ? "10px" : "0px"
              // }
            >
              {(expandRow && row.depth === 0) || row.canExpand ? (
                row.isExpanded ? (
                  <IconButton
                    width="12px"
                    height="12px"
                    backgroundColor="transparent"
                    color="#6E6E6E"
                    Icon={GrFormDown}
                    transform="rotate(180deg)"
                    aria-label="Collapse"
                    _focus={{
                      border: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    _active={{
                      border: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    _hover={{
                      border: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                ) : (
                  <IconButton
                    width="12px"
                    height="12px"
                    backgroundColor="transparent"
                    color="#6E6E6E"
                    Icon={GrFormDown}
                    aria-label="Expand"
                    _focus={{
                      border: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    _active={{
                      border: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    _hover={{
                      border: "0px",
                      backgroundColor: "transparent",
                    }}
                  />
                )
              ) : null}
            </Box>
            <Box width="full">
              <Tooltip
                aria-label={row.original[key]}
                label={row.original[key]}
                bg={currentColors?.otherText}
                color={currentColors?.containerBg}
                placement="bottom-start"
                fontSize="11px"
                hasArrow
              >
                <Box
                  width={
                    !row.canExpand &&
                    actions.findIndex(({ name }) => name === "ViewSecurity") !==
                      -1 &&
                    parentRow?.original?.viewSecurity
                      ? "calc(100% - 26px)"
                      : "calc(100% - 15px)"
                  }
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  fontSize="14px"
                  fontWeight="bold"
                  lineHeight="1.5"
                >
                  {!row.canExpand &&
                    actions.findIndex(({ name }) => name === "ViewSecurity") !==
                      -1 &&
                    row.depth !== 0 &&
                    parentRow?.original?.viewSecurity && (
                      <></>
                      // <ViewSecurity
                      //   columns={columns}
                      //   data={row.original}
                      //   globalProps={globalProps}
                      // ></ViewSecurity>
                    )}
                  <span>
                    {" "}
                    {row.original[key]}
                    {row.depth === 0 && parentRow?.original?.showCount
                      ? ` (${row?.subRows?.length})`
                      : ""}
                  </span>
                  {row.original["userType"] === "Alias" && row.depth === 0 && (
                    <IconButton
                      ml="4px"
                      backgroundColor="transparent"
                      color="#6E6E6E"
                      Icon={GrFormDown}
                      aria-label="Collapse"
                      _focus={{
                        border: "0px",
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      _active={{
                        border: "0px",
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                      _hover={{
                        border: "0px",
                        outline: "none",
                        backgroundColor: "transparent",
                      }}
                    />
                  )}
                </Box>
              </Tooltip>
              {otherKeys.map((otherKey) => {
                return (
                  <Tooltip
                    key={row.original[otherKey]}
                    aria-label={row.original[otherKey]}
                    label={row.original[otherKey]}
                    bg={currentColors?.otherText}
                    color={currentColors?.containerBg}
                    placement="bottom-start"
                    fontSize="11px"
                    hasArrow
                  >
                    <Box
                      width={
                        !row.canExpand &&
                        actions.findIndex(
                          ({ name }) => name === "ViewSecurity"
                        ) !== -1 &&
                        parentRow?.original?.viewSecurity
                          ? "calc(100% - 26px)"
                          : "calc(100% - 15px)"
                      }
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      overflow="hidden"
                      key={otherKey}
                      color={"gray.500"}
                      fontSize="12px"
                      fontWeight="medium"
                      lineHeight="1.5"
                      ml={
                        !row.canExpand &&
                        actions.findIndex(
                          ({ name }) => name === "ViewSecurity"
                        ) !== -1 &&
                        parentRow?.original?.viewSecurity
                          ? "22px"
                          : "0px"
                      }
                    >
                      <span> {row.original[otherKey]}</span>
                    </Box>
                  </Tooltip>
                );
              })}
            </Box>
          </Flex>
        );
      },
    };
  },
  actions: ({
    column: {
      actions,
      showOnSubTable = false,
      canReorder = true,
      canSort = false,
      canResize = true,
    },
    setLayoutState,
  }: {
    column: PropTableColumn;
    setLayoutState?: React.Dispatch<SetStateAction<TableLayoutState>>;
  }) => {
    return {
      Header: "actions",
      accessor: "actions",
      id: "actions",
      align: "center",
      width: 100,
      canReorder,
      canSort,
      canResize,
      Cell: ({ row }) => {
        if (showOnSubTable || row.depth === 0) {
          return (
            <Flex justifyContent="center">
              {actions
                ? actions.map(({ name, path }: any) => {
                    const action: typeof actionsDetails[string] =
                      actionsDetails[name];
                    return (
                      <></>
                      // <IconButton
                      //   variant="ghost"
                      //   key={name}
                      //   aria-label={name}
                      //   Icon={action.icon}
                      //   onClick={() =>
                      //     action.onAction(row, path, setLayoutState)
                      //   }
                      //   color="#009444"
                      //   _focus={{
                      //     border: "0px",
                      //     outline: "none",
                      //     backgroundColor: "transparent",
                      //   }}
                      //   _active={{
                      //     border: "0px",
                      //     outline: "none",
                      //     backgroundColor: "transparent",
                      //   }}
                      //   _hover={{
                      //     border: "0px",
                      //     outline: "none",
                      //     backgroundColor: "transparent",
                      //   }}
                      // />
                    );
                  })
                : ""}
            </Flex>
          );
        }
        return null;
      },
    };
  },
};

const actionsDetails: Record<
  string,
  {
    icon: string;
    onAction: (
      row: any,
      path: string,
      setLayoutState?: React.Dispatch<SetStateAction<TableLayoutState>>
    ) => void;
  }
> = {
  view_portfolio: {
    icon: "NavPort",
    onAction: (row, path, setLayoutState) => {
      setLayoutState &&
        setLayoutState((layoutState) => {
          return {
            ...layoutState,
            user: {
              id: row.original.id,
              displayName: row.original.displayName,
              username: row.original.username,
            },
          };
        });
    },
  },
};

export default columnDef;
