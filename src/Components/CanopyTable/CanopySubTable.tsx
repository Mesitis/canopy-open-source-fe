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

import React, { useEffect, useState } from "react";
// import { getAuthrizationToken } from '../../../helpers/localStorage';
import { useCurrentColors } from "../../hooks/UseCurrentColors/UseCurrentColors";
import ErrorBox from "../ErrorBox/ErrorBox";
import SpinnerOverlay from "../SpinnerOverlay/SpinnerOverlay";
export interface CanopySubTableProps {
  dataKey: string;
  api: string;
  setSubRows: React.Dispatch<React.SetStateAction<Array<any>>>;
  subRows: Array<any> | undefined;
  globalProps?: any;
}

function CanopySubTable({
  dataKey,
  api,
  setSubRows,
  subRows,
  globalProps,
}: CanopySubTableProps) {
  const currentColors = useCurrentColors();
  const [data, setData] = useState<Array<any> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  if (isLoading) {
    return (
      <SpinnerOverlay
        height="150px"
        position="relative"
        backgroundColor="inherit"
        text={"loading"}
      ></SpinnerOverlay>
    );
  }

  if (error) {
    return (
      <ErrorBox
        position="relative"
        error={error}
        backgroundColor="inherit"
        color={currentColors.contentText}
        alignItems={"flex-start"}
      />
    );
  }

  if (subRows?.length === 0) {
    return (
      <ErrorBox
        position="relative"
        error={"no-data-available"}
        backgroundColor="inherit"
        color={currentColors.contentText}
        alignItems={"flex-start"}
      />
    );
  }
  return null;
}

export default CanopySubTable;
