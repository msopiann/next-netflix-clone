"use client";

import instance from "@/app/api/axios";
import requests from "@/app/api/requests";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const base_Url = "https://image.tmdb.org/t/p/original";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [bgImageUrl, setBgImageUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [cast, setCast] = useState([]);

  const fetchMovieTrailer = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await res.json();
    const trailer = data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  };

  const fetchMovieCast = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.cast.slice(0, 5); // ambil 5 pemeran utama
  };

  useEffect(() => {
    async function initMovie() {
      const request = await instance(requests.fetchPopularMovies);
      const results = request.data.results;

      const randomMovie = results[Math.floor(Math.random() * results.length)];
      setMovie(randomMovie);

      // set image dulu
      const newBgImageUrl =
        window.innerWidth >= 768
          ? `${base_Url}${randomMovie?.backdrop_path}`
          : `${base_Url}${randomMovie?.poster_path}`;
      setBgImageUrl(newBgImageUrl);

      // fetch trailer + cast
      const key = await fetchMovieTrailer(randomMovie.id);
      setTrailerKey(key);

      const casts = await fetchMovieCast(randomMovie.id);
      setCast(casts);

      // setelah 5 detik → tampilkan trailer
      setTimeout(() => {
        if (key) setShowTrailer(true);
      }, 10000);
    }

    initMovie();
  }, []);

  return (
    <header className="relative h-[700px] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {!showTrailer || !trailerKey ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImageUrl})` }}
          />
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}`}
            title="Movie trailer"
            allow="autoplay; encrypted-media"
            className="absolute top-0 left-0 w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              transform: "scale(1.5)", // biar nutup black space
            }}
          />
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
      </div>

      {/* Konten */}
      <div className="relative z-10 ml-8 pt-60">
        <h1 className="text-3xl font-extrabold pb-2">
          {movie?.title || movie?.name}
        </h1>
        <p className="w-[46rem] max-w-[360px] leading-[1.3] pt-2 text-base text-justify">
          {movie?.overview?.split(" ").slice(0, 30).join(" ")}...
        </p>

        {/* tombol */}
        <div className="mt-4 flex gap-4">
          <Link
            href={`/movie/${movie?.id}`}
            className="cursor-pointer px-6 py-2 rounded bg-[#E50914] font-semibold hover:bg-[#E50914]/80 transition"
          >
            Watch
          </Link>
          <button className="cursor-pointer px-6 py-2 rounded bg-gray-300 text-black font-semibold hover:bg-gray-400 transition">
            + My List
          </button>
        </div>

        {/* Starring */}
        <h3 className="mt-4 text-base max-w-[360px]">
          Starring:{" "}
          {cast.map((c, idx) => (
            <span key={c.id} className="font-bold">
              {c.name}
              {idx === cast.length - 1 ? "." : ", "}
            </span>
          ))}
        </h3>
      </div>
    </header>
  );
}
