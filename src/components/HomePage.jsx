import React, { useEffect, useState } from "react";
import "../styles/HomePage.scss";
import axios from "axios";

const HomePage = () => {
  const API_KEY = "693677a4";
  const [movieData, setMovieData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?s=movie&type=movie&page=${page}&apikey=${API_KEY}`
        );
        setMovieData(res?.data?.Search);
        // console.log(res?.data?.Search, "movies data");
      } catch (error) {
        console.log(error, "Error while fetching movies");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="homepage-container">
      <div className="search-container">
        <input type="text" placeholder="Search.." />
      </div>
      <div className="movies-container">
        {movieData?.map((e, i) => {
          return (
            <div className="movie-card" key={e?.imdbID}>
              <div className="movie-image">
                <img src={e?.Poster} alt="" />
              </div>
              <div>{e?.Title}</div>
              <div>{e?.Year}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
