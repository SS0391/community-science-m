import axios from "axios";

const ANCIENT_OBJECT_IDS = new Array(544740, 544442, 547802, 248902, 253348, 544320, 254801, 548310);

export const fetchArchaeology = async (limit = 6) => {
  const selectedIds = ANCIENT_OBJECT_IDS.slice(0, limit);

  const objectReq = selectedIds.map((id) => axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`));

  const responses = await Promise.all(objectReq);

  return responses.map((res) => res.data).filter((item) => item.primaryImageSmall);
};
