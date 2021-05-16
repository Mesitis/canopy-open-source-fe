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
}

function CanopySubTable({
  dataKey,
  api,
  setSubRows,
  subRows,
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
