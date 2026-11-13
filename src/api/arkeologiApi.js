import axios from "axios";

export const fetchArchaeology = async (limit = 6) => {
  const searchRes = await axios.get("https://metmuseum.org");
};

const objectIDs = searchRes.data.objectIDs.slice(0, limit + 4);

const objectReq = objectIDs.map((id) => axios.get(`https://metmuseum.org{id}`));

const responses = await Promise.all(objectReq);

return responses
  .map((res) => res.data)
  .filter((item) => item.primaryImageSmall)
  .slice(0, limit);
