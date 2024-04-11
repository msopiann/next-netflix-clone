"use client";

import instance from "@/app/api/axios";
import Header from "@/components/Header";
import Opacity from "@/components/Opacity";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const base_Url = "https://image.tmdb.org/t/p/original";

export default function MoviePage({ params }) {
  const movieId = params.id;
  const [movie, setMovie] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        const movie = await response.json();
        setMovie(movie);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCastData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
        );
        const castData = await response.json();
        setCast(castData.cast.slice(0, 10));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchCastData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <header
        className="text-white object-contain h-[480px]"
        style={{
          backgroundSize: "cover",
          backgroundImage:
            window.innerWidth <= 768 && movie?.backdrop_path
              ? `url(${base_Url}${movie?.backdrop_path})`
              : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
          backgroundPosition: "center center",
        }}
      >
        <Opacity />
        <div className="relative backdrop-blur-sm h-full">
          <div className="flex justify-center items-center mx-auto pt-48 h-48 w-48">
            <Image
              src={`${base_Url}${movie.poster_path}`}
              alt={movie.title || movie.name}
              width={0}
              height={0}
              loading="lazy"
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="ml-8 h-[190px]">
            <div className="-ml-4 mt-40 flex items-center md:mt-0">
              <button className="w-1/2 md:w-[8rem] cursor-pointer outline-none border-none font-semibold rounded-[50vw] px-8 py-2 mr-4 bg-[#E50914] text-white transition-all duration-200 hover:bg-transparent hover:text-white">
                Watch
              </button>

              <button className="w-1/2 md:hidden cursor-pointer outline-none border-none font-semibold rounded-[50vw] px-8 py-2 mr-4 bg-[#f0f0f0] text-black transition-all duration-200 hover:bg-transparent hover:text-white">
                Episodes
              </button>
            </div>

            <div className="mt-2 flex flex-col items-center justify-center mx-auto text-center">
              <>
                <h1 className="text-3xl font-extrabold block pb-1">
                  {movie.title || movie.name}
                </h1>
              </>

              <div className="flex gap-4">
                <span className="-ml-8 w-[23rem] leading-[1.3] text-base max-w-[360px] min-h-[80px]">
                  <span>
                    &bull;{" "}
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : ""}
                  </span>
                  <span className="ml-4 w-[23rem] leading-[1.3] text-base max-w-[360px] min-h-[80px]">
                    &bull; {movie.runtime}m
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="h-screen">
        <div className="text-justify my-2 mx-6">
          <h2 className="text-xl font-bold mb-2">Overview</h2>

          <p>{movie.overview}</p>
        </div>

        <div className="text-justify my-2 mx-6">
          <h2 className="text-xl font-bold mb-2">Starring</h2>
          <div className="mx-auto px-5 py-2 lg:px-32 lg:pt-4">
            <div className="flex mb-12 flex-wrap md:-m-2">
              {cast.map((actor) => (
                <div key={actor.id} className="flex w-1/2 md:w-1/5 flex-wrap">
                  <div className="w-full p-1 md:p-2">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                      alt={actor.name}
                      width={0}
                      height={0}
                      loading="lazy"
                      sizes="100vw"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
