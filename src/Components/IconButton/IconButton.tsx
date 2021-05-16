import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export type IconButtonProps = ButtonProps & {
  Icon: any;
  "aria-label": string;
};

const IconButton = React.forwardRef(function ({
  Icon,
  width = "24px",
  height = "24px",
  minW = width,
  padding = "0px",
  ...props
}: IconButtonProps) {
  return (
    <Button
      width={width}
      height={height}
      minW={minW}
      padding={padding}
      border="0px"
      backgroundColor="transparent"
      _focus={{
        border: "0px",
        backgroundColor: "transparent",
        outline: "none",
      }}
      _active={{ border: "0px" }}
      {...props}
    >
      <Icon width={width} height={height} />
    </Button>
  );
});

export default IconButton;
