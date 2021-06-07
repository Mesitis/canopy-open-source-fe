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

import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

export type IconButtonProps = ButtonProps & {
  Icon: any;
  "aria-label": string;
  Size?: any;
};

const IconButton = React.forwardRef(function ({
  Icon,
  width = "24px",
  height = "24px",
  minW = width,
  padding = "0px",
  Size,
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
      <Icon fontSize={Size} width={width} height={height} />
    </Button>
  );
});

export default IconButton;
