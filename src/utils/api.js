import axios from "axios";

const base_url = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const headers = {
  Authorization: `Bearer ${TMDB_API_KEY}`,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(base_url + url, {
      headers: headers,
      params: params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
