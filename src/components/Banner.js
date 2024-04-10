"use client";

import instance from "@/app/api/axios";
import requests from "@/app/api/requests";
import React, { useEffect, useState } from "react";

const base_Url = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesWithCasters, setMoviesWithCasters] = useState([]);
  const [activeMovieCasters, setActiveMovieCasters] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await instance(requests.fetchTopRated);
        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ];
        setMovie(randomMovie);

        const genreResponse = await instance(requests.fetchGenreList);
        const movieGenres = genreResponse.data.genres.filter((genre) =>
          randomMovie.genre_ids.includes(genre.id)
        );
        setGenres(movieGenres);

        const movies = request.data.results.map((movie) => ({
          id: movie.id,
        }));

        const casterPromises = movies.map((movie) =>
          fetchMovieCasters(movie.id)
        );
        const allCasters = await Promise.all(casterPromises);
        const moviesWithCombinedCasters = movies.map((movie, index) => ({
          ...movie,
          casters: allCasters[index].slice(0, 5),
        }));

        setMoviesWithCasters(moviesWithCombinedCasters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const fetchMovieCasters = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movie casters");
        }

        const data = await response.json();
        return data.cast;
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (movie.id && moviesWithCasters.length > 0) {
      const activeMovieData = moviesWithCasters.find((m) => m.id === movie.id);
      if (activeMovieData) {
        setActiveMovieCasters(activeMovieData.casters);
      }
    }
  }, [movie, moviesWithCasters]);

  function truncate(str, n) {
    if (!str) return "";

    const words = str.split(" ");
    if (words.length <= n) return str;

    return words.slice(0, n).join(" ") + "...";
  }

  return (
    <header
      className="text-white object-contain h-[480px]"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${base_Url}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="ml-8 pt-36 h-[190px]">
        <h3 className="mb-2">{genres.map((genre) => genre.name).join(", ")}</h3>

        <h1 className="text-3xl font-extrabold pb-1">
          {movie.title || movie.name}
        </h1>

        <div className="banner__buttons">
          <button className="cursor-pointer outline-none border-none font-semibold rounded-[0.2vw] pl-8 pr-8 pt-2 pb-2 mr-4 bg-[rgba(51, 51, 51, 0.5)] text-black bg-white transition-all duration-200 hover:bg-transparent hover:text-white">
            Watch
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="w-[43rem] leading-[1.3] pt-4 pe-4 text-base text-justify max-w-[360px] min-h-[80px]">
            {truncate(movie.overview, 30)}
          </h3>

          <h3 className="w-[43rem] leading-[1.3] pe-6 text-base text-justify max-w-[360px] min-h-[80px]">
            Cast:{" "}
            {activeMovieCasters.map((caster, index, array) => (
              <span key={caster.id} className="font-bold">
                {caster.name}
                {index === array.length - 1 ? "." : ", "}
              </span>
            ))}
          </h3>
        </div>
      </div>
    </header>
  );
}
