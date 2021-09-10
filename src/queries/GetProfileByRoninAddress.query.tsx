import { gql } from "@apollo/client";

const GET_PROFILE_BY_RONIN_ADDRESS = gql`
  query GetProfileByRoninAddress($roninAddress: String!) {
    publicProfileWithRoninAddress(roninAddress: $roninAddress) {
      ...Profile
      __typename
    }
  }
  fragment Profile on PublicProfile {
    accountId
    name
    addresses {
      ...Addresses
      __typename
    }
    __typename
  }
  fragment Addresses on NetAddresses {
    ethereum
    tomo
    loom
    ronin
    __typename
  }
`;

export default GET_PROFILE_BY_RONIN_ADDRESS;
