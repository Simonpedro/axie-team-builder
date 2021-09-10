import { useApolloClient } from "@apollo/client";
import { Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import useAxieBriefList from "../hooks/useAxieBriefList";
import GET_AXIE_BRIEF_LIST, {
  GetAxieBriefListData,
  GetAxieBriefListVariables,
} from "../queries/GetAxieBriefList.query";
import { AxieDetail as AxieDetailType } from "../types";
import getSearchVariablesFromAxie from "../utils/getSearchVariablesFromAxie";

export default function AxiesTotalValuePage() {
  const apolloClient = useApolloClient();
  const [roninAddress, setRoninAddress] = useState("");
  const [similarAxies, setSimilarAxies] = useState<AxieDetailType[]>([]);

  // Api expects part after 'ronin:', prefixed with 0x 🤷‍♂️
  const owner = roninAddress.replace("ronin:", "0x");

  const { data: axiesFromAddress = [] } = useAxieBriefList({
    owner,
  });

  const similarAxiesCriterias = axiesFromAddress?.map((axie) =>
    getSearchVariablesFromAxie(true, axie),
  );

  useEffect(() => {
    Promise.all(
      similarAxiesCriterias.map((criteria) =>
        apolloClient.query<GetAxieBriefListData, GetAxieBriefListVariables>({
          query: GET_AXIE_BRIEF_LIST,
          variables: criteria,
        }),
      ),
    ).then((queries) => {
      const axies = queries
        .map((query) => query.data.axies.results[0])
        .filter(Boolean);

      setSimilarAxies(axies);
    });
  }, [JSON.stringify(similarAxiesCriterias)]);

  return (
    <Container sx={{ py: 2 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        Axies total value
      </Typography>

      <Typography>
        Please fill the text field with your Ronin address
      </Typography>

      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Ronin address"
          value={roninAddress}
          onChange={(e) => setRoninAddress(e.target.value)}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>
          Quantity of axies in address: {axiesFromAddress?.length}
        </Typography>
        {similarAxies.length && (
          <>
            <Typography>
              Quantity of similar axies found: {similarAxies.length}
            </Typography>
            <Typography>
              Value of similar axies found in USD:{" "}
              {similarAxies.reduce((sumSoFar, axie) => {
                return (
                  sumSoFar + Number.parseFloat(axie.auction.currentPriceUSD)
                );
              }, 0)}
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}
