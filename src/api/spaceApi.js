import axios from "axios";

export const fetchSpaceNews = async (limit = 6) => {
  const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/?limit=${limit}`);

  return response.data.results;
};
