import axios from "axios";

export const fetchSpaceNews = async (limit = 6) => {
  const response = await axios.get(`https://spaceflightnewsapi.net{limit}`);

  return response.data.results;
};
