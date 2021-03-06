import { gql } from "@apollo/client";
import { AxieDetail, Class } from "../types";

export interface GetAxieBriefListData {
  axies: {
    results: AxieDetail[];
  };
}

export interface AxieSearchCriteria {
  classes?: Class[];
  parts?: string[];
  owner?: string;
}

export interface GetAxieBriefListVariables {
  criteria?: AxieSearchCriteria;
  auctionType?: "Sale" | "NotForSale" | "All";
  sort?: "PriceAsc" | "PriceDesc" | "Latest";
  owner?: string;
}

const GET_AXIE_BRIEF_LIST = gql`
  query GetAxieBriefList(
    $auctionType: AuctionType
    $criteria: AxieSearchCriteria
    $from: Int
    $sort: SortBy
    $size: Int
    $owner: String
  ) {
    axies(
      auctionType: $auctionType
      criteria: $criteria
      from: $from
      sort: $sort
      size: $size
      owner: $owner
    ) {
      total
      results {
        ...AxieBrief
        __typename
      }
      __typename
    }
  }
  fragment AxieBrief on Axie {
    id
    name
    stage
    class
    breedCount
    image
    title
    battleInfo {
      banned
      __typename
    }
    auction {
      currentPrice
      currentPriceUSD
      __typename
    }
    parts {
      id
      name
      class
      type
      specialGenes
      __typename
    }
    __typename
  }
`

export default GET_AXIE_BRIEF_LIST
