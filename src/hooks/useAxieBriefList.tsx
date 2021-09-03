import { useQuery } from "@apollo/client";
import GET_AXIE_BRIEF_LIST from "../queries/GetAxieBriefList.query";
import { AxieDetail, Class, PartType } from "../types";

interface Data {
  axies: {
    results: AxieDetail[];
  };
}

export interface AxieSearchCriteria {
  classes: Class[];
  parts: PartType[];
}

interface Variables {
  criteria: AxieSearchCriteria;
  auctionType: "Sale" | "NotForSale" | "All";
  sort: "PriceAsc" | "PriceDesc" | "Latest";
}

const useAxieBriefList = (criteria?: AxieSearchCriteria) => {
  const { data, loading, error } = useQuery<Data, Variables>(
    GET_AXIE_BRIEF_LIST,
    {
      variables: {
        criteria,
        auctionType: "Sale",
        sort: "PriceAsc",
      },
      skip: !criteria,
    },
  );

  return { data: data?.axies?.results, loading, error };
};

export default useAxieBriefList;
