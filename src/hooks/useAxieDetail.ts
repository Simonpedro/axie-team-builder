import { useQuery } from "@apollo/client"
import GET_AXIE_DETAIL from "../queries/GetAxieDetail.query"
import { AxieDetail } from "../types";

interface Data {
  axie: AxieDetail
}

interface Variables {
  axieId: string
}

const useAxieDetail = (axieId: string) => {
  const { data, loading, error } = useQuery<Data, Variables>(GET_AXIE_DETAIL, { variables: { axieId }, skip: !axieId })

  return { data: data?.axie, loading, error };
}

export default useAxieDetail