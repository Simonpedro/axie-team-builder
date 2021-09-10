import { useQuery } from "@apollo/client";
import GET_AXIE_BRIEF_LIST, {
  GetAxieBriefListData,
  GetAxieBriefListVariables,
} from "../queries/GetAxieBriefList.query";

const useAxieBriefList = (variables?: GetAxieBriefListVariables) => {
  const { data, loading, error } = useQuery<
    GetAxieBriefListData,
    GetAxieBriefListVariables
  >(GET_AXIE_BRIEF_LIST, {
    variables,
    skip: !variables,
  });

  return { data: data?.axies?.results, loading, error };
};

export default useAxieBriefList;
