import { Button, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { AxieDetail as AxieDetailType } from "../types";

interface AxieDetailProps {
  axieDetail: AxieDetailType;
}

const AxieDetail = ({ axieDetail }: AxieDetailProps) => {
  const price = axieDetail.auction?.currentPriceUSD;

  return (
    <Paper sx={{ p: 2 }}>
      <Image
        src={axieDetail.image}
        height="145.5"
        width="194"
        alt={axieDetail.name}
      />

      <Typography sx={{ mb: 2 }}>
        {price ? `$${price}` : "Not in sale"}
      </Typography>

      <Button
        variant="contained"
        size="small"
        target="_blank"
        href={`https://marketplace.axieinfinity.com/axie/${axieDetail.id}`}
      >
        See in Marketplace
      </Button>
    </Paper>
  );
};

export default AxieDetail;
