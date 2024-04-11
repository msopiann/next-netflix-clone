"use client";

import instance from "@/app/api/axios";
import requests from "@/app/api/requests";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const base_Url = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [releaseYear, setReleaseYear] = useState("");
  const [moviesWithCasters, setMoviesWithCasters] = useState([]);
  const [activeMovieCasters, setActiveMovieCasters] = useState([]);
  const [setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await instance(requests.fetchPopularMovies);
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

        const releaseYear = randomMovie.release_date.split("-")[0];
        setReleaseYear(releaseYear);

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
      className="text-white object-contain h-[490px]"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
          window.innerWidth >= 768
            ? `${base_Url}${movie?.backdrop_path}`
            : `${base_Url}${movie?.poster_path}`
        })`,
        backgroundPosition: "center center",
      }}
    >
      <div className="ml-8 pt-36 h-[190px]">
        <div className="mt-44 md:mt-0">
          <h3 className="hidden md:block md:mb-2">
            {genres.map((genre) => genre.name).join(", ")}
          </h3>

          <h1 className="text-3xl font-extrabold pb-1">
            {movie.title || movie.name}
          </h1>

          <div className="block mt-2 md:hidden">
            <span>&#x2022; {genres.map((genre) => genre.name).join(", ")}</span>
            <span className="ml-4">&#x2022; {releaseYear}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center text-center">
          <Link
            href={`/movie/${movie.id}`}
            className="w-1/2 md:w-[8rem] cursor-pointer outline-none border-none font-semibold rounded-[0.2vw] px-8 py-2 mr-4 bg-[#E50914] text-white transition-all duration-200 hover:bg-transparent hover:text-white"
          >
            Watch
          </Link>

          <button className="w-1/2 md:hidden cursor-pointer outline-none border-none font-semibold rounded-[0.2vw] px-8 py-2 mr-4 bg-[#f0f0f0] text-black transition-all duration-200 hover:bg-transparent hover:text-white">
            + My List
          </button>
        </div>

        <div className="hidden md:flex md:flex-col md:gap-2">
          <h3 className="w-[46rem] leading-[1.3] pt-4 pe-4 text-base text-justify max-w-[360px] min-h-[80px]">
            {truncate(movie.overview, 30)}
          </h3>

          <h3 className="w-[46rem] leading-[1.3] pe-6 text-base text-justify max-w-[360px] min-h-[80px]">
            Starring:{" "}
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
