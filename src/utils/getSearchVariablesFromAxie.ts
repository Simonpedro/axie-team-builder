import { GetAxieBriefListVariables } from "../queries/GetAxieBriefList.query";
import { AxieDetail, PartType } from "../types";

const getSearchVariablesFromAxie = (
  includeEyesAndEars: boolean,
  axieDetail?: AxieDetail,
): GetAxieBriefListVariables => {
  if (!axieDetail) return null;

  return {
    auctionType: "Sale",
    sort: "PriceAsc",
    criteria: {
      classes: [axieDetail.class],
      parts: axieDetail.parts
        .filter((part) => {
          let excludeParts = [];

          if (!includeEyesAndEars) {
            excludeParts = [PartType.EYES, PartType.EARS];
          }

          return !excludeParts.includes(part.type);
        })
        .map((part) => part.id),
    },
  };
};

export default getSearchVariablesFromAxie