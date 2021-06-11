import mapValues from "lodash-es/mapValues";
import merge from "lodash-es/merge";
import queryString from "query-string";

/**
 * Extract query string
 * @param input
 * @return {*}
 */
export const extractQueryString = (input: string): string => {
  const queryStart = input.indexOf("?");
  if (queryStart === -1) {
    return "";
  }
  return input.slice(queryStart + 1);
};

/**
 * Build a URL with query string
 *
 * @param baseUrl
 * @param queryParams - An object with query params
 * @param stringifyArray - Should an array be serialized to csv
 * @return {string}
 */
export const buildUrlViaQueryString = (
  baseUrl: string,
  queryParams: Record<string, unknown>,
  stringifyArray = true
): string => {
  const parsedQuery = queryString.parse(extractQueryString(baseUrl), {
    arrayFormat: "bracket",
  });
  if (stringifyArray) {
    queryParams = mapValues(queryParams, (value: any) => {
      if (Array.isArray(value)) {
        return value.join(",");
      }
      return value;
    });
  }
  return (
    baseUrl.split("?")[0] +
    "?" +
    queryString.stringify(merge(parsedQuery, queryParams), {
      arrayFormat: "bracket",
    })
  );
};

export const extractQueryObject = (url: string) => {
  return queryString.parse(extractQueryString(url), {
    arrayFormat: "bracket",
  });
};

export const removePaginationQueryParams = (url: string) => {
  const parsedQuery = queryString.parse(extractQueryString(url), {
    arrayFormat: "bracket",
  });
  delete parsedQuery.per_page;
  delete parsedQuery.page;
  return (
    url.split("?")[0] +
    "?" +
    queryString.stringify(parsedQuery, {
      arrayFormat: "bracket",
    })
  );
};
