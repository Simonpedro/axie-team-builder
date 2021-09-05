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

  const previousDisabled = length === 0 || indexShowing === 0;
  const nextDisabled = length === 0 || indexShowing >= length - 1;

  return (
    <Box py={2}>
      <Typography>{length} axies found</Typography>
      <Button
        disabled={previousDisabled}
        onClick={() => setIndexShowing(indexShowing - 1)}
      >
        Previous
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
