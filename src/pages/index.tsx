import { Container, Grid, Typography, Box } from "@mui/material";
import { useState } from "react";
import AxieDetail from "../components/AxieDetail";
import AxiePaginator from "../components/AxiePaginator";
import AxieSelector from "../components/AxieSelector";
import useAxieBriefList, {
  AxieSearchCriteria,
} from "../hooks/useAxieBriefList";
import useAxieDetail from "../hooks/useAxieDetail";
import { AxieDetail as AxieDetailType, PartType } from "../types";

export default function Home() {
  const [axie1Id, setAxie1Id] = useState("");
  const [axie2Id, setAxie2Id] = useState("");
  const [axie3Id, setAxie3Id] = useState("");

  const { data: axieDetail1 } = useAxieDetail(axie1Id);
  const { data: axieDetail2 } = useAxieDetail(axie2Id);
  const { data: axieDetail3 } = useAxieDetail(axie3Id);

  const { data: similarAxies1 } = useAxieBriefList(
    getCriteriaFromAxie(axieDetail1),
  );
  const { data: similarAxies2 } = useAxieBriefList(
    getCriteriaFromAxie(axieDetail2),
  );
  const { data: similarAxies3 } = useAxieBriefList(
    getCriteriaFromAxie(axieDetail3),
  );

  return (
    <Container sx={{ textAlign: "center" }}>
      <Typography variant="h1" sx={{ my: 2 }}>
        Axie Team Builder
      </Typography>

      <Typography>
        Complete the text fields with Axie ids to get suggestions of similar
        Axies
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={4}>
          <AxieSelector label="Axie 1" value={axie1Id} onChange={setAxie1Id} />
          {axieDetail1 && <AxieDetail axieDetail={axieDetail1} />}
        </Grid>
        <Grid item xs={4}>
          <AxieSelector label="Axie 2" value={axie2Id} onChange={setAxie2Id} />
          {axieDetail2 && <AxieDetail axieDetail={axieDetail2} />}
        </Grid>
        <Grid item xs={4}>
          <AxieSelector label="Axie 3" value={axie3Id} onChange={setAxie3Id} />
          {axieDetail3 && <AxieDetail axieDetail={axieDetail3} />}
        </Grid>
      </Grid>

      {(similarAxies1 || similarAxies2 || similarAxies3) && (
        <Box textAlign="left" mt={6}>
          <Typography variant="h3" component="h2">
            Results{" "}
          </Typography>
          <Typography variant="caption">
            (Only the first 20 results are shown)
          </Typography>
        </Box>
      )}
      <Grid container spacing={4}>
        <Grid item xs={4}>
          {similarAxies1 && <AxiePaginator axies={similarAxies1} />}
        </Grid>
        <Grid item xs={4}>
          {similarAxies2 && <AxiePaginator axies={similarAxies2} />}
        </Grid>
        <Grid item xs={4}>
          {similarAxies3 && <AxiePaginator axies={similarAxies3} />}
        </Grid>
      </Grid>
    </Container>
  );
}

const getCriteriaFromAxie = (
  axieDetail?: AxieDetailType,
): AxieSearchCriteria => {
  if (!axieDetail) return null;

  return {
    classes: [axieDetail.class],
    parts: axieDetail.parts
      .map((part) => part.type)
      .filter((partType) => ![PartType.EYES, PartType.EARS].includes(partType)),
  };
};
