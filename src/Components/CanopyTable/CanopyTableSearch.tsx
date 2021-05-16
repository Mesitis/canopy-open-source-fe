import {
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import CanopyInput from "../CanopyInput/CanopyInput";
import IconButton from "../IconButton/IconButton";
import { GrSearch } from "react-icons/gr";
interface PropTypes extends InputGroupProps {
  searchQuery: string;
  onSearch: (searchKeyword: string) => void;
  isDisabled: boolean;
}
export default function CanopyTableSearch({
  searchQuery: sq,
  onSearch,
  isDisabled,
  ...props
}: PropTypes) {
  const currentColors = useCurrentColors();
  const [isShown, setIsShown] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>(sq);

  const debouncedOnSearch = debounce(onSearch, 1200);

  useEffect(() => {
    debouncedOnSearch(searchQuery);
  }, [searchQuery]);

  return (
    <InputGroup
      // onMouseEnter={() => setIsShown(true)}
      // onMouseLeave={() => setIsShown(false)}
      color={currentColors.tableHeadingText}
      border="0px"
      borderRadius="40px"
      transition="width .2s ease-in-out"
      width={searchQuery ? "245px" : "20px"}
      backgroundColor={searchQuery ? currentColors.searchBg : "transparent"}
      _hover={
        !isDisabled
          ? {
              width: "245px",
              backgroundColor: currentColors.searchBg,
            }
          : {}
      }
      // width="20px"
      height="25px"
      {...props}
    >
      <CanopyInput
        height="30px"
        width={"100%"}
        type="text"
        //  placeholder={"search"}
        backgroundColor="transparent"
        border="0px"
        fontSize="14px"
        px="10px"
        py="0px"
        value={searchQuery}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        onKeyPress={(e: React.KeyboardEvent) => {
          if (e.key === "Enter") onSearch(searchQuery);
        }}
        _focus={{
          border: "0px",
          backgroundColor: "transparent",
        }}
        _active={{
          border: "0px",
          backgroundColor: "transparent",
        }}
        _hover={{
          border: "0px",
          backgroundColor: "transparent",
        }}
        isDisabled={isDisabled && !searchQuery}
      />
      <InputRightElement
        width="20px"
        height="30px"
        pr="10px"
        pointerEvents="none"
      >
        <IconButton
          pb="4px"
          width="20px"
          height="30px"
          Icon={GrSearch}
          aria-label="search"
          backgroundColor="transparent"
          color={currentColors.otherText}
          //@ts-ignore
          variant="ghost"
          isDisabled={isDisabled}
        />
      </InputRightElement>
    </InputGroup>
  );
}
