import axios from "axios";

const fetchNews = async () => {
  const APIkey = "";
  const BASE_URL = "https://newsapi.org/v2";
  try {
    const response = await axios.get(`${BASE_URL}/topheadlines`, {
      params: {
        country: "us",
        apiKey: APIkey,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
export default fetchNews;
