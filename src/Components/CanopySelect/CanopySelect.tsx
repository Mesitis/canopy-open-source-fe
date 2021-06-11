import { Box, Text } from "@chakra-ui/react";
import React, { ComponentProps, useState } from "react";
import Select from "react-select";
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import { getCommonStyles, getDropdownIndicator } from "./utils";

const getStyles = (
  currentColors: ReturnType<typeof useCurrentColors>,
  props: object
) => ({
  ...getCommonStyles(currentColors, props),
});

function CanopySelect({
  title,
  width,
  height,
  ...props
}: ComponentProps<typeof Select>) {
  const currentColors = useCurrentColors();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [ref, setRef] = useState<any>(null);

  return (
    <Box width={width}>
      {title && (
        <Text
          color={currentColors.headingText}
          fontSize="15px"
          fontWeight="bold"
          mb="10px"
        >
          {title}
        </Text>
      )}
      <Box>
        <Select
          menuPortalTarget={document.body}
          // menuPosition={'fixed'}
          isSearchable={true}
          // menuIsOpen={menuIsOpen}
          // onMenuOpen={() => setMenuIsOpen(true)}
          // onMenuClose={() => setMenuIsOpen(false)}
          ref={setRef}
          //@ts-ignore
          styles={getStyles(currentColors, props)}
          components={{
            DropdownIndicator: getDropdownIndicator(currentColors),
          }}
          //borderRadius="4px"
          //borderColor={currentColors.dropDownBorder}
          //border="1px"
          {...props}
        />
      </Box>
    </Box>
  );
}

export default CanopySelect;
