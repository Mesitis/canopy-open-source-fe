import { Box, Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { useState } from "react";
import { getAuthrizationHeaders } from "../../Helpers/localStorage";
import "../../Helpers/DownloadFileHelper";
import {
  buildUrlViaQueryString,
  extractQueryObject,
  removePaginationQueryParams,
} from "../../Helpers/Utils";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import CanopyButton from "../CanopyButton/CanopyButton";
import IconButton from "../IconButton/IconButton";
import { CanopyTableProps } from "./CanopyTable";
import { HiDownload } from "react-icons/hi";

interface Props
  extends Pick<
    CanopyTableProps<any, any>,
    | "layoutState"
    | "downloadAllData"
    | "downloadCurrentData"
    | "globalProps"
    | "requiredQueryFields"
  > {
  isDisabled: boolean;
  endpoint: string;
}
function CanopyTableDownloader({
  isDisabled,
  layoutState,
  downloadAllData,
  downloadCurrentData,
  globalProps,
  endpoint,
  requiredQueryFields,
}: Props) {
  const currentColors = useCurrentColors();
  const [isLoading, setIsLoading] = useState(false);
  // const { t, qp } = globalProps;
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const generateDownloadUrl = (fileToken: string) => {
    return buildUrlViaQueryString(
      `${process.env.NEXT_PUBLIC_EPHEMERALSTORE}${process.env.NEXT_PUBLIC_GET_FILE}`,
      {
        token: fileToken,
        download: true,
      }
    );
  };

  const getFileKey = async (url: string) => {
    try {
      const results = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthrizationHeaders(),
        },
        method: "GET",
      });
      return await results.json();
    } catch {
      console.error("Failed to Download");
      setIsLoading(false);
    }
  };

  const getFileToken = async (key: string) => {
    try {
      const results = await fetch(
        `${process.env.NEXT_PUBLIC_EPHEMERALSTORE}${process.env.NEXT_PUBLIC_GET_FILE_TOKEN}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthrizationHeaders(),
          },
          method: "POST",
          body: JSON.stringify({ key }),
        }
      );
      return await results.json();
    } catch {
      console.error("Failed to Download");
      setIsLoading(false);
    }
  };

  const downloadFile = async (url: string) => {
    const { key } = await getFileKey(url);
    const response = key && (await getFileToken(key));
    if (response?.file_token) {
      try {
        //@ts-ignore
        window.downloadFile(generateDownloadUrl(response.file_token));
      } catch (e) {
        console.error("Failed to Download");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleDownloadCurrentData = async () => {
    close();
    setIsLoading(true);
    const url = removePaginationQueryParams(endpoint);

    await downloadFile(`${url}&output_format=download_hash`);
  };

  const handleDownloadAllData = async () => {
    close();
    setIsLoading(true);
    const url = endpoint;
    const queryParams = extractQueryObject(url);
    let params: Record<string, unknown> = {};
    params["output_format"] = "download_hash";

    requiredQueryFields?.forEach((item) => {
      params[item] = queryParams[item];
    });

    await downloadFile(buildUrlViaQueryString(url?.split("?")[0], params));
  };

  if (downloadAllData && downloadCurrentData) {
    return (
      <Box position="relative">
        {" "}
        <Popover
          placement="bottom"
          closeOnBlur={true}
          onClose={close}
          isOpen={isOpen}
        >
          <PopoverTrigger>
            <IconButton
              width="20px"
              height="20px"
              Icon={HiDownload}
              aria-label="Download"
              backgroundColor="transparent"
              color={currentColors.otherText}
              variant="ghost"
              _hover={{
                backgroundColor: "transparent",
              }}
              _focus={{
                border: "0px",
                backgroundColor: "transparent",
                outline: "none",
              }}
              _active={{
                border: "0px",
              }}
              isDisabled={isDisabled}
              onClick={open}
              isLoading={isLoading}
            ></IconButton>
          </PopoverTrigger>
          <PopoverContent
            backgroundColor={currentColors.containerBg}
            boxShadow={`0px 0px 6px ${currentColors.boxShadow}`}
            arrowShadowColor={`0px 0px 6px ${currentColors.boxShadow}`}
            borderRadius="4px"
            maxWidth="unset"
            right="100px"
            top=" 25px"
            width="120px"
            _focus={{
              border: "0px",
              outline: "none",
            }}
          >
            {/* <PopoverArrow /> */}

            <CanopyButton
              variant="ghost"
              borderRadius="0"
              color={currentColors.popoverColor}
              _hover={{
                bg: currentColors.popoverHoverBg,
                color: currentColors.popoverHoverColor,
              }}
              onClick={handleDownloadCurrentData}
            >
              {globalProps?.t
                ? globalProps?.t("current-results")
                : "Current Results"}
            </CanopyButton>
            <CanopyButton
              variant="ghost"
              borderRadius="0"
              color={currentColors.popoverColor}
              _hover={{
                bg: currentColors.popoverHoverBg,
                color: currentColors.popoverHoverColor,
              }}
              onClick={handleDownloadAllData}
            >
              {globalProps?.t ? globalProps?.t("all-data") : "All Data"}
            </CanopyButton>
          </PopoverContent>
        </Popover>
      </Box>
    );
  } else {
    return (
      <IconButton
        width="20px"
        height="20px"
        Icon={HiDownload}
        aria-label="Download"
        backgroundColor="transparent"
        color={currentColors.otherText}
        variant="ghost"
        _hover={{
          backgroundColor: "transparent",
        }}
        _focus={{
          border: "0px",
          backgroundColor: "transparent",
          outline: "none",
        }}
        _active={{
          border: "0px",
        }}
        isDisabled={isDisabled}
        isLoading={isLoading}
        onClick={
          downloadCurrentData
            ? handleDownloadCurrentData
            : handleDownloadAllData
        }
      ></IconButton>
    );
  }
}
export default CanopyTableDownloader;
