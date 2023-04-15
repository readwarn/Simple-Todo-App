import * as prismicHelper from "@prismicio/helpers";
import { useSinglePrismicDocument } from "@prismicio/react";

const useHomeDoc = () => {
  const [home, { state }] = useSinglePrismicDocument("home");

  const title = prismicHelper.asText(home?.data?.title);
  const description = prismicHelper.asText(home?.data?.description);
  const links = home?.data?.cta_actions;
  const illustrations = home?.data?.illustrations?.map(illustration => ({src:prismicHelper.asImageSrc(illustration?.image), alt:illustration?.image?.alt} ))

  return {
    isLoading: state === "loading",
    title,
    description,
    links,
    illustrations
  };
};

export default useHomeDoc;
