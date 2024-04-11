"use client";

import instance from "@/app/api/axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const base_Url = "https://image.tmdb.org/t/p/original";

export default function Row({ title, fetchUrl }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance(fetchUrl);
      setMovie(request.data.results);
      return request;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchUrl]);

  function imageClick(event, url) {
    event.preventDefault();
    window.location = url;
  }

  return (
    <div className="ml-5 text-white">
      <h2 className="text-bold text-xl">{title}</h2>

      <div className="flex overflow-y-hidden overflow-x-scroll scrollbar-hidden p-4">
        {movie.map((index) => (
          <Image
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="max-h-48 lg:max-h-28 mr-2 transition-transform duration-450 hover:scale-110"
            src={
              window.innerWidth >= 768
                ? `${base_Url}${index.backdrop_path}`
                : `${base_Url}${index.poster_path}`
            }
            alt={index.title}
            key={index.id}
            onClick={(e) => imageClick(e, `/movie/${index.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
