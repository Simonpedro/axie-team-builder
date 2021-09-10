import { useQuery } from "@apollo/client"
import GET_AXIE_DETAIL, { GetAxieDetailData, GetAxieDetailVariables } from "../queries/GetAxieDetail.query"

const useAxieDetail = (axieId: string) => {
  const { data, loading, error } = useQuery<GetAxieDetailData, GetAxieDetailVariables>(GET_AXIE_DETAIL, { variables: { axieId }, skip: !axieId })

  return { data: data?.axie, loading, error };
}

export default useAxieDetail