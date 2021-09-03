import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { AxieDetail as AxieDetailType } from "../types";
import AxieDetail from "./AxieDetail";

interface AxiePaginatorProps {
  axies: AxieDetailType[];
}

const AxiePaginator = ({ axies }: AxiePaginatorProps) => {
  const length = axies.length;
  const [indexShowing, setIndexShowing] = useState(0);

  const axieDetail = axies[indexShowing];

  const backDisabled = length === 0 || indexShowing === 0;
  const nextDisabled = length === 0 || indexShowing >= length - 1;

  return (
    <Box py={2}>
      <Typography>{length} axies found</Typography>
      <Button
        disabled={backDisabled}
        onClick={() => setIndexShowing(indexShowing - 1)}
      >
        Back
      </Button>
      <AxieDetail axieDetail={axieDetail} />
      <Button
        disabled={nextDisabled}
        onClick={() => setIndexShowing(indexShowing + 1)}
      >
        Next
      </Button>
    </Box>
  );
};

export default AxiePaginator;
