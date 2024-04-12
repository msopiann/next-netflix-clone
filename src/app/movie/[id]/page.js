"use client";

import Header from "@/components/Header";
import Opacity from "@/components/Opacity";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const base_Url = "https://image.tmdb.org/t/p/original";
const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

export default function MoviePage({ params }) {
  const movieId = params.id;
  const [movie, setMovie] = useState([]);
  const [genre, setGenre] = useState([]);
  const [cast, setCast] = useState([]);
  const [countryName, setCountryName] = useState([]);
  const [companyName, setCompanyName] = useState([]);
  const [bgImageUrl, setBgImageUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );
        const movie = await response.json();
        setMovie(movie);

        const genreNames = movie.genres.map((genre) => genre.name);
        setGenre(genreNames);
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
        setCast(castData.cast.slice(0, 6));
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCountries() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const countries = data.production_countries[0]?.name || "unknown";
        setCountryName(countries);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchCompanies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const company = data.production_companies[0]?.name || "unknown";
        setCompanyName(company);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchCastData();
    fetchCountries();
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newBgImageUrl =
        window.innerWidth <= 768
          ? `${base_Url}${movie?.backdrop_path}`
          : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`;
      setBgImageUrl(newBgImageUrl);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [movie]);

  return (
    <>
      <Header />
      <header
        className="text-white object-contain h-[480px] md:hidden"
        style={{
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImageUrl})`,
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
              priority={true}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="mx-8 h-[190px] md:hidden">
            <div className="mt-40 flex items-center space-x-4">
              <button className="w-1/2 md:w-[8rem] cursor-pointer outline-none border-none font-semibold rounded-[50vw] px-8 py-2 bg-[#E50914] text-white transition-all duration-200 hover:bg-transparent hover:text-white">
                Watch
              </button>

              <button className="w-1/2 md:hidden cursor-pointer outline-none border-none font-semibold rounded-[50vw] px-8 py-2 bg-[#f0f0f0] text-black transition-all duration-200 hover:bg-transparent hover:text-white">
                Episodes
              </button>
            </div>

            <div className="mt-2 flex flex-col items-center justify-center mx-auto text-center">
              <>
                <h1 className="text-3xl font-extrabold block pb-1">
                  {movie.title || movie.name}
                </h1>
              </>

              <div className="flex space-x-6">
                <span className="leading-[1.3] text-base max-w-[360px]">
                  <span>
                    &bull;{" "}
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : ""}
                  </span>
                  <span className="ml-4 leading-[1.3] text-base max-w-[360px]">
                    &bull; {movie.runtime}m
                  </span>
                  <span className="ml-4 leading-[1.3] text-base max-w-[360px]">
                    &bull; {movie.vote_average}{" "}
                    <span className="inline-flex">
                      <FaStar color="yellow" />
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="h-screen md:hidden">
        <div className="text-justify my-2 mx-6">
          <h2 className="text-xl font-bold mb-2">Overview</h2>

          <p>{movie.overview}</p>
        </div>

        <div className="text-justify my-2 ml-6 mr-8">
          <h2 className="text-xl font-bold mb-2">Genre</h2>
          <p>{genre.join(", ")}</p>
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

      <div className="hidden md:block md:mt-28 md:mx-8">
        <div className="flex mx-auto p-4">
          <div className="flex items-center w-1/4 mb-4 mr-8">
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

          <div className="flex flex-col w-3/4 mb-4 ml-4 gap-2">
            <div className="flex w-full">
              <div className="p-6 w-full h-36">
                <h1 className="font-extrabold text-4xl">
                  {movie.title || movie.name}
                </h1>

                <span className="text-gray-600">
                  {countryName} <span className="ml-4">|</span>
                </span>

                <span className="text-gray-600 ml-4">
                  {movie.release_date
                    ? new Date(movie.release_date).getFullYear()
                    : ""}{" "}
                  <span className="ml-4">|</span>
                </span>

                <span className="text-gray-600 ml-4">
                  {movie.runtime} minute
                </span>
              </div>

              <div className="flex items-center justify-center mt-6 mr-6 p-6 text-2xl">
                {movie.vote_average}{" "}
                <span className="ml-2 -mt-1">
                  <FaStar color="yellow" />
                </span>
              </div>
            </div>
            <div className="flex p-6 w-full">
              <nav className="flex flex-row space-x-8">
                <button className="text-white focus:outline-none border-b-2	border-red-600">
                  Overview
                </button>
                <button className="text-gray-600 hover:text-white focus:outline-none">
                  Trailer and More
                </button>
                <button className="text-gray-600 hover:text-white focus:outline-none">
                  More Like This
                </button>
                <button className="text-gray-600 hover:text-white focus:outline-none">
                  Detail
                </button>
              </nav>
            </div>

            <div className="px-6 w-3/4 text-justify">
              <div>
                <h6>{movie.overview}</h6>
              </div>

              <div className="w-full gap-4 mt-4 space-y-4">
                <div className="w-full flex">
                  <div className="w-1/4 text-gray-500">Starring</div>
                  <div className="w-3/4">
                    {cast.map((actor, index) => (
                      <span key={actor.id}>
                        {actor.name}
                        {index < cast.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full flex">
                  <div className="w-1/4 text-gray-500">Production</div>
                  <div className="w-3/4">{companyName}</div>
                </div>

                <div className="w-full flex">
                  <div className="w-1/4 text-gray-500">Genre</div>
                  <div className="w-3/4">{genre.join(", ")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
