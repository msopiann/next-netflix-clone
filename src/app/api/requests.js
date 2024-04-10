const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNeflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchIndonesian: `/discover/tv?api_key=${API_KEY}&with_networks=213&with_origin_country=ID`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?&api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?&api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?&api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?&api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaryMovies: `/discover/movie?&api_key=${API_KEY}&with_genres=99`,
  fetchGenreList: `/genre/tv/list?api_key=${API_KEY}`,
};

export default requests;
